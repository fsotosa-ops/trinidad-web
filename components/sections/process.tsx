import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { RichText } from '@/components/ui/rich-text';
import type { SectionProcess, Sprint } from '@/types/contentful';

export function Process({ data }: { data: SectionProcess | null }) {
  if (!data) return null;
  const sprints = data.sprintsCollection?.items ?? [];

  return (
    <section
      id="proceso"
      aria-labelledby="proceso-heading"
      className="border-t border-trinidad-line/60"
    >
      <Container as="div" className="py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Cómo funciona</Eyebrow>
            <h2
              id="proceso-heading"
              className="mt-6 font-display font-medium leading-tight tracking-[-0.02em] text-trinidad-black text-[clamp(2rem,4vw,3.25rem)]"
            >
              {data.tituloH2Es}
            </h2>
          </div>
          {data.introEs && (
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-lg leading-relaxed text-trinidad-black/75">
                {data.introEs}
              </p>
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.22em] text-trinidad-gray">
                60 días <span className="text-trinidad-line">·</span> {sprints.length} sprints
              </p>
            </div>
          )}
        </div>

        {sprints.length > 0 && (
          <ol className="mt-20 grid gap-px bg-trinidad-line md:mt-28 md:grid-cols-4">
            {sprints.map((sprint) => (
              <SprintCard key={sprint.numero} sprint={sprint} />
            ))}
          </ol>
        )}

        {data.cierreEs && (
          <div className="mt-20 max-w-3xl">
            <RichText document={data.cierreEs} className="text-lg" />
          </div>
        )}
      </Container>
    </section>
  );
}

function SprintCard({ sprint }: { sprint: Sprint }) {
  const number = String(sprint.numero).padStart(2, '0');

  return (
    <li className="flex flex-col gap-5 bg-trinidad-cream p-7 md:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-medium leading-none tracking-[-0.04em] text-trinidad-terracota tabular-nums text-5xl md:text-6xl">
          {number}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-trinidad-gray">
          Días {sprint.dias}
        </span>
      </div>

      <h3 className="font-display font-medium leading-snug tracking-[-0.01em] text-trinidad-black text-xl md:text-2xl">
        {sprint.nombreEs}
      </h3>

      <p className="text-sm leading-relaxed text-trinidad-black/80">
        {sprint.objetivoEs}
      </p>

      <div className="mt-auto border-t border-trinidad-line pt-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-trinidad-gray">
          Entregable
        </p>
        <p className="mt-2 text-sm text-trinidad-black/90">{sprint.entregableEs}</p>
      </div>
    </li>
  );
}
