import {ImageContainer, ImagesContainer} from "./Tensorflow.style";
import {useEffect, useRef, useState} from "react";
import {GraphModel, loadGraphModel} from "@tensorflow/tfjs";
import {
  getBoundingBoxesPixel,
  getHeatMapFromImage, getImagesFromBoundingBoxes, loadModel,
  recognizeWords
} from "../utils/tensorflowUtil";
import {drawVideoStillToCanvas, setCanvasDataToImage, setSizeOfElement} from "../utils/image";

const randomColors = (new Array(10)).fill(null).map(() => {
  return 'rgba(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + 0.5 + ')';
});

export default () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pictureRef = useRef<HTMLImageElement>(null);
  const heatMapCanvasRef = useRef<HTMLCanvasElement>(null);

  const recognitionModel = useRef<GraphModel|null>(null);
  const detectionModel = useRef<GraphModel|null>(null);

  const dimensions = useRef({width: 320, height: 0});
  const streaming = useRef(false);

  const tensors = useRef<any[]>([]);

  const images = useRef<HTMLImageElement[]>([]);

  const [number, setNumber] = useState<number>();

  const [bbpList, setBbpList] = useState<any[]>([]);
  const crops = useRef<any[]>([]);


  const delay = (ms:number) => new Promise(
    resolve => setTimeout(resolve, ms)
  );


  const [loopStarted, setLoopStarted] = useState(false)
  const [nextToTrigger, setNextToTrigger] = useState<''|'takePhoto'|'getHeatmap'|'getBoundingBoxes'|'getWordsAction'|'recognizeWords'>('');

  const actionOrder: ('takePhoto'|'getHeatmap'|'getBoundingBoxes'|'getWordsAction'|'recognizeWords')[] = [
    'takePhoto',
    'getHeatmap',
    'getBoundingBoxes',
    'getWordsAction',
    'recognizeWords',
  ];

  const startLoop = () => {
    setLoopStarted(true);
    setNextToTrigger('takePhoto');
  }

  const takePhoto = async () => {
    // if (videoRef.current === null || canvasRef.current === null || pictureRef.current === null) {
    if (canvasRef.current === null || pictureRef.current === null) {
      console.error('videoRef, canvasRef or pictureRef is null');
      return;
    }
    const videoCreate = document.createElement('video');
    videoCreate.oncanplay = () => {

    }
    drawVideoStillToCanvas(videoRef.current, canvasRef.current, dimensions.current);
    await setCanvasDataToImage(canvasRef.current, pictureRef.current);
  };

  const getHeatmap = async () => {
    if(pictureRef.current === null || detectionModel.current === null || heatMapCanvasRef.current === null) return;
    await getHeatMapFromImage(
      pictureRef.current,
      detectionModel.current,
      heatMapCanvasRef.current,
    );
  };

  const getBoundingBoxes = async () => {
    console.debug('start getBoundingBoxes')
    setBbpList((await getBoundingBoxesPixel()).map(({bbox})=>({
      x: Math.round(bbox[0][0]),
      y: Math.round(bbox[0][1]),
      width: Math.round(bbox[1][0]-bbox[0][0]),
      height: Math.round(bbox[3][1]-bbox[0][1]),
    })));
  }

  const getWordsAction = async () => {
    console.debug('start getWordsAction')
    if(pictureRef.current === null) return;
    // tensors.current = await getWords(bbpList, canvasRef.current, crops);
    images.current = getImagesFromBoundingBoxes(bbpList, pictureRef.current);
  }

  const recognizeWordsAction = async () => {
    console.debug('start recognizeWordsAction')
    if(recognitionModel.current === null) return;
    // const words = await recognizeWords(recognitionModel.current, crops.current)
    // console.debug({words})
    if(images.current.length === 0) return;
    const words = await recognizeWords(recognitionModel.current, images.current);
    if(words === undefined) {
      setNumber(undefined)
    } else {
      const number = Number(words.reduce((acc, word) => {
        return acc + word.split('').filter(char=>!isNaN(Number(char))).join('');
      }, ''));
      setNumber(number);
    }
  }
  const actions = {
    takePhoto: takePhoto,
    getHeatmap: getHeatmap,
    getBoundingBoxes: getBoundingBoxes,
    getWordsAction: getWordsAction,
    recognizeWords: recognizeWordsAction,
  }

  useEffect(() => {
    console.debug('enter useEffect');
    (async (currToTrigger) => {
      if(currToTrigger === '' || !loopStarted) return;
      await delay(100);
      await actions[currToTrigger]();
      await delay(100);
      const nextIndex = actionOrder.indexOf(currToTrigger) + 1;
      setNextToTrigger(actionOrder[(nextIndex > actionOrder.length-1)?0:nextIndex]);
    })(nextToTrigger)
  }, [nextToTrigger]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if(videoRef.current === null) return;
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      })
    ;

      loadModel(
        '/src/models/crnn_mobilenet_v2/model.json',
        'recognition-model',
        recognitionModel
      );

      loadModel(
        '/src/models/db_mobilenet_v2/model.json',
        'detection-model',
        detectionModel
      );

  }, []);

  return (
    <div>
      <h1>TensorflowV2</h1>
      <button onClick={startLoop}>Trigger all</button>
      <ImagesContainer>
        <ImageContainer>
          <h2>video</h2>
          {/*<video*/}
          {/*  ref={videoRef}*/}
          {/*  onCanPlay={(event) => {*/}
          {/*    if(streaming.current) {*/}
          {/*      console.debug('video is already streaming');*/}
          {/*      return;*/}
          {/*    }*/}
          {/*    if (videoRef.current === null || canvasRef.current === null) {*/}
          {/*      console.error('videoRef, canvasRef null');*/}
          {/*      console.error({videoRef: videoRef.current, canvasRef: canvasRef.current})*/}
          {/*      return;*/}
          {/*    }*/}
          {/*    const ratio = videoRef.current.videoWidth / videoRef.current.videoHeight;*/}
          {/*    dimensions.current = {*/}
          {/*      width: dimensions.current.width,*/}
          {/*      height: dimensions.current.width / ratio,*/}
          {/*    };*/}

          {/*    setSizeOfElement(videoRef.current, dimensions.current);*/}
          {/*    setSizeOfElement(canvasRef.current, dimensions.current);*/}
          {/*    streaming.current = true;*/}
          {/*  }}*/}
          {/*/>*/}
          <button onClick={takePhoto}>Take a picture</button>
        </ImageContainer>
        <ImageContainer>
          <h2>picture</h2>
          <canvas ref={canvasRef} style={{display: 'none'}}/>
          <div style={{position: 'relative'}}>
            <img ref={pictureRef} alt=''/>
            {bbpList.map((bbp, index) => {
              return <div style={{
                position: 'absolute',
                top: bbp.y + 'px',
                left: bbp.x + 'px',
                width: bbp.width + 'px',
                height: bbp.height + 'px',
                backgroundColor: randomColors[index%randomColors.length],
              }}>
              </div>
            })}
          </div>
          <button onClick={getHeatmap}>get heatmap</button>
        </ImageContainer>
        <ImageContainer>
          <h2>heatmap</h2>
          <canvas id='heatmap' style={{width: '320px', height: '240px'}} ref={heatMapCanvasRef}/>
          <button onClick={getBoundingBoxes}>get bounding boxes</button>
        </ImageContainer>
        <ImageContainer>
          {
            bbpList.map((bbp, index) => {
              return (
                <div key={index}>
                  <h2>bounding box {index}</h2>
                  <p>{JSON.stringify(bbp)}</p>
                </div>
              )
            })
          }
        </ImageContainer>
      </ImagesContainer>
      <ImagesContainer>
        <ImageContainer>
          <h2>sub image canvas</h2>
          <button onClick={getWordsAction}>recognize</button>
          <img id={'canvas0'} alt='1' />
          <img id={'canvas1'} alt='1' />
          <img id={'canvas2'} alt='1' />
          <img id={'canvas3'} alt='1' />
          <img id={'canvas4'} alt='1' />
          <img id={'canvas5'} alt='1' />
          <img id={'canvas6'} alt='1' />
          <img id={'canvas7'} alt='1' />
          <img id={'canvas8'} alt='1' />
          <img id={'canvas9'} alt='1' />
          <img id={'canvas10'} alt='1' />
          <img id={'canvas11'} alt='1' />
          <img id={'canvas12'} alt='1' />
          <img id={'canvas13'} alt='1' />
          <img id={'canvas14'} alt='1' />
          <img id={'canvas15'} alt='1' />
          <img id={'canvas16'} alt='1' />
          <img id={'canvas17'} alt='1' />
          <img id={'canvas18'} alt='1' />
        </ImageContainer>
        <ImageContainer>
          <button onClick={recognizeWordsAction}>recognize words</button>
        </ImageContainer>
        <ImageContainer>
          <h2>recognized number</h2>
          <p>{number}</p>
        </ImageContainer>
      </ImagesContainer>
    </div>
  );
}