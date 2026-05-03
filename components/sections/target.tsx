// components/sections/target.tsx
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
  BLOCKS.HEADING_5,
  BLOCKS.HEADING_6,
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
    <section
      id="encaja"
      aria-labelledby="encaja-heading"
      className="bg-trinidad-bg border-t border-trinidad-line/60"
    >
      <Container as="div" className="py-24 md:py-32">
        <div className="max-w-3xl">
          <Eyebrow>¿Encaja con tu empresa?</Eyebrow>
          <h2
            id="encaja-heading"
            className="mt-6 font-display font-medium leading-[1.1] tracking-[-0.02em] text-trinidad-black text-[clamp(2.25rem,5vw,3.75rem)]"
          >
            {data.tituloH2Es}
          </h2>
        </div>

        <div className="mt-20 grid gap-12 md:mt-24 md:grid-cols-2 md:gap-16 lg:gap-24">
          <FilterCard tone="match" document={data.encajaSiEs} />
          <FilterCard tone="miss" document={data.noEncajaSiEs} />
        </div>

        {verticales.length > 0 && (
          <div className="mt-24 border-t border-trinidad-line/70 pt-12 md:mt-32">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-trinidad-gray">
              Verticales en las que trabajamos
            </p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {verticales.map((v) => (
                <li
                  key={v}
                  className="border border-trinidad-line/80 px-5 py-2 text-[13px] uppercase tracking-wider text-trinidad-black/80 transition-colors hover:border-trinidad-terracota hover:text-trinidad-terracota"
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
    <article className={clsx('flex flex-col h-full', !isMatch && 'md:pt-0')}>
      <div
        className={clsx(
          'flex flex-col p-8 md:p-12 h-full',
          isMatch
            ? 'bg-trinidad-black text-trinidad-cream shadow-2xl'
            : 'bg-transparent p-0 md:p-0'
        )}
      >
        <header className="flex flex-row items-center gap-4 md:gap-5">
          <div
            aria-hidden
            className={clsx(
              'flex items-center justify-center shrink-0 rounded-full w-10 h-10 md:w-12 md:h-12',
              isMatch
                ? 'bg-trinidad-terracota text-trinidad-cream'
                : 'bg-trinidad-black/5 text-trinidad-black/40',
            )}
          >
            {/* Aquí está el cambio principal: Reduje text-2xl/3xl a text-lg/xl */}
            <span className="font-medium text-lg md:text-xl leading-none select-none relative top-[-1px]">
              {isMatch ? '+' : '−'}
            </span>
          </div>
          
          {heading && (
            <h3
              className={clsx(
                'font-semibold leading-snug text-lg md:text-xl tracking-tight',
                isMatch ? 'text-trinidad-cream' : 'text-trinidad-black',
              )}
            >
              {heading}
            </h3>
          )}
        </header>

        <div
          className={clsx(
            'mt-6 border-t pt-6 flex-1',
            isMatch ? 'border-trinidad-cream/10' : 'border-trinidad-black/10',
          )}
        >
          <RichText 
            document={body} 
            tone={isMatch ? 'dark' : 'light'} 
            className={clsx(
              'text-[17px] leading-relaxed',
              !isMatch && '[&_p]:text-trinidad-black/60 [&_li]:text-trinidad-black/60'
            )}
          />
        </div>
      </div>
    </article>
  );
}