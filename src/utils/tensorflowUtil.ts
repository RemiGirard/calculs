import * as tf from "@tensorflow/tfjs";
import {browser, GraphModel, scalar, squeeze} from "@tensorflow/tfjs";
import {MutableRefObject, RefObject} from "react";
import cv from "@techstark/opencv-js";

const indexeddb = 'indexeddb://';

interface drawVideoToCanvasInterface {
    video : HTMLVideoElement,
    canvas: HTMLCanvasElement,
    refreshTimer?: number,
}
export const drawVideoToCanvas = ({video, canvas, refreshTimer = 200}: drawVideoToCanvasInterface) => {
    let ctx = canvas.getContext("2d");

    const width = 320;
    const height = 240;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        if(ctx === null){
            throw new Error('ctx is null');
        }
        ctx.drawImage(video, 0, 0, width, height);
    }, refreshTimer);
};

type getUserMediaFunc = (constraints?: MediaStreamConstraints | undefined) => Promise<MediaStream>

export const playVideo = (video: HTMLVideoElement, getUserMedia: getUserMediaFunc) => {
    getUserMedia({ video: { width: 300 } })
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            console.error("error:", err);
        });
};

export const loadModel = async (modelPath: string, indexddbKey: string, ref: MutableRefObject<GraphModel|null>) => {
    try{
        ref.current = await tf.loadGraphModel(indexeddb + indexddbKey);
    } catch (e) {
        try {
            const modelToSave = await tf.loadGraphModel(modelPath);
            await modelToSave.save(indexeddb + indexddbKey);
            ref.current = await tf.loadGraphModel(indexeddb + indexddbKey);
        } catch (e) {
            console.error(e);
        }
    }
}

export const getHeatMapFromImage = async (image: HTMLImageElement, detectionModel: GraphModel, heatmap: HTMLCanvasElement) => {
    heatmap.style.width = '320px';
    heatmap.style.height = '240px';
    let tensor = getImageTensorForDetectionModel(image, [512,512]);
    let prediction: any = await detectionModel?.execute(tensor);
    prediction = squeeze(prediction);
    if (Array.isArray(prediction)) {
        prediction = prediction[0];
    }
    console.debug({width: image.width, height: image.height})


    await browser.toPixels(prediction, heatmap);
}

export const takePicture = async (canvas: HTMLCanvasElement) => {
    return canvas.toDataURL('image/jpeg')
};

const getImageTensorForDetectionModel = (
  imageObject: HTMLImageElement,
  size: [number, number]
) => {
    let tensor = browser
      .fromPixels(imageObject)
      .resizeNearestNeighbor(size)
      .toFloat();
    const DET_MEAN = 0.785;
    const DET_STD = 0.275;
    let mean = scalar(255 * DET_MEAN);
    let std = scalar(255 * DET_STD);
    return tensor.sub(mean).div(std).expandDims();
};



export const getBoundingBoxesPixel = async () => {
    const boundingBoxes = await extractBoundingBoxesFromHeatmap([512,512]);
    console.debug({boundingBoxes});
    let boundingBoxesPixel = boundingBoxes.map((boundingBoxe) => {
        return {bbox: boundingBoxe.coordinates.map((([x,y]: [number, number]) => [x*320, y*240]))};
    });
    boundingBoxesPixel = boundingBoxesPixel.filter(pre => {
        if((pre.bbox[1][0]-pre.bbox[0][0]) < 30){
            return false;
        }
        if((pre.bbox[2][1]-pre.bbox[0][1]) < 30){
            return false;
        }
        return true;
    })

    return boundingBoxesPixel;
}

const extractBoundingBoxesFromHeatmap = (size: [number, number]) => {
    let src = cv.imread("heatmap");
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    console.debug({THRESH_BINARY: cv.THRESH_BINARY})
    const tresh = 20 // 77
    cv.threshold(src, src, tresh, 255, cv.THRESH_BINARY);
    cv.morphologyEx(src, src, cv.MORPH_OPEN, cv.Mat.ones(2, 2, cv.CV_8U));
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    // You can try more different parameters
    cv.findContours(
      src,
      contours,
      hierarchy,
      cv.RETR_EXTERNAL,
      cv.CHAIN_APPROX_SIMPLE
    );
    // draw contours with random Scalar
    const boundingBoxes = [];
    // @ts-ignore
    for (let i = 0; i < contours.size(); ++i) {
        const contourBoundingBox = cv.boundingRect(contours.get(i));
        if (contourBoundingBox.width > 2 && contourBoundingBox.height > 2) {
            boundingBoxes.unshift(transformBoundingBox(contourBoundingBox, i, size));
        }
    }
    src.delete();
    contours.delete();
    hierarchy.delete();
    return boundingBoxes;
};

const clamp = (number: number, size: number) => {
    return Math.max(0, Math.min(number, size));
};

