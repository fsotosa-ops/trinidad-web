import Image from 'next/image';
import { Container } from '@/components/ui/container';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-trinidad-line/60 bg-trinidad-cream/85 backdrop-blur">
      <Container as="div" className="flex items-center justify-between py-5">
        <a href="#top" className="flex items-center" aria-label="Trinidad — inicio">
          <Image
            src="/trinidad-logo-dark-trim.png"
            alt="Trinidad"
            width={1590}
            height={347}
            priority
            className="h-9 w-auto md:h-10"
          />
        </a>
        <nav className="hidden gap-8 text-sm uppercase tracking-[0.18em] text-trinidad-black/70 md:flex">
          <a href="#problema" className="hover:text-trinidad-terracota transition-colors">Problema</a>
          <a href="#solucion" className="hover:text-trinidad-terracota transition-colors">Founders</a>
          <a href="#proceso" className="hover:text-trinidad-terracota transition-colors">Proceso</a>
          <a href="#precios" className="hover:text-trinidad-terracota transition-colors">Precios</a>
        </nav>
        <a
          href="#cierre"
          className="hidden text-sm font-medium uppercase tracking-[0.08em] text-trinidad-cream bg-trinidad-terracota px-5 py-2.5 hover:bg-trinidad-black transition-colors md:inline-flex"
        >
          Diagnóstico 30′
        </a>
      </Container>
    </header>
  );
}
