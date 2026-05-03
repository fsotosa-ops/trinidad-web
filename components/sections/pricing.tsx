import { clsx } from 'clsx';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { RichText } from '@/components/ui/rich-text';
import { Button } from '@/components/ui/button';
import type { Product, SectionPricing } from '@/types/contentful';

// Strikethrough reference price for the oferta block.
// TODO(felipe): move to a precioRegular Symbol field on sectionPricing in Contentful.
const PRECIO_REGULAR = 'USD $25.000–$35.000/mes';
const OFERTA_LABEL = '60 días · 3 roles';

function isFlagship(product: Product): boolean {
  return /3\s*\/\s*60/.test(product.nombreEs);
}

export function Pricing({ data }: { data: SectionPricing | null }) {
  if (!data) return null;
  const products = data.productosCollection?.items ?? [];
  const [first, ...rest] = products;
  const flagship = first && isFlagship(first) ? first : null;
  const continuity = flagship ? rest : products;

  return (
    <section
      id="precios"
      aria-labelledby="precios-heading"
      className="border-t border-trinidad-line/60 bg-trinidad-black text-trinidad-cream"
    >
      <Container as="div" className="py-24 md:py-32">
        <div className="max-w-3xl">
          <Eyebrow className="text-trinidad-cream/60">Inversión</Eyebrow>
          <h2
            id="precios-heading"
            className="mt-6 font-display font-medium leading-tight tracking-[-0.02em] text-[clamp(2rem,4vw,3.25rem)]"
          >
            {data.tituloH2Es}
          </h2>
        </div>

        <OfertaBlock
          document={data.ofertaIrresistibleEs}
          precio={flagship?.precio ?? 'USD $12.000'}
        />

        {flagship && (
          <div className="mt-12 md:mt-16">
            <FlagshipCard product={flagship} />
          </div>
        )}

        {continuity.length > 0 && (
          <div className="mt-10 md:mt-14">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-trinidad-cream/50">
              Continuidad <span className="text-trinidad-cream/30">·</span> servicios complementarios
            </p>
            <div
              className={clsx(
                'mt-6 grid gap-px bg-trinidad-cream/15',
                continuity.length === 1 && 'md:grid-cols-1',
                continuity.length === 2 && 'md:grid-cols-2',
                continuity.length >= 3 && 'md:grid-cols-3',
              )}
            >
              {continuity.map((product) => (
                <ContinuityCard key={product.nombreEs} product={product} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

function OfertaBlock({
  document,
  precio,
}: {
  document: SectionPricing['ofertaIrresistibleEs'];
  precio: string;
}) {
  return (
    <div className="mt-14 grid gap-8 bg-trinidad-terracota p-8 md:mt-16 md:grid-cols-[1fr_auto] md:items-center md:gap-12 md:p-11">
      <RichText document={document} tone="terra" className="text-base leading-relaxed md:text-[17px]" />
      <div className="text-left md:text-right">
        <p className="text-sm text-trinidad-cream/60 line-through">{PRECIO_REGULAR}</p>
        <p className="mt-1 font-display font-medium leading-none text-trinidad-cream tabular-nums text-4xl md:text-5xl">
          {precio}
        </p>
        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-trinidad-cream/70">
          {OFERTA_LABEL}
        </p>
      </div>
    </div>
  );
}

function FlagshipCard({ product }: { product: Product }) {
  return (
    <article className="relative bg-trinidad-cream text-trinidad-black">
      <div className="h-px w-full bg-trinidad-terracota" aria-hidden />
      <div className="grid gap-10 p-8 md:grid-cols-12 md:gap-12 md:p-12">
        <div className="md:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="border border-trinidad-terracota px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-trinidad-terracota">
              3 / 60
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-trinidad-terracota">
              Producto principal
            </span>
          </div>
          <h3 className="mt-8 font-display font-medium leading-tight tracking-[-0.02em] text-trinidad-black text-3xl sm:text-4xl md:text-5xl">
            {product.nombreEs}
          </h3>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-trinidad-black/75 md:text-lg">
            {product.descripcionEs}
          </p>
        </div>

        <div className="md:col-span-5 md:border-l md:border-trinidad-line md:pl-12">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-trinidad-black/55">
            Inversión
          </p>
          <p className="mt-3 font-display font-medium leading-none tracking-[-0.02em] text-trinidad-terracota tabular-nums text-4xl sm:text-5xl md:text-6xl">
            {product.precio}
          </p>

          <div className="mt-10 border-t border-trinidad-line pt-5">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-trinidad-black/55">
              Hitos de pago
            </p>
            <p className="mt-2 text-sm leading-relaxed text-trinidad-black/85">
              {product.hitosPagoEs}
            </p>
          </div>

          <div className="mt-10">
            <Button href="#cierre">Solicitar diagnóstico 30′</Button>
          </div>
        </div>
      </div>
    </article>
  );
}

function ContinuityCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col bg-trinidad-black p-7 md:p-8">
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-trinidad-cream/55">
        Continuidad
      </p>
      <h3 className="mt-5 font-display font-medium leading-snug tracking-[-0.01em] text-trinidad-cream text-xl md:text-2xl">
        {product.nombreEs}
      </h3>
      <p className="mt-4 font-display font-medium tabular-nums text-trinidad-terracota text-2xl md:text-3xl">
        {product.precio}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-trinidad-cream/70">
        {product.descripcionEs}
      </p>
      <div className="mt-6 border-t border-trinidad-cream/15 pt-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-trinidad-cream/50">
          Hitos de pago
        </p>
        <p className="mt-1 text-sm text-trinidad-cream/80">{product.hitosPagoEs}</p>
      </div>
    </article>
  );
}
