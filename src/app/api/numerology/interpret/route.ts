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
        interpretation: 'AI интерпретация требует API ключа. Пожалуйста, настройте ZAI_API_KEY в Vercel Settings.',
        type,
        error: 'ZAI_API_KEY not configured'
      });
    }

    // Импортируем z-ai-web-dev-sdk динамически
    const ZAI = await import('z-ai-web-dev-sdk') as any;

    // Инициализируем SDK с API ключом
    const zai = ZAI.create({ apiKey: ZAI_API_KEY });

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
  } catch (error: any) {
    console.error('Error generating AI interpretation:', error);

    // Проверяем, есть ли сообщение об ошибке
    const errorMessage = error?.message || error?.toString() || 'Unknown error';

    return NextResponse.json(
      {
        error: 'Failed to generate interpretation',
        details: errorMessage,
        note: !ZAI_API_KEY ? 'Для AI интерпретации настройте ZAI_API_KEY в Vercel Settings' : undefined
      },
      { status: 500 }
    );
  }
}
