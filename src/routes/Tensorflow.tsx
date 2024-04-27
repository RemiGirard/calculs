import {useEffect, useRef, useState} from "react";
import {
    drawVideoToCanvas,
    getBoundingBoxesPixel,
    getHeatMapFromImage,
    loadModel, nextStep,
    playVideo,
    takePicture
} from "../utils/tensorflowUtil";
import {Container, ImageContainer, ImagesContainer} from './Tensorflow.style';
import {GraphModel} from "@tensorflow/tfjs";

export default () => {
    const detectionModel = useRef<GraphModel|null>(null);
    const recognitionModel = useRef<GraphModel>(null);


    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pictureRef = useRef<HTMLImageElement>(null);
    const heatmapRef = useRef<HTMLCanvasElement>(null);
    const crops = useRef([]);
    const [words, setWords] = useState([]);

    const [picture, setPicture] = useState('');
    const [boundingBoxes, setBoundingBoxes] = useState<any[]>([]);

    useEffect(() => {
        if(videoRef.current !== null){
            playVideo(videoRef.current, (...props) => navigator.mediaDevices.getUserMedia(...props));
        }
        loadModel(
            '/src/models/db_mobilenet_v2/model.json',
            'detection-model',
            detectionModel
        );
        loadModel(
          '/src/models/crnn_mobilenet_v2/model.json',
          'recognition-model',
          recognitionModel
        )
    }, []);

    const takePictureAction = async () => {
        if(canvasRef.current === null) return;
        setPicture(await takePicture(canvasRef.current));
    }

    const getHeatmapAction = async () => {
        if(pictureRef.current === null || detectionModel.current === null || heatmapRef.current === null) return;
        await getHeatMapFromImage(pictureRef.current, detectionModel.current, heatmapRef.current)
    }

    const delay = (ms:number) => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    const triggerAll = async () => {
        await takePictureAction();
        await delay(1000);
        await getHeatmapAction();
        await delay(1000);
        const bbp = await getBoundingBoxesPixel();
        setBoundingBoxes(bbp)
    }

    return (<Container>
        <h1>Tensorflow</h1>
        <button onClick={() => triggerAll()}>Trigger all</button>
        <ImagesContainer>
            <ImageContainer>
                <h2>video</h2>
                <video
                    onCanPlay={() => {
                        if(videoRef.current !== null && canvasRef.current !== null) {
                            drawVideoToCanvas({video : videoRef.current, canvas: canvasRef.current});
                        }
                    }}
                    ref={videoRef}
                />
            </ImageContainer>
            <ImageContainer hidden={true}>
                <h2>video canvas</h2>
                <canvas ref={canvasRef}/>
            </ImageContainer>
            <ImageContainer>
                <h2>Picture</h2>
                <img ref={pictureRef} src={picture} alt='picture' />
                <button onClick={takePictureAction}>Take a picture</button>
            </ImageContainer>
            <ImageContainer>
                <h2>Heatmap</h2>
                <canvas ref={heatmapRef} id='heatmap'/>
                <button onClick={getHeatmapAction}>Get heatmap from picture</button>
            </ImageContainer>
        </ImagesContainer>
        <ImagesContainer>
            <ImageContainer>
                <button
                    onClick={async () => {
                        const bbp = await getBoundingBoxesPixel();
                        setBoundingBoxes(bbp)
                        console.debug({bbp})
                    }}
                >get bounding boxes</button>
                <div style={{width: '200px'}}>
                {boundingBoxes.map((bb, i) => (
                    <div key={i}>{bb.bbox.map(v=>v.join(',')).join(';')}</div>
                ))}
                </div>
            </ImageContainer>
            <ImageContainer>
                <h2>bounding boxes</h2>
                <div style={{width: '320px', height: '240px', position: 'relative'}}>
                    <img ref={pictureRef} src={picture} alt='picture'/>
                    {boundingBoxes.map(prediction=> {
                        return <div style={{
                            position: 'absolute',
                            top: prediction.bbox[0][1] + 'px',
                            left: prediction.bbox[0][0] + 'px',
                            width: (prediction.bbox[2][0] - prediction.bbox[0][0]) + 'px',
                            height: (prediction.bbox[2][1] - prediction.bbox[0][1]) + 'px',
                            backgroundColor: 'rgba(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + 0.5 + ')',

                        }}>
                        </div>
                    })}
                </div>
            </ImageContainer>
            <ImageContainer>
                <button onClick={()=> {
                    nextStep(boundingBoxes, pictureRef, crops, recognitionModel)
                }}>recognize</button>
            </ImageContainer>
            <ImageContainer>
                <canvas id={'canvas0'}/>
                <canvas id={'canvas1'}/>
                <canvas id={'canvas2'}/>
                <canvas id={'canvas3'}/>
                <canvas id={'canvas4'}/>
                <canvas id={'canvas5'}/>
                <canvas id={'canvas6'}/>
                <canvas id={'canvas7'}/>
                <canvas id={'canvas8'}/>
                <canvas id={'canvas9'}/>
                <canvas id={'canvas10'}/>
                <canvas id={'canvas11'}/>
                <canvas id={'canvas12'}/>
                <canvas id={'canvas13'}/>
                <canvas id={'canvas14'}/>
                <canvas id={'canvas15'}/>
                <canvas id={'canvas16'}/>
                <canvas id={'canvas17'}/>
                <canvas id={'canvas18'}/>
            </ImageContainer>
            <ImageContainer>
                {words.map(word => {
                    return <div key={word}>{word}</div>
                })}
            </ImageContainer>
        </ImagesContainer>
    </Container>)
};
