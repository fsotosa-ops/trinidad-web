import { clsx } from 'clsx';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse';

const variants: Record<Variant, string> = {
  primary:
    'bg-trinidad-terracota text-trinidad-cream hover:bg-trinidad-black',
  secondary:
    'bg-trinidad-black text-trinidad-cream hover:bg-trinidad-terracota',
  ghost:
    'bg-transparent text-trinidad-black border-b border-trinidad-black/40 px-0 py-2 hover:text-trinidad-terracota hover:border-trinidad-terracota',
  inverse:
    'bg-trinidad-cream text-trinidad-black hover:bg-trinidad-terracota hover:text-trinidad-cream',
};

export function Button({
  href,
  variant = 'primary',
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isGhost = variant === 'ghost';
  return (
    <a
      href={href}
      className={clsx(
        'inline-flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-[0.08em] transition-colors duration-200',
        !isGhost && 'px-6 py-3.5',
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
