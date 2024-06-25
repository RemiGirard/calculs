import Column from "@/Domain/Column.ts";

export default class Exercise {
    questionTime: number;
    answerTime: number;
    columnList: Column[];

    constructor({questionTime, answerTime, columnList}:{
        questionTime: Exercise['questionTime'],
        answerTime: Exercise['answerTime'],
        columnList: Exercise['columnList'],
    }) {
        this.questionTime = questionTime;
        this.answerTime = answerTime;
        this.columnList = columnList;
    }

    getCopy(): Exercise {
        return new Exercise({
            questionTime: this.questionTime,
            answerTime: this.answerTime,
            columnList: this.columnList.map(column => column.getCopy()),
        });
    }
}