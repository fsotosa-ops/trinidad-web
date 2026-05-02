import Image from 'next/image';
import { clsx } from 'clsx';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { RichText } from '@/components/ui/rich-text';
import type { Founder, SectionSolution } from '@/types/contentful';

const PHOTOS: Record<string, string> = {
  CMO: '/founder-cmo.png',
  CPO: '/founder-cpo.jpeg',
  CTO: '/founder-cto.webp',
};

function photoFor(titulo: string): string | null {
  const key = titulo.slice(0, 3).toUpperCase();
  return PHOTOS[key] ?? null;
}

function shortRole(titulo: string): string {
  return titulo.slice(0, 3).toUpperCase();
}

export function Solution({ data }: { data: SectionSolution | null }) {
  if (!data) return null;
  const founders = data.foundersCollection?.items ?? [];

  return (
    <section id="solucion" className="border-t border-trinidad-line/60 bg-trinidad-cream">
      <Container as="div" className="py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Los tres founders</Eyebrow>
            <h2 className="mt-6 font-medium leading-tight text-3xl text-trinidad-black md:text-5xl">
              {data.tituloH2Es}
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <RichText document={data.cuerpoEs} className="text-lg" />
          </div>
        </div>

        <div className="mt-24 md:mt-32">
          {founders.map((founder, index) => (
            <FounderRow
              key={founder.nombre}
              founder={founder}
              index={index}
              total={founders.length}
              isLast={index === founders.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FounderRow({
  founder,
  index,
  total,
  isLast,
}: {
  founder: Founder;
  index: number;
  total: number;
  isLast: boolean;
}) {
  const photo = photoFor(founder.titulocanonico);
  const role = shortRole(founder.titulocanonico);
  const reverse = index % 2 === 1;
  const number = String(index + 1).padStart(2, '0');
  const totalLabel = String(total).padStart(2, '0');

  return (
    <article
      className={clsx(
        'group grid items-center gap-10 md:grid-cols-12 md:gap-16',
        !isLast && 'border-b border-trinidad-line/60 pb-20 md:pb-28',
        index > 0 && 'mt-20 md:mt-28',
      )}
    >
      <div
        className={clsx(
          'md:col-span-6',
          reverse ? 'md:order-2 md:col-start-7' : 'md:order-1',
        )}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-trinidad-line">
          {photo && (
            <Image
              src={photo}
              alt={`${founder.nombre} — ${founder.titulocanonico}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover grayscale transition duration-700 group-hover:grayscale-0"
              priority={index === 0}
            />
          )}
          <span className="absolute left-6 top-6 inline-flex h-12 w-12 items-center justify-center bg-trinidad-cream text-xs font-medium uppercase tracking-[0.18em] text-trinidad-black">
            {role}
          </span>
        </div>
      </div>

      <div
        className={clsx(
          'md:col-span-5',
          reverse ? 'md:order-1 md:col-start-1' : 'md:order-2 md:col-start-8',
        )}
      >
        <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em] text-trinidad-gray">
          <span className="text-trinidad-terracota">{number}</span>
          <span className="h-px flex-1 bg-trinidad-line" aria-hidden />
          <span>/ {totalLabel}</span>
        </div>

        <p className="mt-8 text-xs font-medium uppercase tracking-[0.22em] text-trinidad-terracota">
          {founder.aristaEs}
        </p>

        <h3 className="mt-4 font-medium leading-[1.05] text-trinidad-black text-4xl md:text-6xl">
          {founder.nombre}
        </h3>

        <p className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-trinidad-black/70">
          {founder.titulocanonico}
        </p>

        <p className="mt-8 max-w-prose text-lg leading-relaxed text-trinidad-black/80">
          {founder.descripcionEs}
        </p>
      </div>
    </article>
  );
}
