import {ImageContainer, ImagesContainer} from "./Tensorflow.style";
import {useEffect, useRef} from "react";
import {GraphModel, loadGraphModel} from "@tensorflow/tfjs";

export default () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pictureRef = useRef<HTMLImageElement>(null);

  const recognitionModel = useRef<GraphModel|null>(null);
  const detectionModel = useRef<GraphModel|null>(null);

  const dimensions = useRef({width: 320, height: 0});
  const streaming = useRef(false);

  const takePhoto = () => {
    console.debug({dimensions})
    if (videoRef.current === null || canvasRef.current === null || pictureRef.current === null) {
      console.error('videoRef, canvasRef or pictureRef is null');
      return;
    }
    const context = canvasRef.current.getContext("2d");
    if (context === null) return;
    canvasRef.current.width = dimensions.current.width;
    canvasRef.current.height = dimensions.current.height;
    context.drawImage(videoRef.current, 0, 0, dimensions.current.width, dimensions.current.height);

    const data = canvasRef.current.toDataURL("image/png");
    pictureRef.current.setAttribute("src", data);
  };



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

    (async () => {
      recognitionModel.current = await loadGraphModel('/src/models/crnn_mobilenet_v2/model.json');
    })();

    (async () => {
      detectionModel.current = await loadGraphModel('/src/models/db_mobilenet_v2/model.json');
    })();

  }, []);

  return (
    <div>
      <h1>TensorflowV2</h1>
      <ImagesContainer>
        <ImageContainer>
          <h2>video</h2>
          <video
            onCanPlay={(event) => {
              if (videoRef.current === null || canvasRef.current === null || streaming.current) {
                console.error('videoRef, canvasRef or streaming is null');
                console.error({videoRef: videoRef.current, canvasRef: canvasRef.current, streaming: streaming.current})
                return;
              }
              console.debug({videoWidth: videoRef.current.videoWidth, videoHeight: videoRef.current.videoHeight})
              dimensions.current = {width: dimensions.current.width, height: (videoRef.current.videoHeight / videoRef.current.videoWidth) * dimensions.current.width};

              videoRef.current.setAttribute("width", String(dimensions.current.width));
              videoRef.current.setAttribute("height", String(dimensions.current.height));
              canvasRef.current.setAttribute("width", String(dimensions.current.width));
              canvasRef.current.setAttribute("height", String(dimensions.current.height));
              streaming.current = true;
            }}
            ref={videoRef}
          />
          <button onClick={() => takePhoto()}>Take a picture</button>
        </ImageContainer>
        <ImageContainer>
          <h2>picture</h2>
          <canvas ref={canvasRef} style={{display: 'none'}}/>
          <img ref={pictureRef} alt=''/>
        </ImageContainer>
      </ImagesContainer>
    </div>
  );
}