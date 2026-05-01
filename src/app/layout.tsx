// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css'; // Importa Tailwind y estilos globales

// Aquí configuramos el Meta SEO básico de Trinidad
export const metadata: Metadata = {
  title: 'Trinidad | Consultoría estratégica B2B',
  description: 'Un diagnóstico. Tres aristas. Ningún punto ciego.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      {/* El body envuelve toda la aplicación y le da el fondo/color de texto base */}
      <body className="antialiased bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        {children}
      </body>
    </html>
  );
}