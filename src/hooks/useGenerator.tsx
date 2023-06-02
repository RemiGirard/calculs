import { Dispatch, useReducer, useState } from "react";
import { Column, EquationInterface, Exercice } from "../routes/Exercice.type";
import { ColumnConfig, ExerciceConfig, NumberConfig, NumberType } from "../Calcul.types";
import { biggestNumberFirst, getRandomDivisibleNumbersInRange, getRandomInt } from "../utils/number";
import { filterObject, getRandomItemOfArray } from "../utils/utils";

const generateNumber = (config: NumberConfig): number => {
  switch (config.type){
    case 'fix':
      return config.fix ?? 1;
    case 'range':
      return getRandomInt(config.min ?? 1, config.max ?? 10);
    case 'rangeTens':
      return Math.max(10,Math.round(getRandomInt(config.min ?? 1, config.max ?? 10)/10)*10);
  }

  return 1;
}

const mathFunctions = {
  'addition':       (first:number, second:number):number => first + second,
  'soustraction':   (first:number, second:number):number => first - second,
  'multiplication': (first:number, second:number):number => first + second,
  'division':       (first:number, second:number):number => first / second,
  'wholeDivision':  (first:number, second:number):number => first / second,
  'modulo':         (first:number, second:number):number => first / second,
};

const generateEquation = (config: ColumnConfig) => {

  const possibleGaps = Object
    .entries(config.answer)
    .filter(([_,value]) => value)
    .map(([key, _]) => key)
    ;

  let equation:EquationInterface = {
    1: generateNumber(config[1]),
    operation: config.type,
    2: generateNumber(config[2]),
    result: 0,
    gap: getRandomItemOfArray(possibleGaps) ?? 'result',
  };

  switch(config.type){
    case 'soustraction':
    case 'division':
      [equation[1], equation[2]] = biggestNumberFirst(equation[1], equation[2]);
    break;
  }

  equation['result'] = mathFunctions[config.type](equation[1], equation[2]);

  return equation;
};

const generateColumn = (config: ColumnConfig, equationCount: number) => {
  let column = (new Array(equationCount)).fill(null).map(() => {
    return generateEquation(config);
  });

  return column;
};

const generateExercice = (config: ExerciceConfig):Exercice => {
  let columns: Column[] = config.columns.map((columnConfig: ColumnConfig) => {
    return generateColumn(columnConfig, config.equationCount);
  });

  let exercice: Exercice = {
    questionTime: config.questionTime,
    answerTime: config.answerTime,
    columns: columns,
  }

  return exercice; 
}

const generatorReducer = (state: any, action:any) => {
  console.debug({state})
  console.debug({index: action.exerciceIndex})
  switch (action.type) {
    case 'generate exercice':{
      let newExercices = structuredClone(state.exercices);
      newExercices[action.exerciceIndex] = generateExercice(action.exerciceConfig);
      return {
        ...state,
        exercices: newExercices,
      };}
    case 'remove exercice':{
      let newExercices = structuredClone(state.exercices);
      newExercices.splice(action.exerciceIndex ,1);
      return {
        ...state,
        exercices: newExercices,
      }
    }
  }
  throw Error('Unknow action');
}

const useGenerator = (config: ExerciceConfig[]) => {
  const initialState = {config: config, exercices: []};
  const [state, dispatchExercices] = useReducer(generatorReducer, initialState)
  return [state.exercices, dispatchExercices];
}

export default useGenerator;