import { useCallback, useEffect, useRef, useState } from "react";
import { InteractiveWrapper } from "./Interactive.style";
import {createWorker    } from "tesseract.js";
import Title from "../components/molecules/Title";
import path from 'path';
import * as tf from '@tensorflow/tfjs';
// import cocoSd from '@tensorflow-models/coco-ssd';
import cocoSsd from '@tensorflow-models/coco-ssd/dist/index';
import cat from '../assets/cat.jpg';

const Interactive = () => {
  
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const stripRef = useRef(null);
  const [picture, setPicture] = useState('');
  const [ocrText, setOcrText] = useState('');

  const testTf = async() => {
    // const img = document.getElementById('img');

    // Load the model.
    console.debug({cocoSsd});
    tf.backend();
    const model = await cocoSsd.load();
    const imageDataCat:ImageData|undefined = await imageDataFromSource(cat)
    // Classify the image.
    console.debug({imageDataCat});
    if(imageDataCat !== undefined){

      const predictions = await model.detect(imageDataCat);
      
      console.log('Predictions: ');
      console.log(predictions)
    }
  }

  useEffect(() => {
    getVideo();
    testTf();
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

  const takePhoto = () => {
    let photo:any = photoRef.current;
    // let strip:any = stripRef.current;

    // console.warn(strip);

    const data = photo.toDataURL("image/jpeg");

    // console.warn(data);
    // const link = document.createElement("a");
    // link.href = data;
    // link.setAttribute("download", "myWebcam");
    // link.innerHTML = `<img src='${data}' alt='thumbnail'/>`;
    setPicture(data);
    // strip.insertBefore(link, strip.firstChild);
  };

  const getText = async () => {
    const worker = await createWorker({
      langPath: 'test',
      logger: m => console.log(m)
    });
    
  
    (async () => {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(picture);
      console.log(text);
      setOcrText(text);
      await worker.terminate();
    })();
  }


  ;

  

    return <InteractiveWrapper>
      <Title>Interactive</Title>
      <div>
        <img src={cat} />
      <button onClick={() => takePhoto()}>Take a photo</button>
      <button onClick={() => getText()}>Get text of photo</button>
      <video onCanPlay={() => paintToCanvas()} ref={videoRef} />
      <canvas ref={photoRef} />
      <div>
        <a href={picture} download={'myWebcam'}>
          <img src={picture} alt='screenshot'/>
        </a>
        <div>ocrText: {ocrText}</div>
      </div>
      </div>
    </InteractiveWrapper>
};

async function imageDataFromSource (source:any) {
  const image = Object.assign(new Image(), { src: source });
  await new Promise(resolve => image.addEventListener('load', () => resolve('')));
  const context = Object.assign(document.createElement('canvas'), {
     width: image.width,
     height: image.height
  }).getContext('2d');
  if(context !== null){

    context.imageSmoothingEnabled = false;
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, image.width, image.height);
  }
}

export default Interactive;