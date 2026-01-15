'use client';

import { MatrixCell } from '@/types/numerology';

interface MatrixDisplayProps {
  matrix: MatrixCell[];
  className?: string;
}

const digitDescriptions: Record<number, { title: string; short: string; description: string }> = {
  1: { 
    title: 'Эго и амбиции', 
    short: 'ЭГО',
    description: 'Это число говорит о лидерских качествах, самоуверенности, амбициях. Люди с этой цифрой часто проявляют себя как лидеры.'
  },
  2: { 
    title: 'Энергия и лень', 
    short: 'Энергия',
    description: 'Цифра энергии определяет уровень жизненных сил и склонность к лени. Большое количество двоек - это профицит энергии.'
  },
  3: { 
    title: 'Креативность и творчество', 
    short: 'Творчество',
    description: 'Цифра три отвечает за творческие способности, воображение, способность создавать новое.'
  },
  4: { 
    title: 'Здоровье и сексуальная энергия', 
    short: 'Здоровье',
    description: 'Четвёрка - это здоровье, сексуальная энергия, деторождение. Люди с большим количеством четвёрок имеют сильное здоровье.'
  },
  5: { 
    title: 'Баланс мужской и женской энергии', 
    short: 'Баланс',
    description: 'Пятёрка - это баланс между мужским и женским началом, способность быть гибким и адаптивным.'
  },
  6: { 
    title: 'Труд и управление', 
    short: 'Труд',
    description: 'Шестёрка - это труд, умение работать руками, способность управлять другими людьми.'
  },
  7: { 
    title: 'Удача и ангел-хранитель', 
    short: 'Удача',
    description: 'Семёрка - это удача, родовая энергия, ангел-хранитель. Люди с этой цифрой часто бывают везунчиками.'
  },
  8: { 
    title: 'Служение и род', 
    short: 'Род',
    description: 'Восьмёрка - это служение людям и роду, способность отдавать и помогать.'
  },
  9: { 
    title: 'Память и способности', 
    short: 'Память',
    description: 'Девятка - это память, интеллект, экстрасенсорные способности. Люди с этой цифрой часто обладают хорошей памятью.'
  }
};

export function MatrixDisplay({
  matrix,
  className = '',
}: MatrixDisplayProps) {
  // Группируем ячейки по строкам
  const rows = [
    matrix.filter((cell) => [1, 4, 7].includes(cell.digit)),
    matrix.filter((cell) => [2, 5, 8].includes(cell.digit)),
    matrix.filter((cell) => [3, 6, 9].includes(cell.digit)),
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Матрица */}
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold text-center">Матрица</h3>
        <div className="inline-block bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-6 rounded-xl shadow-lg">
          <div className="grid grid-cols-3 gap-3">
            {rows.map((row, rowIndex) =>
              row.map((cell) => (
                <div
                  key={cell.digit}
                  className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  title={digitDescriptions[cell.digit]?.description || ''}
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                      {cell.count > 0 ? cell.digit : '—'}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {cell.count > 0
                        ? Array(cell.count).fill(cell.digit).join(' ')
                        : '—'}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                      {digitDescriptions[cell.digit]?.title}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Краткое описание каждой цифры */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {matrix.map((cell) => (
          <div
            key={cell.digit}
            className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {cell.digit}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {cell.count} шт.
              </span>
            </div>
            <h4 className="font-semibold mb-1 text-lg">
              {digitDescriptions[cell.digit]?.title}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              {digitDescriptions[cell.digit]?.description}
            </p>
            <div className="mt-2">
              <span className="text-xs text-slate-400 dark:text-slate-500">
                Ключ матрицы: <span className="font-mono font-bold">{cell.valueKey}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
