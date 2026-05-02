import { clsx } from 'clsx';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { RichText } from '@/components/ui/rich-text';
import type { SectionProcess, Sprint } from '@/types/contentful';

export function Process({ data }: { data: SectionProcess | null }) {
  if (!data) return null;
  const sprints = data.sprintsCollection?.items ?? [];

  return (
    <section id="proceso" className="border-t border-trinidad-line/60">
      <Container as="div" className="py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Cómo funciona</Eyebrow>
            <h2 className="mt-6 font-medium leading-tight text-3xl text-trinidad-black md:text-5xl">
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

        <ol className="mt-20 md:mt-28">
          {sprints.map((sprint, index) => (
            <SprintRow
              key={sprint.numero}
              sprint={sprint}
              total={sprints.length}
              index={index}
            />
          ))}
        </ol>

        {data.cierreEs && (
          <div className="mt-20 max-w-3xl">
            <RichText document={data.cierreEs} className="text-lg" />
          </div>
        )}
      </Container>
    </section>
  );
}

function SprintRow({
  sprint,
  total,
  index,
}: {
  sprint: Sprint;
  total: number;
  index: number;
}) {
  const number = String(sprint.numero).padStart(2, '0');
  const totalLabel = String(total).padStart(2, '0');

  return (
    <li
      className={clsx(
        index > 0 && 'mt-14 border-t border-trinidad-line/60 pt-14 md:mt-16 md:pt-16',
      )}
    >
      <p className="flex flex-wrap items-baseline gap-x-5 gap-y-2 text-xs font-medium uppercase tracking-[0.22em] text-trinidad-gray">
        <span className="text-trinidad-terracota tabular-nums">Sprint {number}</span>
        <span>Días {sprint.dias}</span>
        <span className="ml-auto text-trinidad-gray/70 tabular-nums">
          {number} <span className="text-trinidad-line">/</span> {totalLabel}
        </span>
      </p>

      <h3 className="mt-5 max-w-2xl font-medium leading-tight text-trinidad-black text-2xl md:text-4xl">
        {sprint.nombreEs}
      </h3>

      <p className="mt-4 max-w-2xl text-base leading-relaxed text-trinidad-black/80 md:text-lg">
        {sprint.objetivoEs}
      </p>

      <p className="mt-5 max-w-2xl text-base">
        <span className="text-xs font-medium uppercase tracking-[0.22em] text-trinidad-gray">
          Entregable —
        </span>{' '}
        <span className="text-trinidad-black/90">{sprint.entregableEs}</span>
      </p>
    </li>
  );
}
