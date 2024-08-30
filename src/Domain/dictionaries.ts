export default {
  french: {
    title: 'S.M.U.C',
    calcTypes: {
      addition: 'addition',
      additionWithoutCarry: 'addition sans retenue',
      subtraction: 'soustraction',
      positiveSubtraction: 'soustraction positive',
      positiveSubtractionWithoutCarry: 'soustraction positive sans retenue',
      multiplication: 'multiplication',
      division: 'division',
      intDivision: 'division entière',
      modulo: 'modulo',
    },
    inputLabel: {
      exerciseDuration: 'durée exercice',
      answerDuration: 'durée réponse',
      equationCountPerColumn: 'nombre d\'équations',
      type: 'type',
      first: '1er',
      second: '2ème',
      gap: 'trou',
    },
    inputGapLabel: {
      first: '1er',
      second: '2ème',
      result: 'résultat',
    },
    inputNumberType: {
      fix: 'fixe',
      range: 'plage',
      rangeTens: 'dizaines',
    },
    calcTypeSymbol: {
      addition: '+',
      additionWithoutCarry: '+',
      subtraction: '-',
      positiveSubtraction: '-',
      positiveSubtractionWithoutCarry: '-',
      multiplication: '×',
      division: '÷',
      intDivision: '÷',
      modulo: '÷',
    },
    finishTitle: 'On monte !',
    finishText: (steps: [number, number, number, number, number], scores: [number, number, number]) => {
      return [
        `de ${steps[0]} à ${steps[1]} réponses justes : tu montes de ${scores[0]}`,
        `de ${steps[2]} à ${steps[3]} réponses justes : tu montes de ${scores[1]}`,
        `plus de ${steps[4]} réponses justes : tu montes de ${scores[2]}`,
      ];
    },
    configTitle: 'Configuration',
    configPage: {
      exitButton: 'sortir'
    },
    moduloResult: {
      quotient: 'quotient',
      remainder: 'reste',
    },
  },
};
