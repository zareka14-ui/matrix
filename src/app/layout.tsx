import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Нумерологический Калькулятор',
  description: 'Расчет психоматрицы с AI-анализом'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
