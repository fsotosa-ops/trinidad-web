// components/sections/hero.tsx
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { MARKS, BLOCKS } from '@contentful/rich-text-types';
import type { SectionHero } from '@/types/contentful';
import type { ReactNode } from 'react';

export function Hero({ data }: { data: SectionHero | null }) {
  if (!data) return null;

  // 1. Configuración para el título Rich Text (Cursiva -> Terracota y limpieza de etiquetas)
  const titleOptions: Options = {
    renderMark: {
      [MARKS.ITALIC]: (text: ReactNode) => (
        <em className="font-display italic text-trinidad-terracota not-italic-style">
          {text}
        </em>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_, children: ReactNode) => <>{children}</>,
      [BLOCKS.HEADING_1]: (_, children: ReactNode) => <>{children}</>,
      [BLOCKS.HEADING_2]: (_, children: ReactNode) => <>{children}</>,
      [BLOCKS.HEADING_3]: (_, children: ReactNode) => <>{children}</>,
      [BLOCKS.HEADING_4]: (_, children: ReactNode) => <>{children}</>,
      [BLOCKS.HEADING_5]: (_, children: ReactNode) => <>{children}</>,
      [BLOCKS.HEADING_6]: (_, children: ReactNode) => <>{children}</>,
    }
  };

  const tarjetas = data.tarjetasLateralesCollection?.items ?? [];

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-trinidad-bg"
    >
      <Container as="div" className="pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid gap-14 md:grid-cols-12 md:items-end md:gap-16">
          
          {/* LADO IZQUIERDO: TEXTOS */}
          <div className="md:col-span-7">
            <div className="fade-up fade-up-delay-1">
              <Eyebrow>{data.etiquetaSuperiorEs || 'Consultoría Boutique B2B'}</Eyebrow>
            </div>
            
            <h1
              id="hero-heading"
              className="fade-up fade-up-delay-2 mt-8 max-w-4xl font-display font-medium leading-[1.1] tracking-[-0.02em] text-trinidad-black text-[clamp(2.625rem,5.5vw,4.5rem)]"
            >
              {data.tituloRichEs?.json ? documentToReactComponents(data.tituloRichEs.json, titleOptions) : null}
            </h1>
            
            <p className="fade-up fade-up-delay-3 mt-8 max-w-xl text-pretty text-base leading-relaxed text-trinidad-black/70 sm:text-lg">
              {data.subtituloEs}
            </p>
            
            {/* CONTENEDOR DE BOTONES */}
            <div className="fade-up fade-up-delay-4 mt-12 flex flex-col items-start gap-10 sm:flex-row sm:items-center">
              
              {/* CTA PRINCIPAL: Alineado a la izquierda, fuente pequeña y saltos de línea */}
              <Button 
                href="#cierre" 
                className="whitespace-pre-line text-left items-start justify-start flex h-auto py-4 px-6 text-[13px] uppercase tracking-[0.15em] font-medium leading-tight min-w-[240px] border border-trinidad-terracota bg-trinidad-terracota text-white hover:bg-trinidad-terracota/90"
              >
                {data.ctaPrincipalEs}
              </Button>
              
              {/* CTA SECUNDARIO: También con salto de línea y alineado a la izquierda */}
              <Button 
                href="#proceso" 
                variant="ghost" 
                className="group whitespace-pre-line text-left items-start flex h-auto py-2 text-[13px] uppercase tracking-[0.15em] font-medium leading-tight p-0 hover:bg-transparent"
              >
                <span className="flex items-start">
                  <span className="block">{data.ctaSecundarioEs}</span>
                  <span className="ml-3 inline-block transition-transform group-hover:translate-x-1 text-xl leading-none">
                    →
                  </span>
                </span>
              </Button>
            </div>
          </div>

          {/* LADO DERECHO: TARJETAS */}
          {tarjetas.length > 0 && (
            <aside className="fade-up fade-up-delay-5 md:col-span-5">
              <div className="border border-trinidad-line bg-white/30 backdrop-blur-sm">
                <div className="h-px w-full bg-trinidad-terracota" />
                <ul className="divide-y divide-trinidad-line">
                  {tarjetas.map((item, index) => (
                    <li key={index} className="px-6 py-7 hover:bg-white/50 transition-colors">
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-trinidad-terracota/90">
                        {item.categoria}
                      </p>
                      <p className="mt-3 text-[17px] font-medium leading-snug text-trinidad-black/90">
                        {item.descripcion}
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