'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { clsx } from 'clsx';

const NAV_LINKS = [
  { href: '#problema', label: 'Problema' },
  { href: '#solucion', label: 'Founders' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#precios', label: 'Precios' },
];

export function HeaderMobileMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);

    const focusable = panelRef.current?.querySelectorAll<HTMLElement>('a, button');
    focusable?.[0]?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center text-trinidad-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trinidad-terracota md:hidden"
      >
        <span className="relative block h-3 w-6" aria-hidden>
          <span
            className={clsx(
              'absolute left-0 top-0 h-px w-full bg-current transition-transform duration-200',
              open && 'translate-y-[5px] rotate-45',
            )}
          />
          <span
            className={clsx(
              'absolute left-0 bottom-0 h-px w-full bg-current transition-transform duration-200',
              open && '-translate-y-[6px] -rotate-45',
            )}
          />
        </span>
      </button>

      <div
        id={panelId}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={clsx(
          'fixed inset-x-0 top-[var(--header-h,4rem)] z-30 origin-top border-b border-trinidad-line/60 bg-trinidad-cream shadow-sm transition-all duration-200 md:hidden',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0',
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className="border-b border-trinidad-line/60 py-4 text-sm font-medium uppercase tracking-[0.18em] text-trinidad-black/80 transition-colors hover:text-trinidad-terracota focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trinidad-terracota"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cierre"
            onClick={close}
            className="mt-6 inline-flex items-center justify-center border border-trinidad-black px-5 py-3 text-sm font-medium uppercase tracking-[0.08em] text-trinidad-black transition-colors hover:bg-trinidad-black hover:text-trinidad-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trinidad-terracota"
          >
            Diagnóstico 30′
          </a>
        </nav>
      </div>
    </>
  );
}
