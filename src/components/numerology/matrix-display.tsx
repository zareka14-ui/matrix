'use client';

import { MatrixCell } from '@/types/numerology';

interface MatrixDisplayProps {
  matrix: MatrixCell[];
}

const digitDescriptions: Record<number, { title: string; short: string }> = {
  1: { title: 'Эго и характер', short: 'ЭГО' },
  2: { title: 'Энергия', short: 'Энергия' },
  3: { title: 'Креативность', short: 'Творчество' },
  4: { title: 'Здоровье', short: 'Здоровье' },
  5: { title: 'Баланс энергий', short: 'Баланс' },
  6: { title: 'Труд и управление', short: 'Труд' },
  7: { title: 'Удача', short: 'Удача' },
  8: { title: 'Служение и род', short: 'Род' },
  9: { title: 'Память', short: 'Память' }
};

export function MatrixDisplay({ matrix }: MatrixDisplayProps) {
  const rows = [
    matrix.filter(cell => [1, 4, 7].includes(cell.digit)),
    matrix.filter(cell => [2, 5, 8].includes(cell.digit)),
    matrix.filter(cell => [3, 6, 9].includes(cell.digit))
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-center">Матрица</h3>
      <div className="inline-block bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-lg">
        <div className="grid grid-cols-3 gap-3">
          {rows.map(row => row.map(cell => (
            <div key={cell.digit} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {cell.count > 0 ? cell.digit : '—'}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {digitDescriptions[cell.digit]?.title}
                </div>
              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
}
