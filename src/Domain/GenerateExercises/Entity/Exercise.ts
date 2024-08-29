import Column from '@/Domain/GenerateExercises/Entity/Column.ts';
import getNumberOrMinOrMax from "@/utils/number/getNumberOrMinOrMax.ts";

const minTime = 0;
const maxTime = 10000;
const minEquationCountPerColumn = 0;
const maxEquationCountPerColumn = 100;

export default class Exercise {
  private _questionTime!: number; // seconds
  private _answerTime!: number; // seconds
  private _equationCountPerColumn!: number;
  columnList: Column[];
  uuid: string;

  set questionTime(newValue: Exercise['_questionTime']) {
    this._questionTime = getNumberOrMinOrMax(newValue, minTime, maxTime);
  }

  get questionTime(): Exercise['_questionTime'] {
    return this._questionTime;
  }

  set answerTime(newValue: Exercise['_answerTime']) {
    this._answerTime = getNumberOrMinOrMax(newValue, minTime, maxTime);
  }

  get answerTime(): Exercise['_answerTime'] {
    return this._answerTime;
  }

  set equationCountPerColumn(newValue: Exercise['_equationCountPerColumn']) {
    this._equationCountPerColumn = getNumberOrMinOrMax(newValue, minEquationCountPerColumn, maxEquationCountPerColumn);
  }

  get equationCountPerColumn(): Exercise['_equationCountPerColumn'] {
    return this._equationCountPerColumn;
  }

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

  getCopyWithoutEquationList(): Exercise {
    return new Exercise({
      questionTime: this.questionTime,
      answerTime: this.answerTime,
      equationNumberPerColumn: this.equationCountPerColumn,
      columnList: this.columnList.map((column) => new Column({ config: column.config.getCopy() })),
    });
  }

  getEquationMaxLength(): number {
    return this.columnList.reduce((acc, column) => {
      if (column.equationList === null) return acc;
      return Math.max(acc, ...column.equationList.map((equation) => equation.getCharacterLength()));
    }, 1);
  }

  getColumnLength(): number {
    return this.equationCountPerColumn;
  }

  getRowLength(): number {
    return this.getEquationMaxLength()*this.columnList.length;
  }

  getLength(displayLetterId: boolean): {row: number, column: number} {
    return {row: this.getRowLength()+(displayLetterId ? 1 : 0), column: this.getColumnLength()};
  }
}
