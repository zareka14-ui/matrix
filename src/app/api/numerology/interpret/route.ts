import { NextRequest, NextResponse } from 'next/server';
import { calculateMatrix } from '@/lib/numerology/calculator';

// Переменная окружения для API ключа
const ZAI_API_KEY = process.env.ZAI_API_KEY || '';

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

    // Проверяем, есть ли API ключ
    if (!ZAI_API_KEY) {
      return NextResponse.json({
        ...matrixData,
        matrix: matrixData.matrix.map(cell => ({
          ...cell,
          interpretation: 'AI интерпретация требует API ключа'
        })),
        note: 'Для AI интерпретации настройте ZAI_API_KEY в Vercel Settings'
      });
    }

    // Импортируем z-ai-web-dev-sdk динамически
    const ZAI = require('z-ai-web-dev-sdk');

    // Инициализируем SDK
    const zai = await ZAI.create();
    const systemPrompt = 'Ты - эксперт по нумерологии. Дай подробную интерпретацию.';
    const userPrompt = `Проанализируй нумерологическую матрицу:
Дата рождения: ${birthDate}
Год: ${matrixData.year}
Дополнительные числа: ${matrixData.additionalNumbers.join(', ')}
Задача души: ${matrixData.soulTask}
Родовая задача: ${matrixData.familyTask}

Матрица цифр:
 ${matrixData.matrix.map(cell => `Цифра ${cell.digit}: ${cell.count} шт. (${cell.valueKey})`).join('\n')}

 ${type === 'full' ? 'Дай полную интерпретацию всей матрицы.' : 
type === 'digit' ? `Проанализируй цифру ${digit} в контексте матрицы.` : 
'Дай краткий обзор (summary) ключевых особенностей.'}`;

    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      thinking: { type: 'disabled' }
    });

    const interpretation = completion.choices[0]?.message?.content || '';

    return NextResponse.json({
      interpretation,
      type,
      context: {
        birthDate,
        year: matrixData.year,
        additionalNumbers: matrixData.additionalNumbers,
        matrix: matrixData.matrix,
        soulTask: matrixData.soulTask,
        familyTask: matrixData.familyTask
      }
    });
  } catch (error) {
    console.error('Error generating AI interpretation:', error);
    return NextResponse.json(
      { error: 'Failed to generate interpretation' },
      { status: 500 }
    );
  }
}
