import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { RichText } from '@/components/ui/rich-text';
import type { SectionProblem } from '@/types/contentful';

export function Problem({ data }: { data: SectionProblem | null }) {
  if (!data) return null;

  return (
    <section
      id="problema"
      className="border-t border-trinidad-line/60 bg-trinidad-black text-trinidad-cream"
    >
      <Container as="div" className="py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow className="text-trinidad-cream/60">El problema</Eyebrow>
            <h2 className="mt-6 font-medium leading-tight text-3xl md:text-4xl">
              {data.tituloH2Es}
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <RichText document={data.cuerpoEs} tone="dark" className="text-lg" />
          </div>
        </div>
      </Container>
    </section>
  );
}
