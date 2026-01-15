import { NextRequest, NextResponse } from 'next/server';
import { numerologyAI } from '@/lib/ai/numerology-ai';
import { calculateMatrix } from '@/lib/numerology/calculator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { birthDate, type = 'full' } = body;

    const matrixData = calculateMatrix(birthDate);
    const context = {
      birthDate,
      year: matrixData.year,
      additionalNumbers: matrixData.additionalNumbers,
      matrix: matrixData.matrix,
      soulTask: matrixData.soulTask,
      familyTask: matrixData.familyTask
    };

    const interpretation = await numerologyAI.generateInterpretation(context, { language: 'ru' });

    return NextResponse.json({ interpretation, type, context });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
