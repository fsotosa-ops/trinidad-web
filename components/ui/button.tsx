import { clsx } from 'clsx';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'outline';

const variants: Record<Variant, string> = {
  primary:
    'bg-trinidad-terracota text-trinidad-cream hover:bg-trinidad-terra-dark active:bg-trinidad-terra-dark',
  secondary:
    'bg-trinidad-black text-trinidad-cream hover:bg-trinidad-terracota active:bg-trinidad-terra-dark',
  ghost:
    'bg-transparent text-trinidad-black border-b border-trinidad-black/40 px-0 py-2 hover:text-trinidad-terracota hover:border-trinidad-terracota active:text-trinidad-terra-dark',
  inverse:
    'bg-trinidad-cream text-trinidad-black hover:bg-trinidad-terracota hover:text-trinidad-cream active:bg-trinidad-terra-dark active:text-trinidad-cream',
  outline:
    'bg-transparent text-trinidad-black border border-trinidad-black hover:bg-trinidad-black hover:text-trinidad-cream active:bg-trinidad-black/90',
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
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trinidad-terracota',
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
