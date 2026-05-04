// components/sections/closing.tsx
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { RichText } from '@/components/ui/rich-text';
import { Button } from '@/components/ui/button';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { MARKS, BLOCKS } from '@contentful/rich-text-types';
import type { SectionClosing } from '@/types/contentful';
import React, { type ReactNode, Fragment } from 'react';

const titleOptions: Options = {
  renderMark: {
    [MARKS.ITALIC]: (text: ReactNode) => (
      <em className="font-display italic text-trinidad-terracota not-italic-style">
        {text}
      </em>
    ),
  },
  // Lógica mejorada para saltos de línea (Shift + Enter en Contentful)
  renderText: (text) => {
    return text.split('\n').reduce((children: any[], textSegment, index) => {
      return [...children, index > 0 && <br key={`br-${index}`} />, textSegment];
    }, []);
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children: ReactNode) => <>{children}</>,
    [BLOCKS.HEADING_1]: (_, children: ReactNode) => <>{children}</>,
    [BLOCKS.HEADING_2]: (_, children: ReactNode) => <>{children}</>,
  },
};

export function Closing({ data }: { data: SectionClosing | null }) {
  if (!data) return null;

  return (
    <section
      id="cierre"
      aria-labelledby="cierre-heading"
      className="border-t border-trinidad-line/60 bg-trinidad-bg py-24 md:py-[120px]"
    >
      <Container as="div" className="px-6 md:px-[48px]">
        <div className="mx-auto max-w-[800px] text-center">
          
          <div className="flex justify-center mb-8">
            <Eyebrow className="justify-center text-trinidad-black">Última palabra</Eyebrow>
          </div>
          
          <h2
            id="cierre-heading"
            className="mb-8 font-display font-medium leading-[1.1] tracking-[-0.02em] text-trinidad-black text-[clamp(40px,5vw,64px)] whitespace-pre-line"
          >
            {data.tituloRichEs 
              ? documentToReactComponents(data.tituloRichEs.json, titleOptions)
              : data.tituloH2Es}
          </h2>
          
          <div className="mx-auto mb-10 max-w-[600px] text-[20px] leading-[1.6] text-trinidad-gray">
            <RichText document={data.cuerpoEs} tone="light" />
          </div>
          
          <Button 
            href="mailto:hola@trinidad.consulting" 
            className="inline-block w-auto rounded-none border-none bg-trinidad-terracota px-[36px] py-[16px] text-[12px] font-medium uppercase tracking-[0.12em] text-white hover:bg-trinidad-terracota/90 transition-colors"
          >
            {data.ctaTextoEs}
          </Button>
          
          {/* META DATOS DINÁMICOS */}
          {data.metadatosEs && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.1em] text-trinidad-gray">
              {/* Esta lógica pone el punto separador automáticamente entre palabras */}
              {data.metadatosEs.split('·').map((item, i, arr) => (
                <Fragment key={i}>
                  {item.trim()}
                  {i < arr.length - 1 && (
                    <span className="text-trinidad-line text-[16px] leading-none">·</span>
                  )}
                </Fragment>
              ))}
            </div>
          )}
          
          {/* DISCLAIMER PAÍSES DINÁMICO */}
          {data.disclaimerPaisesEs && (
            <div className="mt-3 text-[12px] text-trinidad-gray">
              {data.disclaimerPaisesEs}
            </div>
          )}

        </div>
      </Container>
    </section>
  );
}