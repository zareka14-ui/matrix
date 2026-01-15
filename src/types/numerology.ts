export interface NumerologyMatrixResult {
  birthDate: string;
  year: number;
  additionalNumbers: number[];
  fullArray: number[];
  matrix: MatrixCell[];
  soulTask?: string;
  familyTask?: string;
  soulTaskInterpretation?: string;
  familyTaskInterpretation?: string;
}

export interface MatrixCell {
  digit: number;
  count: number;
  position: {
    row: number;
    col: number;
  };
  valueKey: string;
  interpretation?: string;
}

export interface MatrixInterpretation {
  digit: number;
  title: string;
  generalDescription: string;
  interpretations: Record<string, string>;
}
