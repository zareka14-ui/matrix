import { NumerologyMatrixResult, MatrixCell } from '@/types/numerology';

const stringSum = (number: number): number => {
  return number.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
};

const splitInt = (value: string | number): number[] => {
  return value.toString().replace(/\./g, '').split('').map(x => parseInt(x));
};

const getMatrixValueKey = (count: number, digit: number): string => {
  if (count > 5) return Array(count - 5).fill(digit).join('');
  if (count === 0) return `${digit}0`;
  return Array(count).fill(digit).join('');
};

export const calculateMatrix = (birthDate: string): NumerologyMatrixResult => {
  const date = new Date(birthDate);
  const year = date.getFullYear();

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const formattedDate = `${day}.${month}.${year}`;

  const dateNumbers = splitInt(formattedDate);
  const first = dateNumbers.reduce((acc, curr) => acc + curr, 0);
  const second = stringSum(first);
  const third = year >= 2000 ? first + 19 : first - ((dateNumbers[0] !== 0 ? dateNumbers[0] : dateNumbers[1]) * 2);
  const fourth = stringSum(third);

  let additionalNumbers: number[];
  let fullArray: number[];

  if (year >= 2000) {
    additionalNumbers = [first, second, 19, third, fourth];
    fullArray = [...dateNumbers, ...splitInt(first), ...splitInt(second), ...splitInt(19), ...splitInt(third), ...splitInt(fourth)];
  } else {
    additionalNumbers = [first, second, third, fourth];
    fullArray = [...dateNumbers, ...splitInt(first), ...splitInt(second), ...splitInt(third), ...splitInt(fourth)];
  }

  const matrix: MatrixCell[] = [];
  const positions = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const digit = positions[row][col];
      const count = fullArray.filter(x => x === digit).length;
      const valueKey = getMatrixValueKey(count, digit);
      matrix.push({ digit, count, position: { row, col }, valueKey });
    }
  }

  return {
    birthDate,
    year,
    additionalNumbers,
    fullArray,
    matrix,
    soulTask: second.toString(),
    familyTask: fourth.toString(),
  };
};
