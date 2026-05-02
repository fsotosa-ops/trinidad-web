import { clsx } from 'clsx';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { RichText } from '@/components/ui/rich-text';
import { Button } from '@/components/ui/button';
import type { Product, SectionPricing } from '@/types/contentful';

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
      className="border-t border-trinidad-line/60 bg-trinidad-black text-trinidad-cream"
    >
      <Container as="div" className="py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow className="text-trinidad-cream/60">Inversión</Eyebrow>
            <h2 className="mt-6 font-medium leading-tight text-3xl md:text-5xl">
              {data.tituloH2Es}
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <RichText document={data.ofertaIrresistibleEs} tone="dark" className="text-lg" />
          </div>
        </div>

        {flagship && (
          <div className="mt-20 md:mt-24">
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
                'mt-6 grid gap-6',
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

function FlagshipCard({ product }: { product: Product }) {
  return (
    <article className="bg-trinidad-cream text-trinidad-black p-8 md:p-12">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <div className="flex items-center gap-3">
            <span className="bg-trinidad-terracota px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-trinidad-cream">
              3 / 60
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-trinidad-terracota">
              Producto principal
            </span>
          </div>
          <h3 className="mt-8 font-medium leading-[1.05] text-trinidad-black text-4xl md:text-6xl">
            {product.nombreEs}
          </h3>
          <p className="mt-8 max-w-prose text-base leading-relaxed text-trinidad-black/75 md:text-lg">
            {product.descripcionEs}
          </p>
        </div>

        <div className="md:col-span-5 md:border-l md:border-trinidad-line md:pl-12">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-trinidad-black/55">
            Inversión
          </p>
          <p className="mt-3 font-medium leading-none text-trinidad-terracota tabular-nums text-5xl md:text-7xl">
            {product.precio}
          </p>

          <div className="mt-10 border-t border-trinidad-line/80 pt-5">
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
    <article className="flex flex-col border border-trinidad-cream/15 p-6 md:p-8">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-trinidad-cream/55">
        Continuidad
      </p>
      <h3 className="mt-5 font-medium leading-snug text-trinidad-cream text-xl md:text-2xl">
        {product.nombreEs}
      </h3>
      <p className="mt-4 font-medium tabular-nums text-trinidad-cream text-2xl md:text-3xl">
        {product.precio}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-trinidad-cream/70">
        {product.descripcionEs}
      </p>
      <div className="mt-6 border-t border-trinidad-cream/15 pt-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-trinidad-cream/50">
          Hitos de pago
        </p>
        <p className="mt-1 text-sm text-trinidad-cream/80">{product.hitosPagoEs}</p>
      </div>
    </article>
  );
}
