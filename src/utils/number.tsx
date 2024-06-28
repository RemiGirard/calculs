export const getRandomInt = (min:number, max:number): number => {
  if(max < min) throw new Error;
  return Math.round(Math.random() * (max - min))+ min;
}

export const biggestNumberFirst = (first:number, second:number) => {
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
    tries <= 0
    || randomDivisor === 0
    || randomNumber % randomDivisor !== 0
    || (
        randomDivisor === 1
        && (Math.random()> acceptDivisorEqualOneProbality)
    )) {
      tries--;
      randomDivisor = Math.floor(Math.random() * (randomNumber - 1)) + 1;
  }
  if(tries <= 0) console.error('tries reached 0');

  // Return both the non-prime number and its random divisor in an array
  return [randomNumber, randomDivisor];
}

export const integerToLetter = (integer:number) => {
  if (integer < 1 || integer > 26) {
    return ' ';
  }
  
  // Convert the integer to a character code by adding 64
  const charCode = integer + 96;
  
  // Convert the character code to a letter
  return String.fromCharCode(charCode);
}

export const eachDigitAdditionIsInferiorToTen = (numbers: number[]): boolean => {
  const numberMaxLength = Math.max(...numbers).toString().length;
  const [number1String, ...otherNumbersString] = numbers.map((number) => number.toString().padStart(numberMaxLength, '0'));
  return number1String.split('').every((digit, index) => {
    return parseInt(digit) + otherNumbersString.map(otherNumberString => parseInt(otherNumberString[index])).reduce((a,b)=>a+b) < 10;
  });
};

export const eachDigitSubtractionIsPositive = (number1: number, number2: number): boolean => {
  const numberMaxLength = Math.max(number1, number2).toString().length;
  const [number1String, number2String] = [number1, number2].map((number) => number.toString().padStart(numberMaxLength, '0'));
  return number1String.split('').every((digit, index) => {
    return parseInt(digit) - parseInt(number2String[index]) >= 0;
  });
};