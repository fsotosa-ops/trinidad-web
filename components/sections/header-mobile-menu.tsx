'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { clsx } from 'clsx';

const NAV_LINKS = [
  { href: '#problema', label: 'Problema' },
  { href: '#solucion', label: 'Founders' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#precios', label: 'Precios' },
];

export function HeaderMobileMenu({ ctaLink }: { ctaLink?: string }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const href = ctaLink || "#cierre";

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

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  function close() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        className="flex h-10 w-10 items-center justify-center text-trinidad-black md:hidden"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="sr-only">Menu</span>
        <div className="relative h-4 w-6">
          <span
            className={clsx(
              'absolute left-0 top-0 block h-0.5 w-full bg-current transition-all duration-200',
              open ? 'top-2 rotate-45' : 'rotate-0',
            )}
          />
          <span
            className={clsx(
              'absolute left-0 top-2 block h-0.5 w-full bg-current transition-opacity duration-200',
              open ? 'opacity-0' : 'opacity-100',
            )}
          />
          <span
            className={clsx(
              'absolute left-0 top-4 block h-0.5 w-full bg-current transition-all duration-200',
              open ? 'top-2 -rotate-45' : 'rotate-0',
            )}
          />
        </div>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        aria-hidden={!open}
        className={clsx(
          'fixed inset-x-0 top-[4.5rem] z-30 origin-top border-b border-trinidad-line/60 bg-trinidad-cream shadow-sm transition-all duration-200 md:hidden',
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
              className="border-b border-trinidad-line/60 py-4 text-sm font-medium uppercase tracking-[0.18em] text-trinidad-black/80 transition-colors hover:text-trinidad-terracota"
            >
              {link.label}
            </a>
          ))}
          <a
            href={href}
            onClick={close}
            className="mt-6 inline-flex items-center justify-center border border-trinidad-black px-5 py-3 text-sm font-medium uppercase tracking-[0.08em] text-trinidad-black transition-colors hover:bg-trinidad-black hover:text-trinidad-cream focus:outline-none"
          >
            Solicitar diagnóstico
          </a>
        </nav>
      </div>
    </>
  );
}