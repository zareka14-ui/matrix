import ZAI from 'z-ai-web-dev-sdk';

interface NumerologyContext {
  birthDate: string;
  year: number;
  additionalNumbers: number[];
  matrix: Array<{ digit: number; count: number; valueKey: string }>;
  soulTask?: string;
  familyTask?: string;
}

interface AIInterpretationOptions {
  gender?: 'male' | 'female';
  focus?: 'general' | 'career' | 'relationships' | 'health' | 'spiritual';
  language?: 'ru' | 'en';
}

export class NumerologyAI {
  private zai: any;

  async initialize() {
    this.zai = await ZAI.create();
  }

  async generateInterpretation(context: NumerologyContext, options: AIInterpretationOptions = {}): Promise<string> {
    if (!this.zai) await this.initialize();
    
    const { gender = 'male', focus = 'general', language = 'ru' } = options;
    const systemPrompt = 'Ты - эксперт по нумерологии. Дай персонализированную интерпретацию.';
    const userPrompt = 'Проанализируй матрицу и дай интерпретацию.';

    try {
      const completion = await this.zai.chat.completions.create({
        messages: [
          { role: 'assistant', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        thinking: { type: 'disabled' }
      });
      return completion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error generating AI interpretation:', error);
      throw new Error('Failed to generate interpretation');
    }
  }
}

export const numerologyAI = new NumerologyAI();
