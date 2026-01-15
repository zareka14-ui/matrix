use client;

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { MatrixDisplay } from '@/components/numerology/matrix-display';
import { InterpretationsDisplay } from '@/components/numerology/interpretations-display';
import { NumerologyMatrixResult, MatrixCell } from '@/types/numerology';

export default function NumerologyPage() {

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NumerologyMatrixResult | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const handleCalculate = async () => {
    if (!birthDate) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, введите дату рождения',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/numerology/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birthDate }),
      });
      if (!response.ok) {
        throw new Error('Failed to calculate matrix');
      }
      const data = await response.json();
      setResult(data);
      toast({
        title: 'Успешно',
        description: 'Матрица рассчитана',
      });
    } catch (error) {
      console.error('Error calculating matrix:', error);
      toast({
        description: 'Не удалось рассчитать матрицу',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAI = async (type: 'full' | 'summary' | 'digit', digit?: number) => {
    if (!result || !birthDate) {
      toast({
        title: 'Ошибка',
        description: 'Сначала рассчитайте матрицу',
        variant: 'destructive',
      });
      return;
    }
    setLoadingAI(true);
    try {
      const response = await fetch('/api/numerology/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          birthDate,
          type,
          digit,
      });
      if (!response.ok) {
        throw new Error('Failed to generate interpretation');
      }
      const data = await response.json();
      if (type === 'summary') {
        setAISummary(data.interpretation || '\');
      } else {
        setAIInterpretation(data.interpretation || '\');
      }
      toast({
        title: 'Успешно',
        description: 'AI интерпретация сгенерирована',
      });
    } catch (error) {
      console.error('Error generating AI interpretation:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось сгенерировать AI интерпретацию',
        variant: 'destructive',
      });
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Нумерологический Калькулятор
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Расчет психоматрицы и AI-анализ по дате рождения
          </p>
        </div>
        {/* Форма ввода */}
        <Card className="mb-8 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Введите дату рождения
            </CardTitle>
            <CardDescription>
              Выберите дату рождения для расчета психоматрицы
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label htmlFor="birthDate" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Дата рождения
                </label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate((e.target as HTMLInputElement).value)}
                  className="text-lg h-12"
                />
              </div>
              <Button
                onClick={handleCalculate}
                disabled={loading || !birthDate}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Расчет...
                    </>
                    <div
                      key={index}
                      className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 px-6 py-3 rounded-lg shadow-sm"
                    >
                      <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {num}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Separator />
            {/* Матрица */}
            <MatrixDisplay matrix={result.matrix} />
            <Separator />
            {/* Интерпретации */}
            <InterpretationsDisplay
              matrix={result.matrix}
              soulTask={result.soulTask}
              familyTask={result.familyTask}
              soulTaskInterpretation={result.soulTaskInterpretation}
              familyTaskInterpretation={result.familyTaskInterpretation}
              onGenerateAI={handleGenerateAI}
              isGeneratingAI={loadingAI}
              aiInterpretation={aiInterpretation}
              aiSummary={aiSummary}
              showAI={true}
            />
          </>
        )}
        {/* Footer */}
        <footer className="mt-16 text-center text-slate-500 dark:text-slate-400 py-6 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm">
            Нумерологический калькулятор с AI-анализом • Создано с помощью
            Next.js и z-ai-web-dev-sdk
          </p>
        </footer>
      </div>
    </div>
  );
}
