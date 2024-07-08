import Column from '@/Domain/GenerateExercises/Entity/Column.ts';

export default class Exercise {
  questionTime: number;

  answerTime: number;

  equationCountPerColumn: number;

  columnList: Column[];

  uuid: string;

  constructor({
    questionTime, answerTime, equationNumberPerColumn, columnList,
  }:{
        questionTime: Exercise['questionTime'],
        answerTime: Exercise['answerTime'],
        equationNumberPerColumn: Exercise['equationCountPerColumn'],
        columnList: Exercise['columnList'],
    }) {
    this.questionTime = questionTime;
    this.answerTime = answerTime;
    this.equationCountPerColumn = equationNumberPerColumn;
    this.columnList = columnList;
    this.uuid = crypto.randomUUID();
  }

  getCopy(): Exercise {
    return new Exercise({
      questionTime: this.questionTime,
      answerTime: this.answerTime,
      equationNumberPerColumn: this.equationCountPerColumn,
      columnList: this.columnList.map((column) => column.getCopy()),
    });
  }
}
