// components/sections/pricing.tsx
import { clsx } from 'clsx';
import { Container } from '@/components/ui/container';
import { RichText } from '@/components/ui/rich-text';
import { Button } from '@/components/ui/button';
import type { Product, SectionPricing } from '@/types/contentful';

function isFlagship(product: Product): boolean {
  return /3\s*\/\s*60/.test(product.nombreEs);
}

// ✨ NUEVA FUNCIÓN MEJORADA ✨
function formatHito(text: string) {
  if (!text) return null;
  
  // 1. Auto-negrita automática para los montos (Ej: USD $4.000)
  let formatted = text.replace(/(USD\s*\$[\d.,]+)/g, '<strong>$1</strong>');
  
  // 2. Convierte **texto** o __texto__ en negrita manualmente
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/__(.*?)__/g, '<strong>$1</strong>');
  
  return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
}

function renderMainPrice(text: string) {
  if (!text) return null;
  const parts = text.split('/mes');
  if (parts.length > 1) {
    return (
      <>
        {parts[0]}
        <span className="text-[20px] font-light"> /mes</span>
      </>
    );
  }
  return text;
}

export function Pricing({ data }: { data: SectionPricing | null }) {
  if (!data) return null;
  const products = data.productosCollection?.items ?? [];
  
  const flagship = products.find(isFlagship);
  const continuity = products.filter(p => !isFlagship(p));

  return (
    <section id="precios" className="bg-trinidad-black text-white py-24 md:py-[100px]">
      <Container as="div" className="px-6 md:px-[48px]">
        
        {/* INTRO GRID */}
        <div className="grid md:grid-cols-[360px_1fr] gap-10 md:gap-[80px] items-start mb-16 md:mb-[64px]">
          <div>
            <div className="flex items-center gap-3 text-[11px] font-medium tracking-[0.15em] uppercase text-white/40 before:content-[''] before:block before:w-8 before:h-px before:bg-trinidad-terracota">
              {data.eyebrowPricingEs || 'Inversión'}
            </div>
            <h2 className="font-display font-medium text-[clamp(32px,4vw,52px)] leading-[1.1] tracking-[-0.02em] mt-5">
              {data.tituloH2Es}
            </h2>
          </div>
          <div></div>
        </div>

        {/* OFERTA IRRESISTIBLE */}
        <div className="bg-trinidad-terracota px-8 py-9 md:px-[44px] md:py-[36px] mb-12 md:mb-[48px] grid md:grid-cols-[1fr_auto] gap-10 md:gap-[40px] items-center">
          <div className="text-[16px] leading-[1.65] text-white/90 [&_strong]:text-white [&_strong]:font-medium">
            <RichText document={data.ofertaIrresistibleEs} tone="dark" />
          </div>
          <div className="md:text-right shrink-0">
            {data.precioRegularEs && (
              <div className="text-[14px] text-white/60 line-through mb-1">
                {data.precioRegularEs}
              </div>
            )}
            <div className="font-display text-[48px] font-medium text-white leading-none mt-1">
              {flagship?.precio ? renderMainPrice(flagship.precio) : '$12.000'}
            </div>
            {data.etiquetaOfertaEs && (
              <div className="text-[11px] text-white/60 tracking-[0.1em] uppercase mt-1">
                {data.etiquetaOfertaEs}
              </div>
            )}
          </div>
        </div>

        {/* PRODUCTOS GRID */}
        <div className="grid md:grid-cols-2 gap-[2px] bg-white/10">
          
          {/* PRODUCTO PRINCIPAL (3/60) */}
          {flagship && (
            <article className="p-8 md:p-[44px] bg-white/[0.07] flex flex-col h-full">
              <div className="text-[10px] font-medium tracking-[0.14em] uppercase text-trinidad-terracota mb-[6px]">
                3 / 60 · Producto principal
              </div>
              <h3 className="font-display text-[28px] font-medium leading-[1.1] mb-4">
                {flagship.nombreEs}
              </h3>
              <p className="text-[14px] leading-[1.65] text-white/55 mb-7">
                {flagship.descripcionEs}
              </p>
              <div className="font-display text-[42px] font-medium text-white leading-none mb-[6px]">
                {renderMainPrice(flagship.precio)}
              </div>
              <div className="text-[12px] text-white/40 tracking-[0.06em] mb-6">
                {flagship.disclaimerEs || 'Precio fijo · sin IVA'}
              </div>

              <div className="border-t border-white/10 pt-5 mb-7 flex-1">
                <div className="text-[10px] font-medium tracking-[0.12em] uppercase text-white/35 mb-3">
                  Hitos de pago
                </div>
                {(flagship.hitosPagoEs || '').split('\n').filter(Boolean).map((line, i) => (
                  <div key={i} className="text-[13px] text-white/60 leading-[1.5] py-[6px] border-b border-white/[0.06] last:border-none [&_strong]:text-white/85 [&_strong]:font-medium">
                    {formatHito(line.trim())}
                  </div>
                ))}
              </div>
              
              <Button href="#cierre" className="w-auto self-start bg-trinidad-terracota text-white hover:bg-trinidad-terracota/90 border-none px-[28px] py-[14px] text-[11px] tracking-[0.12em] uppercase font-medium rounded-none">
                Solicitar diagnóstico 30′
              </Button>
            </article>
          )}

          {/* CONTINUIDAD */}
          {continuity.map((prod, idx) => (
            <article key={idx} className="p-8 md:p-[44px] bg-white/[0.04] flex flex-col h-full">
              <div className="text-[10px] font-medium tracking-[0.14em] uppercase text-trinidad-terracota mb-[6px]">
                Continuidad
              </div>
              <h3 className="font-display text-[28px] font-medium leading-[1.1] mb-4">
                {prod.nombreEs}
              </h3>
              <p className="text-[14px] leading-[1.65] text-white/55 mb-7">
                {prod.descripcionEs}
              </p>
              <div className="font-display text-[42px] font-medium text-white leading-none mb-[6px]">
                {renderMainPrice(prod.precio)}
              </div>
              <div className="text-[12px] text-white/40 tracking-[0.06em] mb-6">
                {prod.disclaimerEs || 'Mínimo 3 meses · mensual adelantado'}
              </div>

              <div className="border-t border-white/10 pt-5 flex-1">
                <div className="text-[10px] font-medium tracking-[0.12em] uppercase text-white/35 mb-3">
                  Condiciones
                </div>
                {(prod.hitosPagoEs || '').split('\n').filter(Boolean).map((line, i) => (
                  <div key={i} className="text-[13px] text-white/60 leading-[1.5] py-[6px] border-b border-white/[0.06] last:border-none [&_strong]:text-white/85 [&_strong]:font-medium">
                    {formatHito(line.trim())}
                  </div>
                ))}
              </div>
              
              <div className="text-[12px] text-white/35 leading-[1.5] italic mt-5">
                El retainer no se vende sin 3/60 previo. Sin excepciones.
              </div>
            </article>
          ))}

        </div>
      </Container>
    </section>
  );
}