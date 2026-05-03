import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { RichText } from '@/components/ui/rich-text';
import { Button } from '@/components/ui/button';
import type { SectionClosing } from '@/types/contentful';

export function Closing({ data }: { data: SectionClosing | null }) {
  if (!data) return null;

  return (
    <section
      id="cierre"
      aria-labelledby="cierre-heading"
      className="border-t border-trinidad-line/60"
    >
      <Container as="div" className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow className="justify-center">Última palabra</Eyebrow>
          <h2
            id="cierre-heading"
            className="mt-6 font-display font-medium leading-[1.05] tracking-[-0.02em] text-trinidad-black text-[clamp(2.25rem,5vw,4.25rem)]"
          >
            {data.tituloH2Es}
          </h2>
          <div className="mt-10 mx-auto max-w-2xl">
            <RichText document={data.cuerpoEs} className="text-lg" />
          </div>
          <div className="mt-12 flex flex-col items-center gap-4">
            <Button href="mailto:hola@trinidad.consulting">{data.ctaTextoEs}</Button>
            <p className="text-xs uppercase tracking-[0.18em] text-trinidad-gray">
              Sin costo · Sin compromiso · 30 minutos
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
