import { NextRequest, NextResponse } from 'next/server';
import { numerologyAI } from '@/lib/ai/numerology-ai';
import { calculateMatrix } from '@/lib/numerology/calculator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { birthDate, type = 'full', digit, gender, focus, language = 'ru' } = body;

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

    // Подготавливаем контекст для AI
    const context = {
      birthDate,
      year: matrixData.year,
      additionalNumbers: matrixData.additionalNumbers,
      matrix: matrixData.matrix,
      soulTask: matrixData.soulTask,
      familyTask: matrixData.familyTask
    };

    let interpretation: string;

    switch (type) {
      case 'digit':
        // Интерпретация конкретной цифры
        if (!digit) {
          return NextResponse.json(
            { error: 'Digit is required for digit interpretation' },
            { status: 400 }
          );
        }
        interpretation = await numerologyAI.generateDigitInterpretation(
          digit,
          context.matrix.find((m: any) => m.digit === digit)?.count || 0,
          context,
          { gender, language }
        );
        break;

      case 'summary':
        // Краткое резюме
        interpretation = await numerologyAI.generateSummary(context, {
          gender,
          language
        });
        break;

      case 'full':
      default:
        // Полная интерпретация
        interpretation = await numerologyAI.generateInterpretation(context, {
          gender,
          focus: focus || 'general',
          language
        });
        break;
    }

    return NextResponse.json({
      interpretation,
      type,
      context,
    });
  } catch (error) {
    console.error('Error generating AI interpretation:', error);
    return NextResponse.json(
      { error: 'Failed to generate interpretation' },
      { status: 500 }
    );
  }
}
