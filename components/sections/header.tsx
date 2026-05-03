import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { HeaderMobileMenu } from './header-mobile-menu';

const NAV_LINKS = [
  { href: '#problema', label: 'Problema' },
  { href: '#solucion', label: 'Founders' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#precios', label: 'Precios' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-trinidad-line/60 bg-trinidad-cream/85 backdrop-blur">
      <Container as="div" className="flex items-center justify-between py-5">
        <a
          href="#top"
          className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trinidad-terracota"
          aria-label="Trinidad — inicio"
        >
          <Image
            src="/trinidad-logo-dark-trim.png"
            alt="Trinidad"
            width={1590}
            height={347}
            priority
            className="h-9 w-auto md:h-10"
          />
        </a>
        <nav
          aria-label="Navegación principal"
          className="hidden gap-8 text-sm uppercase tracking-[0.18em] text-trinidad-black/70 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-trinidad-terracota focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trinidad-terracota"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#cierre"
          className="hidden border border-trinidad-black px-5 py-2.5 text-sm font-medium uppercase tracking-[0.08em] text-trinidad-black transition-colors hover:bg-trinidad-black hover:text-trinidad-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trinidad-terracota md:inline-flex"
        >
          Diagnóstico 30′
        </a>
        <HeaderMobileMenu />
      </Container>
    </header>
  );
}
