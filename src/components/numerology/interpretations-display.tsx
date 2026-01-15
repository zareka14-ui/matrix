'use client';

import { MatrixCell } from '@/types/numerology';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Loader2, Sparkles, Lightbulb, FileText, Star } from 'lucide-react';

interface InterpretationsDisplayProps {
  matrix: MatrixCell[];
  soulTask?: string;
  familyTask?: string;
  soulTaskInterpretation?: string;
  familyTaskInterpretation?: string;
  onGenerateAI?: (type: 'full' | 'summary' | 'digit', digit?: number) => Promise<void>;
  isGeneratingAI?: boolean;
  aiInterpretation?: string;
  aiSummary?: string;
}

const digitTitles: Record<number, string> = {
  1: 'Эго и амбиции',
  2: 'Энергия и лень',
  3: 'Креативность и творчество',
  4: 'Здоровье и сексуальная энергия',
  5: 'Баланс мужской и женской энергии',
  6: 'Труд и управление',
  7: 'Удача и ангел-хранитель',
  8: 'Служение и род',
  9: 'Память и способности'
};

export function InterpretationsDisplay({
  matrix,
  soulTask,
  familyTask,
  soulTaskInterpretation,
  familyTaskInterpretation,
  onGenerateAI,
  isGeneratingAI = false,
  aiInterpretation,
  aiSummary,
}: InterpretationsDisplayProps) {
  const [selectedDigit, setSelectedDigit] = useState<number | null>(null);

  const handleGenerateDigitAI = async (digit: number) => {
    setSelectedDigit(digit);
    if (onGenerateAI) {
      await onGenerateAI('digit', digit);
    }
  };

  const parseAndFormatText = (text: string) => {
    // Форматируем текст с сохранением структуры
    return text.split('\n').map((line, index) => {
      // Заголовки (начинаются с # или заглавная буква и двоеточие)
      if (line.match(/^#+\s/) || line.match(/^[А-ЯЁA-Z]/)) {
        return <h3 key={index} className="text-lg font-bold mt-4 mb-2 text-slate-800 dark:text-slate-200">{line.replace(/^#+\s*/, '')}</h3>;
      }
      // Списки (начинаются с -, *, •)
      if (line.match(/^[-*•]\s/)) {
        return <li key={index} className="ml-4 mb-1 text-slate-700 dark:text-slate-300">{line.replace(/^[-*•]\s*/, '')}</li>;
      }
      // Нумерованные списки
      if (line.match(/^\d+\./)) {
        return <li key={index} className="ml-4 mb-1 text-slate-700 dark:text-slate-300">{line}</li>;
      }
      // Обычный текст
      if (line.trim()) {
        return <p key={index} className="mb-2 text-slate-700 dark:text-slate-300 leading-relaxed">{line}</p>;
      }
      return <br key={index} />;
    });
  };

  return (
    <div className="space-y-6">
      {/* Задачи */}
      {(soulTask || familyTask) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {soulTask && (
            <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/50 dark:to-pink-950/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-500" />
                  Личная задача Души
                </CardTitle>
                <CardDescription>Число жизненного пути: {soulTask}</CardDescription>
              </CardHeader>
              <CardContent>
                {soulTaskInterpretation ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {parseAndFormatText(soulTaskInterpretation)}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Нет интерпретации
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {familyTask && (
            <Card className="border-pink-200 dark:border-pink-800 bg-gradient-to-br from-pink-50/50 to-purple-50/50 dark:from-pink-950/50 dark:to-purple-950/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-pink-500" />
                  Родовая задача (ЧРП)
                </CardTitle>
                <CardDescription>Число родового пути: {familyTask}</CardDescription>
              </CardHeader>
              <CardContent>
                {familyTaskInterpretation ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {parseAndFormatText(familyTaskInterpretation)}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Нет интерпретации
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* AI Анализ */}
      {onGenerateAI && (
        <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/50 dark:to-purple-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              AI Анализ
            </CardTitle>
            <CardDescription>
              Получите персонализированные интерпретации от искусственного интеллекта
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Кнопки генерации */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                onClick={() => handleGenerateAI('summary')}
                disabled={isGeneratingAI}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
              >
                {isGeneratingAI ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Генерация...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-5 w-5" />
                    Краткий обзор (Summary)
                  </>
                )}
              </Button>

              <Button
                onClick={() => handleGenerateAI('full')}
                disabled={isGeneratingAI}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                size="lg"
              >
                {isGeneratingAI ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Генерация...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-5 w-5" />
                    Полный анализ
                  </>
                )}
              </Button>

              <Button
                onClick={() => {
                  // Сгенерировать для каждой цифры по очереди
                  matrix.forEach(cell => {
                    handleGenerateAI('digit', cell.digit);
                  });
                }}
                disabled={isGeneratingAI}
                className="w-full bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700"
                size="lg"
              >
                {isGeneratingAI ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Генерация...
                  </>
                ) : (
                  <>
                    <Star className="mr-2 h-5 w-5" />
                    По каждой цифре
                  </>
                )}
              </Button>
            </div>

            {/* Результаты */}
            {aiSummary && (
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-blue-500" />
                  Краткий обзор
                </h3>
                <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {parseAndFormatText(aiSummary)}
                  </div>
                </div>
              </div>
            )}

            {aiInterpretation && !aiSummary && (
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-purple-500" />
                  Полный анализ
                </h3>
                <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-800">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {parseAndFormatText(aiInterpretation)}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Интерпретации по цифрам */}
      <Tabs defaultValue="interpretations" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="interpretations">
            Базовые интерпретации
          </TabsTrigger>
          <TabsTrigger value="ai-digits">
            AI анализ по цифрам
          </TabsTrigger>
        </TabsList>

        <TabsContent value="interpretations" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            {matrix.map((cell) => (
              <Card key={cell.digit} className="border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-lg font-bold">
                          {cell.digit}
                        </Badge>
                        {digitTitles[cell.digit]}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Количество: {cell.count} шт. | Ключ матрицы: {cell.valueKey}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                {cell.interpretation && (
                  <CardContent>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {parseAndFormatText(cell.interpretation)}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-digits" className="space-y-4 mt-4">
          <div className="mb-4">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Выберите цифру для детального AI-анализа:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {matrix.map((cell) => (
              <Button
                key={cell.digit}
                variant={selectedDigit === cell.digit ? 'default' : 'outline'}
                onClick={() => handleGenerateDigitAI(cell.digit)}
                disabled={isGeneratingAI}
                className={`h-full flex flex-col items-center justify-center gap-2 py-6 ${
                  selectedDigit === cell.digit
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600'
                    : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {isGeneratingAI && selectedDigit === cell.digit ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <span className="text-3xl font-bold">{cell.digit}</span>
                    <span className="text-xs text-center mt-1">
                      {digitTitles[cell.digit]?.split(' ')[0]}
                    </span>
                  </>
                )}
              </Button>
            ))}
          </div>

          {selectedDigit && aiInterpretation && (
            <Card className="mt-4 border-purple-300 dark:border-purple-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  AI интерпретация цифры {selectedDigit}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {parseAndFormatText(aiInterpretation)}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
