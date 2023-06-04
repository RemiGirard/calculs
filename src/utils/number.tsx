export const getRandomInt = (min:number, max:number): number => {
  return Math.round(Math.random() * (max - min))+ min;
}

export const biggestNumberFirst = (first:any, second:any) => {
    if(first < second){
        [first, second] = [second, first]
    }
    return [first, second];
}

export const getRandomDivisibleNumbersInRange = ({min = 0, max = 10}): [number, number] => {
    const acceptDivisorEqualOneProbality = 0.2
    if(
      !(acceptDivisorEqualOneProbality > 0.0001)
      || !(acceptDivisorEqualOneProbality <= 1)
      ){
        throw new Error("acceptDivisorEqualOneProbality must be strictly superior to 0.0001 and inferior or equal to 1");
    }

    let randomNumber = 0;
    let isPrime = true;

    let tries = 1000;

    // If the random number is prime, generate a new random number
    // and check again until a non-prime number is found
    while (isPrime && tries > 0) {
      tries--;
      randomNumber = getRandomInt(min, max);
      for (let i = 2; i < randomNumber; i++) {
        if (randomNumber % i === 0) {
            isPrime = false;
            break;
        }
      }
    }

    // Generate a random divisor of the non-prime number
    let randomDivisor = 0;
    while (
      randomDivisor === 0
      || randomNumber % randomDivisor !== 0
      || (
          randomDivisor === 1
          && (Math.random()> acceptDivisorEqualOneProbality)
      )) {
        randomDivisor = Math.floor(Math.random() * (randomNumber - 1)) + 1;
    }

    // Return both the non-prime number and its random divisor in an array
    return [randomNumber, randomDivisor];
  }

  export const integerToLetter = (integer:number) => {
    if (integer < 1 || integer > 26) {
      return ' ';
    }
    
    // Convert the integer to a character code by adding 64
    var charCode = integer + 96;
    
    // Convert the character code to a letter
    var letter = String.fromCharCode(charCode);
    
    return letter;
  }