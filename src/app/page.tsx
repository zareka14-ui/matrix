'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MatrixDisplay } from '@/components/numerology/matrix-display';
import { InterpretationsDisplay } from '@/components/numerology/interpretations-display';
import { Loader2, Calendar } from 'lucide-react';

export default function NumerologyPage() {
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Нумерологический Калькулятор
        </h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Введите дату рождения
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="mb-2 block text-sm font-medium">Дата рождения</label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={e => setBirthDate(e.target.value)}
                  className="text-lg h-12 w-full border border-gray-300 rounded-md px-3"
                />
              </div>
              <Button
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setResult({ additionalNumbers: [1, 2, 19, 3, 4] });
                    setLoading(false);
                  }, 1000);
                }}
                disabled={loading || !birthDate}
                className="h-12 px-8 bg-gradient-to-r from-purple-600 to-pink-600"
              >
                {loading ? 'Расчет...' : 'Рассчитать матрицу'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <>
            <MatrixDisplay matrix={[
              { digit: 1, count: 2, position: { row: 0, col: 0 }, valueKey: '11' },
              { digit: 2, count: 3, position: { row: 1, col: 0 }, valueKey: '222' },
              { digit: 3, count: 1, position: { row: 2, col: 0 }, valueKey: '3' },
              { digit: 4, count: 1, position: { row: 0, col: 1 }, valueKey: '4' },
              { digit: 5, count: 2, position: { row: 1, col: 1 }, valueKey: '55' },
              { digit: 6, count: 0, position: { row: 2, col: 1 }, valueKey: '60' },
              { digit: 7, count: 4, position: { row: 0, col: 2 }, valueKey: '7777' },
              { digit: 8, count: 1, position: { row: 1, col: 2 }, valueKey: '8' },
              { digit: 9, count: 1, position: { row: 2, col: 2 }, valueKey: '9' }
            ]} />
          </>
        )}
      </div>
    </div>
  );
}
