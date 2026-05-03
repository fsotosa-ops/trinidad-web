import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://trinidad.consulting';

const SITE_TITLE = 'Trinidad — Un diagnóstico. Tres aristas. Ningún punto ciego.';
const SITE_DESCRIPTION =
  'Consultoría boutique B2B. Tres C-level fraccionales — estrategia, producto y tecnología — entran a tu empresa durante 60 días para entregarte una hoja de ruta ejecutable.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    'consultoría B2B',
    'diagnóstico estratégico',
    'fractional CMO',
    'fractional CPO',
    'fractional CTO',
    'estrategia',
    'producto',
    'tecnología',
    'Chile',
    'boutique',
  ],
  authors: [{ name: 'Trinidad' }],
  creator: 'Trinidad',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: SITE_URL,
    siteName: 'Trinidad',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Trinidad — Diagnóstico 3 / 60',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-default.png'],
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Trinidad',
    url: SITE_URL,
    logo: `${SITE_URL}/trinidad-logo-dark.png`,
    description: SITE_DESCRIPTION,
    areaServed: {
      '@type': 'Country',
      name: 'Chile',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Diagnóstico 3 / 60',
    provider: {
      '@type': 'Organization',
      name: 'Trinidad',
      url: SITE_URL,
    },
    serviceType: 'Consultoría estratégica B2B',
    areaServed: {
      '@type': 'Country',
      name: 'Chile',
    },
    description:
      'Diagnóstico de 60 días entregado por tres C-level fraccionales (CMO, CPO, CTO) que entrega una hoja de ruta ejecutable.',
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="bg-trinidad-cream text-trinidad-black">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