const transformBoundingBox = (
  contour: any,
  id: number,
  size: [number, number]
): any => {
    let offset =
      (contour.width * contour.height * 1.8) /
      (2 * (contour.width + contour.height));
    const p1 = clamp(contour.x - offset, size[1]) - 1;
    const p2 = clamp(p1 + contour.width + 2 * offset, size[1]) - 1;
    const p3 = clamp(contour.y - offset, size[0]) - 1;
    const p4 = clamp(p3 + contour.height + 2 * offset, size[0]) - 1;
    return {
        id,
        config: {
            stroke: 'green',
        },
        coordinates: [
            [p1 / size[1], p3 / size[0]],
            [p2 / size[1], p3 / size[0]],
            [p2 / size[1], p4 / size[0]],
            [p1 / size[1], p4 / size[0]],
        ],
    };
};

export const nextStep = async (boundingBoxesPixel, screenshotRef, crops, recognitionModel) => {
    let tensors = []
    boundingBoxesPixel.forEach((boundingBox, index) => {

        const left = Math.round(boundingBox.bbox[0][0]);
        const top = Math.round(boundingBox.bbox[0][1]);
        const right = Math.round(boundingBox.bbox[2][0]);
        const bottom = Math.round(boundingBox.bbox[2][1]);

        // Calculate width and height of the bounding box
        const width = right - left;
        const height = bottom - top;

        // Get the image element from the ref
        const imageElement = screenshotRef.current;

        // Create a canvas to draw the sub-image
        let canvas: HTMLCanvasElement| null = document.getElementById('canvas'+index);
        if(canvas === null) return;
        canvas.style.width = width+'px';
        canvas.style.height = height+'px';
        const ctx = canvas.getContext('2d');

        if(ctx === null) return;
        // Draw the sub-image onto the canvas

        ctx.drawImage(imageElement, left, top, width, height, 0, 0, width, height);

        crops.current = [...crops.current, ctx];
        // Get the pixel data of the sub-image

        const subImageData = ctx.getImageData(0, 0, width, height);
        // console.debug({subImageData});

        // Convert sub-image data to tensor
        const tensor = tf.tensor(subImageData.data, [Math.round(height), Math.round(width), 4], 'int32'); // Assuming 4 channels (RGBA)
        const rgbTensor = tensor.slice([0, 0, 0], [-1, -1, 3]);
        const resizedTensor = tf.image.resizeBilinear(rgbTensor, [32, 128]);
        // Add batch dimension to the tensor
        const batchedTensor = tf.expandDims(resizedTensor, 0);
        tensors.push(batchedTensor);
    });

    const VOCAB = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~°£€¥¢฿àâéèêëîïôùûüçÀÂÉÈÊËÎÏÔÙÛÜÇ";

    try {

        let tensor = getImageTensorForRecognitionModel(crops.current.map(crop => crop.canvas), [32, 128]);

        let predictions = await recognitionModel.current.executeAsync(tensor);
        tf.dispose(tensor);

        let probabilities = tf.softmax(predictions, -1);
        let prob2 = tf.argMax(probabilities, -1);
        let bestPath = tf.unstack(prob2, 0);
        tf.dispose(probabilities)
        let blank = 126;
        let words = [];

        for (const sequence of bestPath) {
            let collapsed = "";
            let added = false;
            const values = sequence.dataSync();
            const arr = Array.from(values);
            for (const k of arr) {
                if (k === blank) {
                    added = false;
                } else if (k !== blank && added === false) {
                    collapsed += VOCAB[k];
                    added = true;
                }
            }
            words.push(collapsed);
        }
        tf.dispose(tensor);
        tf.dispose(predictions);
        tf.dispose(probabilities);
        tf.dispose(prob2);
        tf.dispose(bestPath);
        console.log(words)
        return words;
    } catch (error) {
        console.error("Prediction error:", error);
    }

}

const getImageTensorForRecognitionModel = (
  crops: HTMLImageElement[],
  size: [number, number]
) => {
    const list = crops.map((imageObject) => {
        let h = imageObject.height;
        let w = imageObject.width;
        let resize_target: any;
        let padding_target: any;
        let aspect_ratio = size[1] / size[0];
        if (aspect_ratio * h > w) {
            resize_target = [size[0], Math.round((size[0] * w) / h)];
            padding_target = [
                [0, 0],
                [0, size[1] - Math.round((size[0] * w) / h)],
                [0, 0],
            ];
        } else {
            resize_target = [Math.round((size[1] * h) / w), size[1]];
            padding_target = [
                [0, size[0] - Math.round((size[1] * h) / w)],
                [0, 0],
                [0, 0],
            ];
        }
        return tf.browser
          .fromPixels(imageObject)
          .resizeNearestNeighbor(resize_target)
          .pad(padding_target, 0)
          .toFloat()
          .expandDims();
    });
    console.debug({list})
    const tensor = tf.concat(list);
    let mean = tf.scalar(255 * 0.694);
    let std = tf.scalar(255 * 0.298);

    const output = tensor.sub(mean).div(std);
    tf.dispose(mean);
    tf.dispose(std);
    return output;
};