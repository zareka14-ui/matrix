import { NextRequest, NextResponse } from 'next/server';
import { calculateMatrix } from '@/lib/numerology/calculator';
import { matrix, tasks } from '@/lib/numerology/data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { birthDate, type = 'full' } = body;

    if (!birthDate) {
      return NextResponse.json(
        { error: 'Birth date is required' },
        { status: 400 }
      );
    }

    // Валидация даты
    const date = new Date(birthDate);
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { error: 'Invalid birth date format' },
        { status: 400 }
      );
    }

    // Рассчитываем матрицу
    const matrixData = calculateMatrix(birthDate);

    // Подготавливаем интерпретации (без AI для теста)
    const matrixWithInterpretations = matrixData.matrix.map(cell => ({
      ...cell,
      interpretation: matrix[cell.valueKey] || 'Описание в разработке'
    }));

    return NextResponse.json({
      ...matrixData,
      matrix: matrixWithInterpretations,
      soulTaskInterpretation: matrixData.soulTask ? tasks[matrixData.soulTask] || 'Описание в разработке' : null,
      familyTaskInterpretation: matrixData.familyTask ? tasks[matrixData.familyTask] || 'Описание в разработке' : null,
      note: 'AI временно отключен для теста'
    });
  } catch (error) {
    console.error('Error in numerology API:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
