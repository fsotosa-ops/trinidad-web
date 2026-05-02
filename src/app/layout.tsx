import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Trinidad — Un diagnóstico. Tres aristas. Ningún punto ciego.',
  description:
    'Consultoría boutique B2B. Tres C-level fraccionales — estrategia, producto y tecnología — entran a tu empresa durante 60 días para entregarte una hoja de ruta ejecutable.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-trinidad-cream text-trinidad-black">{children}</body>
    </html>
  );
}
