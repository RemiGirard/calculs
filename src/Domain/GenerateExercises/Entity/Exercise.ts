import Column from '@/Domain/GenerateExercises/Entity/Column.ts';

export default class Exercise {
  questionTime: number;

  answerTime: number;

  equationNumberPerColumn: number;

  columnList: Column[];

  constructor({
    questionTime, answerTime, equationNumberPerColumn, columnList,
  }:{
        questionTime: Exercise['questionTime'],
        answerTime: Exercise['answerTime'],
        equationNumberPerColumn: Exercise['equationNumberPerColumn'],
        columnList: Exercise['columnList'],
    }) {
    this.questionTime = questionTime;
    this.answerTime = answerTime;
    this.equationNumberPerColumn = equationNumberPerColumn;
    this.columnList = columnList;
  }

  getCopy(): Exercise {
    return new Exercise({
      questionTime: this.questionTime,
      answerTime: this.answerTime,
      equationNumberPerColumn: this.equationNumberPerColumn,
      columnList: this.columnList.map((column) => column.getCopy()),
    });
  }
}
