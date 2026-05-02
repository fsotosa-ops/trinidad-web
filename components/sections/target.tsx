import { clsx } from 'clsx';
import { BLOCKS, type Block, type Inline, type Text } from '@contentful/rich-text-types';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { RichText } from '@/components/ui/rich-text';
import type { RichText as RichTextType, SectionTarget } from '@/types/contentful';

const LEADING_HEADING_TYPES = new Set<string>([
  BLOCKS.HEADING_1,
  BLOCKS.HEADING_2,
  BLOCKS.HEADING_3,
  BLOCKS.HEADING_4,
]);

function extractText(node: Block | Inline | Text): string {
  if (node.nodeType === 'text') return node.value;
  if ('content' in node && Array.isArray(node.content)) {
    return node.content.map((child) => extractText(child as Block | Inline | Text)).join('');
  }
  return '';
}

function splitLeadingHeading(rich: RichTextType): {
  heading: string | null;
  body: RichTextType;
} {
  const doc = rich.json;
  const first = doc.content[0];
  if (first && LEADING_HEADING_TYPES.has(first.nodeType)) {
    const heading = extractText(first as Block).trim();
    if (heading) {
      return {
        heading,
        body: { json: { ...doc, content: doc.content.slice(1) } },
      };
    }
  }
  return { heading: null, body: rich };
}

export function Target({ data }: { data: SectionTarget | null }) {
  if (!data) return null;

  const verticales = (data.verticalesEs ?? '')
    .split(/\r?\n|·|•/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <section id="encaja" className="border-t border-trinidad-line/60">
      <Container as="div" className="py-24 md:py-32">
        <div className="max-w-3xl">
          <Eyebrow>¿Encaja con tu empresa?</Eyebrow>
          <h2 className="mt-6 font-medium leading-tight text-3xl text-trinidad-black md:text-5xl">
            {data.tituloH2Es}
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
          <FilterCard tone="match" document={data.encajaSiEs} />
          <FilterCard tone="miss" document={data.noEncajaSiEs} />
        </div>

        {verticales.length > 0 && (
          <div className="mt-20 border-t border-trinidad-line/70 pt-10 md:mt-24">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-trinidad-gray">
              Verticales en las que trabajamos
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {verticales.map((v) => (
                <li
                  key={v}
                  className="border border-trinidad-line/80 px-4 py-1.5 text-sm text-trinidad-black/85 transition hover:border-trinidad-terracota hover:text-trinidad-black"
                >
                  {v}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}

function FilterCard({
  tone,
  document,
}: {
  tone: 'match' | 'miss';
  document: RichTextType;
}) {
  const { heading, body } = splitLeadingHeading(document);
  const isMatch = tone === 'match';

  return (
    <article
      className={clsx(
        'p-8 md:p-12',
        isMatch
          ? 'bg-trinidad-black text-trinidad-cream'
          : 'bg-trinidad-line [&_li]:before:bg-trinidad-gray [&_p]:text-trinidad-black/55 [&_strong]:text-trinidad-black/75 [&_h2]:text-trinidad-black/70 [&_h3]:text-trinidad-black/70',
      )}
    >
      <header className="flex items-end gap-5 md:gap-6">
        <span
          aria-hidden
          className={clsx(
            'select-none font-medium leading-none text-6xl md:text-7xl',
            isMatch ? 'text-trinidad-terracota' : 'text-trinidad-gray',
          )}
        >
          {isMatch ? '+' : '—'}
        </span>
        {heading && (
          <h3
            className={clsx(
              'font-medium leading-tight text-xl md:text-2xl',
              isMatch ? 'text-trinidad-cream' : 'text-trinidad-black/70',
            )}
          >
            {heading}
          </h3>
        )}
      </header>

      <div
        className={clsx(
          'mt-8 border-t pt-8',
          isMatch ? 'border-trinidad-cream/15' : 'border-trinidad-gray/20',
        )}
      >
        <RichText document={body} tone={isMatch ? 'dark' : 'light'} />
      </div>
    </article>
  );
}
