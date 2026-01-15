import { NextRequest, NextResponse } from 'next/server';
import { calculateMatrix } from '@/lib/numerology/calculator';
import { matrix, tasks } from '@/lib/numerology/data';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { birthDate } = body;

  if (!birthDate) {
    return NextResponse.json({ error: 'Birth date required' }, { status: 400 });
  }

  const result = calculateMatrix(birthDate);
  const matrixWithInterpretations = result.matrix.map(cell => ({
    ...cell,
    interpretation: matrix[cell.valueKey] || null
  }));

  return NextResponse.json({
    ...result,
    matrix: matrixWithInterpretations,
    soulTaskInterpretation: result.soulTask ? tasks[result.soulTask] : null,
    familyTaskInterpretation: result.familyTask ? tasks[result.familyTask] : null
  });
}
