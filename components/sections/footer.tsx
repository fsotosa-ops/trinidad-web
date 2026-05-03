import Image from 'next/image';
import { Container } from '@/components/ui/container';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-trinidad-line/60 bg-trinidad-black text-trinidad-cream">
      <Container as="div" className="py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <Image
              src="/trinidad-logo-white-trim.png"
              alt="Trinidad"
              width={1590}
              height={347}
              className="h-12 w-auto"
            />
            <p className="max-w-xs text-sm leading-relaxed text-trinidad-cream/70">
              Un diagnóstico. Tres aristas. Ningún punto ciego.
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-trinidad-cream/50">Navegar</p>
            <ul className="space-y-2 text-trinidad-cream/80">
              <li><a href="#problema" className="transition-colors hover:text-trinidad-terracota focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trinidad-terracota">El problema</a></li>
              <li><a href="#solucion" className="transition-colors hover:text-trinidad-terracota focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trinidad-terracota">Founders</a></li>
              <li><a href="#proceso" className="transition-colors hover:text-trinidad-terracota focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trinidad-terracota">Proceso 3/60</a></li>
              <li><a href="#precios" className="transition-colors hover:text-trinidad-terracota focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trinidad-terracota">Inversión</a></li>
            </ul>
          </div>
          <div className="space-y-3 text-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-trinidad-cream/50">Contacto</p>
            <p className="text-trinidad-cream/80">
              Conversa con uno de los tres founders. <br />
              Sin costo. Sin compromiso.
            </p>
            <a
              href="#cierre"
              className="inline-flex items-center gap-2 text-trinidad-terracota transition-colors hover:text-trinidad-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trinidad-terracota"
            >
              Solicitar diagnóstico →
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-trinidad-cream/15 pt-6 text-xs uppercase tracking-[0.18em] text-trinidad-cream/50 md:flex-row md:items-center md:justify-between">
          <span>Trinidad © {year}</span>
          <span>Estrategia · Producto · Tecnología</span>
        </div>
      </Container>
    </footer>
  );
}
