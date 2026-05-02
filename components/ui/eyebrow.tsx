import { clsx } from 'clsx';
import type { ReactNode } from 'react';

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-trinidad-gray',
        className,
      )}
    >
      <span className="h-px w-8 bg-trinidad-gray/60" aria-hidden />
      {children}
    </span>
  );
}
