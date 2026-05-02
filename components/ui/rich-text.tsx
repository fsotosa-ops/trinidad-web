import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import type { RichText as RichTextType } from '@/types/contentful';

type Tone = 'light' | 'dark';

const toneClasses: Record<Tone, { body: string; strong: string; link: string }> = {
  light: {
    body: 'text-trinidad-black/80',
    strong: 'text-trinidad-black',
    link: 'text-trinidad-terracota',
  },
  dark: {
    body: 'text-trinidad-cream/80',
    strong: 'text-trinidad-cream',
    link: 'text-trinidad-terracota',
  },
};

function buildOptions(tone: Tone): Options {
  const c = toneClasses[tone];
  return {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <strong className={clsx('font-medium', c.strong)}>{text}</strong>
      ),
      [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_, children) => (
        <p className={clsx('text-base leading-relaxed md:text-[17px]', c.body)}>{children}</p>
      ),
      [BLOCKS.HEADING_2]: (_, children) => (
        <h2 className={clsx('font-medium text-2xl md:text-3xl', c.strong)}>{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (_, children) => (
        <h3 className={clsx('font-medium text-xl md:text-2xl', c.strong)}>{children}</h3>
      ),
      [BLOCKS.UL_LIST]: (_, children) => (
        <ul className={clsx('space-y-2', c.body)}>{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_, children) => (
        <ol className={clsx('space-y-2', c.body)}>{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_, children) => (
        <li className="relative pl-6 leading-relaxed before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-trinidad-terracota">
          {children}
        </li>
      ),
      [BLOCKS.QUOTE]: (_, children) => (
        <blockquote className={clsx('border-l-2 border-trinidad-terracota pl-5 italic', c.body)}>
          {children}
        </blockquote>
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <a
          href={node.data.uri}
          className={clsx('underline-offset-4 hover:underline', c.link)}
          target={node.data.uri?.startsWith('http') ? '_blank' : undefined}
          rel={node.data.uri?.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      ),
    },
  };
}

const optionsLight = buildOptions('light');
const optionsDark = buildOptions('dark');

export function RichText({
  document,
  className,
  tone = 'light',
}: {
  document: RichTextType | null | undefined;
  className?: string;
  tone?: Tone;
}) {
  if (!document?.json) return null;
  const options = tone === 'dark' ? optionsDark : optionsLight;
  return (
    <div className={clsx('space-y-4', className)}>
      {documentToReactComponents(document.json, options) as ReactNode}
    </div>
  );
}
