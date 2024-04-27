import { useCallback, useEffect, useRef, useState } from "react";
import { InteractiveWrapper } from "./Interactive.style";
import {createWorker    } from "tesseract.js";
import Title from "../components/molecules/Title";
import path from 'path';
import * as tf from '@tensorflow/tfjs';
// import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import cocoSd from '@tensorflow-models/coco-ssd';
// import cocoSsd from '@tensorflow-models/coco-ssd/dist/index';
import cat from '../assets/cat.jpg';
import dog from '../assets/dog01.jpg';
import '@tensorflow/tfjs-core';
import cv from "@techstark/opencv-js";
import randomColor from "randomcolor";

const isDevEnv: boolean = (process.env.NODE_ENV === 'development');

const RenderCrops = ({ crops }) => {
  return (
    <div>
      {crops.map((canvas, index) => (
        <canvas key={index} ref={canvasRef => canvasRef && (canvasRef.current = canvas)} />
      ))}
    </div>
  );
};

const Interactive = () => {
  
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const screenshotRef = useRef(null);
  const heatmapContainerRef = useRef(null);
  const [picture, setPicture] = useState('');
  const [ocrText, setOcrText] = useState('');
  const [predictionsToDisplay, setPredictionsToDisplay] = useState([]);
  const detectionModel = useRef<any>(null);
  const recognitionModel = useRef<any>(null);
  const loopIsRunning = useRef(false);
  const crops = useRef([]);

  // console.debug({cocoSsd});
  tf.engine().startScope()

  const loadModel = async ({modelRef, indexddbAdress, modelFile}: any) => {
    try{
      modelRef.current = await tf.loadGraphModel('indexeddb://' + indexddbAdress);
      // console.debug('loaded from db');
    } catch (error) {
      const modelToSave = await tf.loadGraphModel(modelFile);
      await modelToSave.save('indexeddb://' + indexddbAdress);

      modelRef.current = await tf.loadGraphModel('indexeddb://' + indexddbAdress);
      // console.debug('loaded from file then from db');
    }
  }

  const saveAndLoadModelInIndexDB =  async () => {
      await loadModel({
        modelRef: detectionModel,
        indexddbAdress: 'detection-model',
        modelFile: '/src/models/db_mobilenet_v2/model.json',
      });

    await loadModel({
      modelRef: recognitionModel,
      indexddbAdress: 'recognition-model',
      modelFile: '/src/models/crnn_mobilenet_v2/model.json',
    });
  }

  saveAndLoadModelInIndexDB();


  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video:any = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  const paintToCanvas = () => {
    let video = videoRef.current;
    let photo:any = photoRef.current;
    let ctx = photo.getContext("2d");

    const width = 320;
    const height = 240;
    photo.width = width;
    photo.height = height;

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);
    }, 200);
  };

  const takePhoto = async () => {
    setPicture(photoRef.current?.toDataURL("image/jpeg"));
  };


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
    const tensor = tf.concat(list);
    let mean = tf.scalar(255 * 0.694);
    let std = tf.scalar(255 * 0.298);

    const output = tensor.sub(mean).div(std);
    tf.dispose(mean);
    tf.dispose(std);
    return output;
  };

 const getImageTensorForDetectionModel = (
    imageObject: HTMLImageElement,
    size: [number, number]
  ) => {
    let tensor = tf.browser
      .fromPixels(imageObject)
      .resizeNearestNeighbor(size)
      .toFloat();
    let mean = tf.scalar(255 * 0.785);
    let std = tf.scalar(255 * 0.275);
    return tensor.sub(mean).div(std).expandDims();
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
        stroke: randomColor(),
      },
      coordinates: [
        [p1 / size[1], p3 / size[0]],
        [p2 / size[1], p3 / size[0]],
        [p2 / size[1], p4 / size[0]],
        [p1 / size[1], p4 / size[0]],
      ],
    };
  };

  const extractBoundingBoxesFromHeatmap = (size: [number, number]) => {
    let src = cv.imread("heatmap");
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    cv.threshold(src, src, 77, 255, cv.THRESH_BINARY);
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

  const getText = async () => {
    crops.current = [];
    // console.debug({detectionModel});

    const tensor = getImageTensorForDetectionModel(screenshotRef.current, [512,512]);
    // console.debug({tensor})

    let prediction = await detectionModel.current.execute(tensor);
    prediction = tf.squeeze(prediction, 0);
    if (Array.isArray(prediction)) {
      prediction = prediction[0];
    }
    // console.debug({prediction})
    await tf.browser.toPixels(prediction, heatmapContainerRef.current);


    const boundingBoxes = await extractBoundingBoxesFromHeatmap([512,512]);
    let boundingBoxesPixel = boundingBoxes.map((boundingBoxe) => {
      return {bbox: boundingBoxe.coordinates.map((([x,y]) => [x*320, y*240]))};
    });

    boundingBoxesPixel = boundingBoxesPixel.filter(pre => {
      if((pre.bbox[1][0]-pre.bbox[0][0]) < 10){
        return false;
      }
      if((pre.bbox[2][1]-pre.bbox[0][1]) < 10){
        return false;
      }
      return true;
    })

    await setPredictionsToDisplay(boundingBoxesPixel);

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
      let canvas = document.getElementById('canvas'+index);
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

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
      } catch (error) {
        console.error("Prediction error:", error);
      }
  }

  const loopTakeAndGetText = async () => {
    loopIsRunning.current = true;
      while(loopIsRunning.current){
        await takePhoto();
        await getText();
      }
  }

  const stopLoop = () => {
    loopIsRunning.current = false;
  }

    return <InteractiveWrapper>
      <Title>Interactive</Title>
      <div>
        <div style={{position: 'relative'}}>
          <img src={picture === '' ? dog : picture} />
          {predictionsToDisplay.map((prediction:any) => {
            return <div style={{
               position:'absolute',
               top: prediction.bbox[0][1]+'px',
               left: prediction.bbox[0][0]+'px',
               width: (prediction.bbox[2][0] - prediction.bbox[0][0])+'px',
               height: (prediction.bbox[2][1] - prediction.bbox[0][1]) +'px',
               backgroundColor: 'rgba('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+','+0.5+')',
               color: 'black',
              }}>{prediction.class}</div>
          })}
        </div>
      <button onClick={() => takePhoto()}>Take a photo</button>
      <button onClick={() => getText()}>Get text of photo</button>
      <button onClick={() => loopTakeAndGetText()}>Loop</button>
      <button onClick={() => stopLoop()}>Stop loop</button>
      <video onCanPlay={() => paintToCanvas()} ref={videoRef} />
      <canvas ref={photoRef} />
      <div>
          <img ref={screenshotRef} src={picture} alt='screenshot'/>
        <div>ocrText: {ocrText}</div>
      </div>
      <canvas ref={heatmapContainerRef} id={"heatmap"} style={{width: screenshotRef.current ? screenshotRef.current.offsetWidth : 0, height: screenshotRef.current ? screenshotRef.current.offsetHeight : 0}}>
        heatmapContainerRef
      </canvas>
      testcanvas
        <canvas id={'canvas'}>

      </canvas>
        <canvas id={'canvas0'} />
        <canvas id={'canvas1'} />
        <canvas id={'canvas2'} />
        <canvas id={'canvas3'} />
        <canvas id={'canvas4'} />
        <canvas id={'canvas5'} />
        <canvas id={'canvas6'} />
        <canvas id={'canvas7'} />
        <canvas id={'canvas8'} />
        <canvas id={'canvas9'} />
        <canvas id={'canvas10'} />
        <canvas id={'canvas11'} />
        <canvas id={'canvas12'} />
        <canvas id={'canvas13'} />
        <canvas id={'canvas14'} />
        <canvas id={'canvas15'} />
        <canvas id={'canvas16'} />
        <canvas id={'canvas17'} />
        <canvas id={'canvas18'} />
      <div>
        crops
        <RenderCrops crops={crops.current} />
      </div>
      </div>
    </InteractiveWrapper>
};

export default Interactive;
