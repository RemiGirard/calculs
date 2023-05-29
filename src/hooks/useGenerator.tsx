import { useReducer, useState } from "react";
import { Columns, Exercice } from "./exercice.type";
import { ColumnConfig, ExerciceConfig } from "../Calcul.types";

const generateEquation = (config: ColumnConfig) => {
  let equation = {

  };

  return equation;
};

const generateColumn = (config: ColumnConfig, equationCount: number) => {
  let column = (new Array(equationCount)).fill().map(() => {
    return generateEquation(config);
  });

  return column;
};

const generateExercice = (config: ExerciceConfig):Exercice => {
  let columns: Columns[] = config.columns.map((columnConfig: ColumnConfig) => {
    return generateColumn(columnConfig, config.equationCount);
  });

  let exercice: Exercice = {
    questionTime: config.questionTime,
    answerTime: config.answerTime,
    columns: columns,
  }

  return exercice; 
}

const generatorReducer = (exercices: any, action:any) => {
  switch (action.type) {
    case 'generate exercice':
      let newExercices = structuredClone(exercices);
      newExercices[action.payload.exerciceIndex];
      return newExercices;
  }
  throw Error('Unknow action');
}

const useGenerator = (config: any) => {
  // const [exercices, setExercices] = useState<ExerciceInterface[]>([]);

  const [exercices, dispatchExercices] = useReducer(generatorReducer, [])


  return [exercices, dispatchExercices];
}

export default useGenerator;