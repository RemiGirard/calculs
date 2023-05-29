import { CalcType, ConfigInterface, ExerciceInterface, calcTypes } from "../Calcul.types";
import { ColumnsConfigWrapper, ExerciceConfigWrapper, TimeConfigWrapper } from "../components/ExerciceConfig.style";
import Input from "../components/inputs/Input";
import ColumnInput from "../components/inputs/ColumnInput";
import { GenerateExercicesWrapper, Title } from "./GenerateExercices.style";
import dictionary from '../dictionary.json';
import ColumnCloseCross from "../components/molecules/ColumnCloseCross";
import BigActionButton from "../components/molecules/BigActionButton";
import colors from '../colors.json';
import play from '../assets/play.svg';
import Save from '../assets/Save';
import Trash from '../assets/Trash';

import useGenerator from "../hooks/useGenerator";
import { useState } from "react";

const isDevEnv:boolean = (process.env.NODE_ENV === 'development');

const generateExercicesV2 = ({title, sessionConfig: setSessionConfigV1, setSessionConfig: setSetSessionConfigV1, setGameStarted, config}: any) => {

  const defaultExerciceV2:ExerciceInterface = {
    questionTime: isDevEnv ? 5 : 180,
    answerTime: isDevEnv ? 5 : 60,
    equationCount: 6,
    columns: [{
      type: 'addition',
      1: {
        type: 'range',
        min: 1,
        max: 9,
      },
      2: {
        type: 'range',
        min: 1,
        max: 9,
      },
      answer: {
        1: false,
        2: false,
        result: true,
      }
    }],
  };

  const [sessionConfig, setSessionConfig] = useState<ExerciceInterface[]>([defaultExerciceV2]);

  const [exercices, generatorRequest] = useGenerator(sessionConfig);

  const updateExercice = ({exerciceIndex, keyToChange, newValue}: any) => {
    let newSessionConfig = structuredClone(sessionConfig);
    let newExercice = structuredClone(newSessionConfig[exerciceIndex])
    newExercice[keyToChange] = newValue;
    newSessionConfig[exerciceIndex] = newExercice;
    setSessionConfig(newSessionConfig);
  };

  const updateColumn = ({exerciceIndex, columnIndex, keyToChange, newValue}: any) => {
    let newColumns = structuredClone(sessionConfig[exerciceIndex].columns);
    let newColumn = structuredClone(sessionConfig[exerciceIndex].columns[columnIndex]);
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
  




  return (<GenerateExercicesWrapper>
      <Title style={{width: (title.length*1.6).toString() +  '%'}}>
        {title}
      </Title>
      <div style={{width: '96%', margin: '2%'}}>
        {sessionConfig.map((exercice: ExerciceInterface, exerciceIndex: number) => {
          return (<ExerciceConfigWrapper key={exerciceIndex} iseven={exerciceIndex % 2 === 0}>
            <div style={{width: '15%', marginRight: '0.3%', display: 'flex', flexDirection: 'column'}}>
              <TimeConfigWrapper> {/* times and number */}
                <Input
                  label={dictionary.fields.questionTime}
                  value={exercice.questionTime}
                  setValue={(newValue: string) => {updateExercice({exerciceIndex, keyToChange: 'questionTime', newValue})}}
                  unit='sec'
                />
                <Input
                  label={dictionary.fields.answerTime}
                  value={exercice.answerTime}
                  setValue={(newValue: string) => {updateExercice({exerciceIndex, keyToChange: 'answerTime', newValue})}}
                  unit='sec'
                />

                <Input
                  label={dictionary.fields.calcNumber}
                  value={exercice.equationCount}
                  setValue={(newValue: string) => {updateExercice({exerciceIndex, keyToChange: 'equationCount', newValue})}}
                />
              </TimeConfigWrapper>
              <div style={{ paddingTop: '3%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center'}}>
                <div
                  style={{width: '20%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}
                >
                  {<Save />}
                </div>
                <div
                  style={{width: '20%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}
                  onClick={() => {sessionConfig.length > 1 ? removeExercice(exerciceIndex) : null}}  
                >
                  <Trash />
                </div>
              </div>
            </div>
            <ColumnsConfigWrapper>
            
            {exercice.columns.map((column, columnIndex) => {
              return (<div key={columnIndex}>
                  { exercice.columns.length > 1 ? <ColumnCloseCross onClick={()=>{removeColumn({exerciceIndex, columnIndex})}}/> : null}
                  <ColumnInput
                    label={'type'}
                    type={'select'}
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
            
            <div style={{width: '25%'}}> {/* preview */}
              preview
            </div>
          </ExerciceConfigWrapper>);
        })}
      </div>
      <div style={{margin: '2%', width: '96%', height: '8%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
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
          onClick={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {setGameStarted()}}
          style={{width: '10%', height: '100%'}}
        > 
          <img width={'30em'} src={play} alt="play" />
        </BigActionButton> 
        </div>
    <div style={{color: 'white'}}>{JSON.stringify(sessionConfig)}</div>
    <div style={{color: 'white'}}>{JSON.stringify(exercices)}</div>
  </GenerateExercicesWrapper>);
};

export default generateExercicesV2;