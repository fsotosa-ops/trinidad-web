import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';
import type { SectionHero } from '@/types/contentful';

export function Hero({ data }: { data: SectionHero | null }) {
  if (!data) return null;
  const pillares = data.pillaresCollection?.items ?? [];

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      <Container as="div" className="pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid gap-14 md:grid-cols-12 md:items-end md:gap-16">
          <div className="md:col-span-7">
            <div className="fade-up fade-up-delay-1">
              <Eyebrow>Diagnóstico 3 / 60</Eyebrow>
            </div>
            <h1
              id="hero-heading"
              className="fade-up fade-up-delay-2 mt-8 max-w-3xl text-balance font-display font-medium leading-[1.05] tracking-[-0.02em] text-trinidad-black text-[clamp(2.625rem,5.5vw,4.5rem)]"
            >
              {data.tituloEs}
            </h1>
            <p className="fade-up fade-up-delay-3 mt-8 max-w-xl text-pretty text-base leading-relaxed text-trinidad-black/70 sm:text-lg">
              {data.subtituloEs}
            </p>
            <div className="fade-up fade-up-delay-4 mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <Button href="#cierre">{data.ctaPrincipalEs}</Button>
              <Button href="#proceso" variant="ghost">
                {data.ctaSecundarioEs}
              </Button>
            </div>
          </div>

          {pillares.length > 0 && (
            <aside
              aria-label="Las tres aristas"
              className="fade-up fade-up-delay-5 md:col-span-5"
            >
              <div className="border border-trinidad-line">
                <div className="h-px w-full bg-trinidad-terracota" aria-hidden />
                <ul className="divide-y divide-trinidad-line">
                  {pillares.map((p) => (
                    <li key={p.etiquetaEs} className="px-6 py-5 transition-colors hover:bg-trinidad-terracota/[0.04]">
                      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-trinidad-terracota">
                        {p.etiquetaEs}
                      </p>
                      <p className="mt-2 text-base leading-snug text-trinidad-black/85">
                        {p.descripcionEs}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>
      </Container>
    </section>
  );
}
