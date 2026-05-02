import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';
import type { SectionHero } from '@/types/contentful';

export function Hero({ data }: { data: SectionHero | null }) {
  if (!data) return null;

  return (
    <section id="top" className="relative overflow-hidden">
      <Container as="div" className="pt-20 pb-24 md:pt-28 md:pb-32">
        <Eyebrow>Diagnóstico 3 / 60</Eyebrow>
        <h1 className="mt-8 max-w-5xl text-balance font-medium leading-[1.05] text-trinidad-black text-[clamp(2.25rem,5.2vw,4.75rem)]">
          {data.tituloEs}
        </h1>
        <p className="mt-8 max-w-3xl text-pretty text-lg leading-relaxed text-trinidad-black/70 md:text-xl">
          {data.subtituloEs}
        </p>
        <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Button href="#cierre">{data.ctaPrincipalEs}</Button>
          <Button href="#proceso" variant="ghost">{data.ctaSecundarioEs}</Button>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-px bg-trinidad-line/70 md:grid-cols-3">
          {[
            { k: 'Estrategia', v: 'Narrativa & motor B2B' },
            { k: 'Producto', v: 'Modelo, pricing & métricas' },
            { k: 'Tecnología', v: 'Datos, stack & automatización' },
          ].map((item) => (
            <div key={item.k} className="bg-trinidad-cream px-6 py-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-trinidad-terracota">
                {item.k}
              </p>
              <p className="mt-2 text-base text-trinidad-black/80">{item.v}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
