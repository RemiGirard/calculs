import { useReducer } from "react";

import { Column, EquationInterface, Exercice, ModuloResult } from "../routes/Exercice.type";
import { ColumnConfig, ExerciceConfig, NumberConfig } from "../routes/ExerciceConfig.types";
import { getRandomItemOfArray, shuffleArray } from "../utils/utils";
import {eachDigitAdditionIsInferiorToTen, eachDigitSoustractionIsPositive} from "../utils/number";

export const mathFunctions = {
  addition:       (first:number, second:number):number => first + second,
  additionWithoutCarry: (first:number, second:number):number => first + second,
  soustraction: (first:number, second:number):number => first - second,
  positiveSoustraction:   (first:number, second:number):number => first - second,
  positiveSoustractionWithoutCarry: (first:number, second:number):number => first - second,
  multiplication: (first:number, second:number):number => first + second,
  division:       (first:number, second:number):number => Number((first / second).toFixed(2)),
  intDivision:  (first:number, second:number):number => first / second,
  modulo:         (first:number, second:number):ModuloResult => {
    const quotient = Math.floor(first/second);
    const remainder = first % second;
    return {quotient, remainder};
  },
};

export const numberPossibilitesCount = (numberConfig: NumberConfig) => {
  switch(numberConfig.type){
    case 'fix':
      return 1;
    case 'range':
      return Math.abs((numberConfig.max ?? 0)-(numberConfig.min ?? 0))+1;
    case 'rangeTens':
      const min = Math.ceil((numberConfig.min ?? 0)/ 10);
      const max = Math.floor((numberConfig.max ?? 0) / 10);

      return Math.max(max - min + 1, 0);
  }
  return 1;
}

export const columnPossibilititiesEstimation = (columnConfig: ColumnConfig): number => {
  let possibilitiesCount:any = [columnConfig[1], columnConfig[2]].map(numberPossibilitesCount);

  possibilitiesCount = possibilitiesCount[0] * possibilitiesCount[1];

  switch(columnConfig.type){
    case 'positiveSoustraction':
    case 'division':
    case 'modulo':
      // the count is reduced on those cases because it's ordered
      // it's not all the time half of possibilities but
      // we take the worst scenario
      possibilitiesCount = Math.floor(possibilitiesCount/2);
      break;
    default:
  }

  return possibilitiesCount;
};

export const getPossibilitiesOfANumber = (numberConfig: NumberConfig): number[] => {
  let possibilities: number[] = [];
  switch(numberConfig.type){
    case 'fix':
      possibilities = [(numberConfig.fix ?? 0)];
      break;
    case 'range':
      for(let i=(numberConfig.min ?? 0);i<=(numberConfig.max ?? 1);i++){
        possibilities.push(i);
      }
      break;
    case 'rangeTens':
      const min = Math.ceil(Math.max(numberConfig.min ?? 10, 10)/10)*10;
      for(let i=min;i<=(numberConfig.max ?? 1);i+=10){
        possibilities.push(i);
      }
      break;
  }
  return possibilities;
}

export const combinePossibilities = (elementsPossibilities: number[][]) => {
  if(elementsPossibilities.length === 0){
    return [];
  }
  let [elementPossibilities, ...otherElements] = elementsPossibilities;
  let possibilities: number[][] = [];
  if(otherElements.length === 0){
    elementPossibilities.forEach((element: number) => {
      possibilities.push([element])
    });
  } else {
    elementPossibilities.forEach((currElement: number) => {
      const combinedPossibilities = combinePossibilities(otherElements)
      for(let i=0;i<combinedPossibilities.length;i++){
        possibilities.push([currElement, ...combinedPossibilities[i]]);
      }
    })
  }
  return possibilities;
}

export const getElementsPossibilitiesOfColumnConfig = (columnConfig: ColumnConfig) => {
  return [columnConfig[1], columnConfig[2]]
    .map((numberConfig: NumberConfig) => {
      return getPossibilitiesOfANumber(numberConfig);
    })
  ;
}

export const generatePossibleEquations = (columnConfig: ColumnConfig):EquationInterface[] => {
  const elementPossibilities = getElementsPossibilitiesOfColumnConfig(columnConfig);
  const possibilities = combinePossibilities(elementPossibilities);

  let equations: EquationInterface[] = [];
  const forbidNegativeResults = ['positiveSoustraction', 'positiveSoustractionWithoutCarry','division','intDivision','modulo'].includes(columnConfig.type);
  const forbidNonIntResults = ['intDivision'].includes(columnConfig.type);
  const forbidQuotientZeroResults = ['modulo'].includes(columnConfig.type);
  const forbidAdditionCarry = ['additionWithoutCarry'].includes(columnConfig.type);
  const forbidSoustractionCarry = ['soustractionWithoutCarry', 'positiveSoustractionWithoutCarry'].includes(columnConfig.type);
  
  possibilities.forEach((possibility) => {
    const possibleGaps = Object
      .entries(columnConfig.answer)
      .filter(([_,value]) => value)
      .map(([key, _]) => key)
    ;

    const equation:EquationInterface = {
      1: possibility[0],
      operation: columnConfig.type,
      2: possibility[1],
      result: mathFunctions[columnConfig.type](possibility[0], possibility[1]),
      gap: getRandomItemOfArray(possibleGaps) ?? 'result',
    }

    if(
      (!forbidNegativeResults || (typeof equation.result !== 'number' || equation.result >=0) )
      && (!forbidNonIntResults ||(typeof equation.result !== 'number' || Number.isInteger(equation.result)))
      && (!forbidQuotientZeroResults || (typeof equation.result === 'number' || equation.result.quotient !== 0))
      && (!forbidAdditionCarry || (typeof equation.result !== 'number' || eachDigitAdditionIsInferiorToTen(equation[1], equation[2])))
      && (!forbidSoustractionCarry || (typeof equation.result !== 'number' || eachDigitSoustractionIsPositive(equation[1], equation[2])))
    ){
      equations.push(equation);
    }
  });

  return equations;
}

const generateColumn = (config: ColumnConfig, equationCount: number) => {
  const possibleEquations = shuffleArray(generatePossibleEquations(config));
  let column = [];
  for(let i=0;i<equationCount;i++){
    const equation = possibleEquations[i];
    if(equation !== undefined){
      column.push(equation);
    }
  }

  return column;
};

const generateExercice = (config: ExerciceConfig):Exercice => {
  let columns: Column[] = config.columns.map((columnConfig: ColumnConfig) => {
    return generateColumn(columnConfig, config.equationCount);
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

const useGenerator = (config: ExerciceConfig[]): [any, any] => {
  const initialState = {config: config, exercices: []};
  const [state, dispatchExercices] = useReducer(generatorReducer, initialState);
  return [state.exercices, dispatchExercices];
}

export default useGenerator;
