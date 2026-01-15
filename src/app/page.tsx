'use client';

import { useState } from 'react';

export default function NumerologyPage() {
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    if (!birthDate) {
      setError('Пожалуйста, введите дату рождения');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/numerology/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birthDate })
      });

      if (!response.ok) {
        throw new Error('Failed to calculate');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Ошибка при расчете матрицы');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #faf5ff, #fdf2f8, #eff6ff)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center', background: 'linear-gradient(to right, #9333ea, #db2777)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: '#9333ea' }}>
          Нумерологический Калькулятор
        </h1>
        <p style={{ fontSize: '20px', color: '#64748b', textAlign: 'center', marginBottom: '32px' }}>
          Расчет психоматрицы и AI-анализ по дате рождения
        </p>
        
        <div style={{ background: '#ffffff', borderRadius: '8px', padding: '24px', marginBottom: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            Введите дату рождения
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Дата рождения
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate((e.target as HTMLInputElement).value)}
                style={{ fontSize: '18px', height: '48px', width: '100%', padding: '0 12px', border: '1px solid #d1d5db', borderRadius: '6px' }}
              />
            </div>
            <button
              onClick={handleCalculate}
              disabled={loading || !birthDate}
              style={{
                padding: '0 32px',
                fontSize: '16px',
                fontWeight: '500',
                color: '#ffffff',
                background: loading || !birthDate ? '#9ca3af' : 'linear-gradient(to right, #9333ea, #db2777)',
                border: 'none',
                borderRadius: '6px',
                cursor: loading || !birthDate ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Расчет...' : 'Рассчитать матрицу'}
            </button>
          </div>
          {error && (
            <div style={{ color: '#dc2626', padding: '12px', backgroundColor: '#fee2e2', borderRadius: '6px', marginTop: '16px' }}>
              {error}
            </div>
          )}
        </div>

        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
              Дополнительные числа
            </h2>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {result.additionalNumbers.map((num: number, index: number) => (
                <div key={index} style={{ background: 'linear-gradient(to bottom right, #faf5ff, #fdf2f8)', padding: '12px 24px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#9333ea' }}>
                    {num}
                  </span>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
              Матрица 3x3
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: 'linear-gradient(to bottom right, #faf5ff, #fdf2f8)', padding: '24px', borderRadius: '12px' }}>
              {result.matrix.map((cell: any) => (
                <div key={cell.digit} style={{ background: '#ffffff', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#9333ea', marginBottom: '4px' }}>
                      {cell.count > 0 ? cell.digit : '—'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      {cell.count > 0 ? Array(cell.count).fill(cell.digit).join(' ') : '—'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
              Задачи Души и Рода
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {result.soulTask && (
                <div style={{ background: '#faf5ff', padding: '16px', borderRadius: '8px', border: '2px solid #e9d5ff' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                    Личная задача Души
                  </h3>
                  <p style={{ fontSize: '14px', marginBottom: '4px' }}>
                    Число: {result.soulTask}
                  </p>
                </div>
              )}
              {result.familyTask && (
                <div style={{ background: '#fdf2f8', padding: '16px', borderRadius: '8px', border: '2px solid #fbcfe8' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                    Родовая задача
                  </h3>
                  <p style={{ fontSize: '14px', marginBottom: '4px' }}>
                    Число: {result.familyTask}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        
        <footer style={{ marginTop: '64px', textAlign: 'center', padding: '24px', borderTop: '1px solid #e5e7eb', color: '#64748b', fontSize: '14px' }}>
          Нумерологический калькулятор • Создано с помощью Next.js и z-ai-web-dev-sdk
        </footer>
      </div>
    </div>
  );
}
