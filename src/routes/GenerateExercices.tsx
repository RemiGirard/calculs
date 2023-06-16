import { useEffect, useRef, useState } from "react";

import Input from "../components/molecules/inputs/Input";
import ColumnInput from "../components/molecules/inputs/ColumnInput";
import ColumnCloseCross from "../components/molecules/ColumnCloseCross";
import BigActionButton from "../components/molecules/buttons/BigActionButton";
import useGenerator from "../hooks/useGenerator";
import {
  GenerateExercicesWrapper,
  Title,
  ColumnsConfigWrapper,
  ExerciceConfigWrapper,
  TimeConfigWrapper,
  TopBar,
} from "./GenerateExercices.style";
import { ExerciceConfig, calcTypes } from "./ExerciceConfig.types";
import Play from '../assets/Play';
import Save from '../assets/Save';
import Trash from '../assets/Trash';
import colors from '../colors.json';
import dictionary from '../dictionary.json';
import Game from "./Game";
import { getRatio } from "../utils/utils";
import { Exercice } from "./Exercice.type";

const isDevEnv:boolean = (process.env.NODE_ENV === 'development');

const GenerateExercices = ({title, setGameStarted, setExercices, config}: any) => {
  const defaultExercice:ExerciceConfig = {
    questionTime: isDevEnv ? 5 : 180,
    answerTime: isDevEnv ? 5 : 60,
    equationCount: 6,
    columns: [{
      type: 'addition',
      1: {
        type: 'range',
        min: 1,
        max: 9,
        fix: 1,
      },
      2: {
        type: 'range',
        min: 1,
        max: 9,
        fix: 1,
      },
      answer: {
        1: false,
        2: false,
        result: true,
      }
    },{
      type: 'addition',
      1: {
        type: 'range',
        min: 1,
        max: 9,
        fix: 1,
      },
      2: {
        type: 'range',
        min: 1,
        max: 9,
        fix: 1,
      },
      answer: {
        1: false,
        2: false,
        result: true,
      }
    }],
  };

  const [sessionConfig, setSessionConfig] = useState<ExerciceConfig[]>([defaultExercice]);

  const [exercices, generatorRequest]: [Exercice[], any] = useGenerator(sessionConfig);

  useEffect(() => {
    sessionConfig.forEach((exerciceConfig, index) => {
      generatorRequest({
        type: 'generate exercice',
        exerciceIndex: index,
        exerciceConfig: exerciceConfig,
      });
    });
  }, [sessionConfig]);

  useEffect(()=> {
    const newExercices = structuredClone(exercices);
    setExercices(newExercices);
  }, [exercices])
  
  const updateExercice = ({exerciceIndex, keyToChange, newValue}: any) => {
    let newSessionConfig = structuredClone(sessionConfig);
    let newExercice:any = structuredClone(newSessionConfig[exerciceIndex])
    newExercice[keyToChange] = newValue;
    newSessionConfig[exerciceIndex] = newExercice;
    setSessionConfig(newSessionConfig);
  };

  const updateColumn = ({exerciceIndex, columnIndex, keyToChange, newValue}: any) => {
    let newColumns = structuredClone(sessionConfig[exerciceIndex].columns);
    let newColumn:any = structuredClone(sessionConfig[exerciceIndex].columns[columnIndex]);
    newColumn[keyToChange] = newValue;
    newColumns[columnIndex] = newColumn;

    updateExercice({exerciceIndex, keyToChange: 'columns', newValue: newColumns});
  };

  const addColumn = ({exerciceIndex}: any) => {
    let newColumns = structuredClone(sessionConfig[exerciceIndex].columns);
    let newColumn = structuredClone(sessionConfig[exerciceIndex].columns[newColumns.length-1]);
    newColumns = [...newColumns, newColumn];

    updateExercice({exerciceIndex, keyToChange: 'columns', newValue: newColumns});
  };

  const removeColumn = ({exerciceIndex, columnIndex}: any) => {
    let newColumns = structuredClone(sessionConfig[exerciceIndex].columns);
    newColumns.splice(columnIndex, 1)

    updateExercice({exerciceIndex, keyToChange: 'columns', newValue: newColumns});
  }

  const addExercice = () => {
    let newSessionConfig = structuredClone(sessionConfig);
    let newExercice = structuredClone(newSessionConfig[newSessionConfig.length-1]);
    newSessionConfig.push(newExercice);

    setSessionConfig(newSessionConfig);
  }

  const removeExercice = (exerciceIndex: number) => {
    let newSessionConfig = structuredClone(sessionConfig);
    newSessionConfig.splice(exerciceIndex, 1)

    setSessionConfig(newSessionConfig);
  }

  const [ratio, setRatio] = useState<number>(getRatio());
  useEffect(() => {
    const handleResize = () => {
      setRatio(getRatio());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener("resize", handleResize);
  },[])

  // handle scroll bar, too complicated for just a scroll bar ?
  const [exercicesWindowWidth, setExercicesWindowWidth] = useState(0);
  const exercicesWindowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    exercicesWindowRef.current !== null
    ? setExercicesWindowWidth(exercicesWindowRef.current['offsetHeight'])
    : null
  ;
  }, [exercicesWindowRef, exercices]);

  const [exercicesWidth, setExercicesWidth] = useState(0);
  const exercicesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    exercicesRef.current !== null
    ? setExercicesWidth(exercicesRef.current['scrollHeight'])
    : null
  ;
  }, [exercicesRef, exercices]);

  const [scrollExercices, setScrollExercices] = useState<number>(0);

  const scrollEvent = (e: any) => {
    const target = e.target as HTMLTextAreaElement;
    setScrollExercices(target.scrollTop);
  }

  return (<GenerateExercicesWrapper>
      <TopBar>
        <Title $titleLength={title.length}>
          {title}
        </Title>
      </TopBar>
      <div ref={exercicesWindowRef} className="hide-scrollbar" style={{width: '98%', margin: '1%', overflow: 'scroll', height: '70%', display: 'flex', flexDirection: 'row'}}>
        <div ref={exercicesRef} onScroll={scrollEvent} className="hide-scrollbar" style={{width: '98%', height: '98%', overflow: 'scroll'}}>
          {sessionConfig.map((exercice: ExerciceConfig, exerciceIndex: number) => {
            const numberOfTimeInput = 3;
            const heightOfTimeInput = (97/numberOfTimeInput)*0.97+'%';
            return (<ExerciceConfigWrapper key={exerciceIndex} $iseven={exerciceIndex % 2 === 0}>
              <div style={{
                width: '15%',
                height: '100%',
                marginRight: '0.3%',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <TimeConfigWrapper> {/* times and number */}
                  <Input
                    label={dictionary.fields.questionTime}
                    value={exercice.questionTime}
                    setValue={(newValue: string) => {updateExercice({
                      exerciceIndex,
                      keyToChange: 'questionTime',
                      newValue,
                    })}}
                    unit='sec'
                    style={{height: heightOfTimeInput}}
                  />
                  <Input
                    label={dictionary.fields.answerTime}
                    value={exercice.answerTime}
                    setValue={(newValue: string) => {updateExercice({
                      exerciceIndex,
                      keyToChange: 'answerTime',
                      newValue,
                    })}}
                    unit='sec'
                    style={{height: heightOfTimeInput}}
                  />
                  <Input
                    label={dictionary.fields.calcNumber}
                    value={exercice.equationCount}
                    setValue={(newValue: string) => {updateExercice({
                      exerciceIndex,
                      keyToChange: 'equationCount',
                      newValue: Number(newValue),
                    })}}
                    style={{height: heightOfTimeInput}}
                  />
                </TimeConfigWrapper>
                <div style={{
                  height: '9%',
                  paddingTop: '1.5%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignContent: 'center',
                }}>
                  <div
                    style={{
                      width: '12%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignContent: 'center',
                      visibility: 'hidden',
                    }}
                  >
                    {<Save />}
                  </div>
                  <div
                    style={{
                      width: '12%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignContent: 'center',
                      visibility: sessionConfig.length > 1 ? 'visible': 'hidden',
                    }}
                    onClick={() => {sessionConfig.length > 1 ? removeExercice(exerciceIndex) : null}}  
                  >
                    <Trash />
                  </div>
                </div>
              </div>
              <ColumnsConfigWrapper className="hide-scrollbar" >
              
              {exercice.columns.map((column, columnIndex) => {
                return (<div key={columnIndex}>
                    { exercice.columns.length > 1 ? <ColumnCloseCross onClick={()=>{removeColumn({exerciceIndex, columnIndex})}}/> : null}
                    <ColumnInput
                      label={dictionary.fields.type}
                      type={'select'}
                      fieldName={'type'}
                      options={calcTypes}
                      value={column.type}
                      setValue={(newValue: string) => {updateColumn({exerciceIndex, columnIndex, keyToChange: 'type', newValue})}}
                      reducedWidth={true}
                    />
                    <ColumnInput
                      label={'1er'}
                      type={'numberGeneration'}
                      value={column[1]}
                      setValue={(newValue: string) => {updateColumn({exerciceIndex, columnIndex, keyToChange: '1', newValue})}}
                    />
                    <ColumnInput
                      label={'2ème'}
                      type={'numberGeneration'}
                      value={column[2]}
                      setValue={(newValue: string) => {updateColumn({exerciceIndex, columnIndex, keyToChange: '2', newValue})}}
                    />
                    <ColumnInput
                      label={'trou'}
                      type={'answer'}
                      value={column.answer}
                      setValue={(newValue: string) => {updateColumn({exerciceIndex, columnIndex, keyToChange: 'answer', newValue})}}
                    />
                </div>)
              })}
              <div onClick={() => addColumn({exerciceIndex})}>+</div>
              </ColumnsConfigWrapper>
              
              <div style={{display: 'flex',width: '20%'}}>
                <div style={{ width: '100%',aspectRatio: ratio}}>
                  {exercices.length && exercices[exerciceIndex] !==undefined && exercices[exerciceIndex].columns.length
                    ? <Game exercices={exercices} config={config} startTimers={false} startingLevel={exerciceIndex}/>
                    : <div style={{width: '100%', height: '100%'}}>preview</div>
                  }
                </div>
              </div>
            </ExerciceConfigWrapper>);
          })}
        </div>
        <div style={{width: '2%', height: '98%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5px', paddingBottom: '5px'}}>
          <div style={{height: (scrollExercices/exercicesWidth)*99+'%', width: '100%'}}></div>
            <div style={{backgroundColor: colors.blueShades[2], borderRadius: '35px', width: '60%', height: ((exercicesWindowWidth/exercicesWidth)*99).toString()+'%'}} />
        </div>
      </div>
      <div style={{margin: '1%', width: '98%', height: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <BigActionButton
          color={colors.blueShades[4]}
          colorHover={colors.blueShades[5]}
          textColor={'black'}
          onClick={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {addExercice()}}
          style={{width: '10%', height: '100%'}}
        > 
          +
        </BigActionButton> 
        <BigActionButton
          color={colors.greenShade[1]}
          colorHover={colors.blueShades[5]}
          textColor={'black'}
          onClick={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            setGameStarted();
          }}
          style={{width: '10%', height: '100%'}}
        > 
          <div
            style={{width: '20%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}
          >
            {<Play />}
          </div>
        </BigActionButton> 
      </div>
  </GenerateExercicesWrapper>);
};

export default GenerateExercices;