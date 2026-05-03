import Image from 'next/image';
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
  const framework = data.frameworkImage ?? null;

  return (
    <section
      id="solucion"
      aria-labelledby="solucion-heading"
      className="relative border-t border-trinidad-line/60 bg-trinidad-cream"
    >
      {framework?.url && (
        <div className="relative z-10 -mt-20 px-6 md:-mt-32 md:px-10">
          <div className="mx-auto max-w-3xl">
            <Image
              src={framework.url}
              alt={
                framework.description ||
                'Framework 3/60: la intersección de Marketing, Desarrollo Digital y Data'
              }
              width={framework.width}
              height={framework.height}
              sizes="(min-width: 1024px) 720px, 90vw"
              loading="lazy"
              className="h-auto w-full"
            />
          </div>
        </div>
      )}

      <Container as="div" className="py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Los tres founders</Eyebrow>
            <h2
              id="solucion-heading"
              className="mt-6 font-display font-medium leading-tight tracking-[-0.02em] text-trinidad-black text-[clamp(2rem,4vw,3.25rem)]"
            >
              {data.tituloH2Es}
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <RichText document={data.cuerpoEs} className="text-lg" />
          </div>
        </div>

        {founders.length > 0 && (
          <div className="mt-20 grid gap-px bg-trinidad-line md:mt-28 md:grid-cols-3">
            {founders.map((founder, index) => (
              <FounderCard key={founder.nombre} founder={founder} index={index} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

function FounderCard({ founder, index }: { founder: Founder; index: number }) {
  const photo = photoFor(founder.titulocanonico);
  const role = shortRole(founder.titulocanonico);

  return (
    <article className="group flex flex-col bg-trinidad-cream">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-trinidad-line">
        {photo && (
          <Image
            src={photo}
            alt={`${founder.nombre} — ${founder.titulocanonico}`}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover grayscale transition duration-700 group-hover:grayscale-0"
            priority={index === 0}
          />
        )}
        <span className="absolute left-5 top-5 inline-flex h-10 items-center bg-trinidad-cream px-3 text-[11px] font-medium uppercase tracking-[0.22em] text-trinidad-black">
          {role}
        </span>
      </div>

      <div className="flex flex-col gap-4 p-7 md:p-8">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-trinidad-terracota">
          {founder.aristaEs}
        </p>
        <h3 className="font-display font-medium leading-tight tracking-[-0.01em] text-trinidad-black text-2xl md:text-3xl">
          {founder.nombre}
        </h3>
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-trinidad-black/60">
          {founder.titulocanonico}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-trinidad-black/80 md:text-base">
          {founder.descripcionEs}
        </p>
      </div>
    </article>
  );
}
