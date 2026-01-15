'use client';

import { MatrixCell } from '@/types/numerology';

interface InterpretationsDisplayProps {
  matrix: MatrixCell[];
  soulTask?: string;
  familyTask?: string;
}

const digitTitles: Record<number, string> = {
  1: 'Эго и амбиции',
  2: 'Энергия и лень',
  3: 'Креативность и творчество',
  4: 'Здоровье',
  5: 'Баланс энергий',
  6: 'Труд и манипуляция',
  7: 'Удача',
  8: 'Служение',
  9: 'Память'
};

export function InterpretationsDisplay({ matrix, soulTask, familyTask }: InterpretationsDisplayProps) {
  return (
    <div className="space-y-6">
      {(soulTask || familyTask) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {soulTask && (
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-semibold mb-2">Личная задача Души</h3>
              <p className="text-sm">Число: {soulTask}</p>
            </div>
          )}
          {familyTask && (
            <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
              <h3 className="font-semibold mb-2">Родовая задача</h3>
              <p className="text-sm">Число: {familyTask}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
