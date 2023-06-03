import { useReducer } from "react";

import { Column, EquationInterface, Exercice } from "../routes/Exercice.type";
import { ColumnConfig, ExerciceConfig, NumberConfig } from "../routes/GenerateExercice.types";
import { biggestNumberFirst, getRandomInt } from "../utils/number";
import { getRandomItemOfArray, times } from "../utils/utils";
import { forEach } from "lodash";

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

  equation.result = mathFunctions[config.type](equation[1], equation[2]);

  return equation;
};

const evaluateNumberOfPossibilitities = (columnConfig: ColumnConfig): number => {
  let possibilitiesCount:any = [columnConfig[1], columnConfig[2]].map((numberConfig: NumberConfig) => {
    switch(numberConfig.type){
      case 'fix':
        return 1;
      case 'range':
        return (numberConfig.max ?? 0)-(numberConfig.min ?? 0);
      case 'rangeTens':
        return Math.floor((numberConfig.max ?? 0)-(numberConfig.min ?? 0)/10);
    }
    return 1;
  });

  possibilitiesCount = possibilitiesCount[0] * possibilitiesCount[1];

  switch(columnConfig.type){
    case 'soustraction':
    case 'division':
    case 'modulo':
      possibilitiesCount = possibilitiesCount/2;
      break;
    default:
  }

  return possibilitiesCount;
};

const getPossibilitiesOfANumber = (numberConfig: NumberConfig): number[] => {
  let possibilities: number[] = [];
  switch(numberConfig.type){
    case 'fix':
      possibilities = [numberConfig.fix ?? 0];
    case 'range':
      for(let i=(numberConfig.min ?? 0);i<=(numberConfig.max ?? 1);i++){
        possibilities.push(i);
      }
    case 'rangeTens':
      const min = Math.ceil(Math.max(numberConfig.min ?? 10, 10)/10)*10;
      for(let i=min;i<=(numberConfig.max ?? 1);i+=10){
        possibilities.push(i);
      }
  }
  return possibilities;
}

const combinePossibilities = (elementsPossibilities: number[][]) => {
  const otherElements = elementsPossibilities.splice(1);
  let possibilities: number[][] = [];
  if(otherElements.length === 0){
    return [elementsPossibilities[0]];
  } else {
    elementsPossibilities[0].forEach((currElement: number) => {
      combinePossibilities(otherElements).forEach((element: number[]) => {
        possibilities.push([currElement, ...element]);
      })
    })
  }
  return possibilities;
}

const getAllPossibilities = (columnConfig: ColumnConfig) => {
  let possibilities: any = [];

  switch(columnConfig.type){
    case 'addition':
    case 'multiplication':
      const elementsPossibilities = [columnConfig[1], columnConfig[2]]
        .map((numberConfig: NumberConfig) => {
          return getPossibilitiesOfANumber(numberConfig);
        });
      
      break;
    default:
  }

  return possibilities;
}

const generateColumn = (config: ColumnConfig, equationCount: number, usedRef: any) => {
  let generationMode = 'reroll';
  if((evaluateNumberOfPossibilitities(config)-usedRef[config.type].length) > equationCount*3){
    generationMode = 'reroll';
  } else {

  }

  let column = (new Array(equationCount)).fill(null).map(() => {
    // random not in this list
    // or
    // a random from this list
    return generateEquation(config);
  });

  return column;
};

const generateExercice = (config: ExerciceConfig):Exercice => {
  let usedRef: any = {
    '+': [],
    '-': [],
    '*': [],
    '/': [],
  };
  let columns: Column[] = config.columns.map((columnConfig: ColumnConfig) => {
    return generateColumn(columnConfig, config.equationCount, usedRef);
  });

  return {
    questionTime: config.questionTime,
    answerTime: config.answerTime,
    columns: columns,
  };
}

const generatorReducer = (state: any, action:any) => {
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
  const [state, dispatchExercices] = useReducer(generatorReducer, initialState);
  return [state.exercices, dispatchExercices];
}

export default useGenerator;