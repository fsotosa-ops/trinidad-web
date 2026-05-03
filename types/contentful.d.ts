import type { Document } from '@contentful/rich-text-types';

export type RichText = { json: Document };

export interface ContentfulAsset {
  url: string;
  width: number;
  height: number;
  title: string | null;
  description: string | null;
}

export interface Pillar {
  etiquetaEs: string;
  descripcionEs: string;
  orden: number;
}

export interface Founder {
  nombre: string;
  titulocanonico: string;
  aristaEs: string;
  descripcionEs: string;
}

export interface Product {
  nombreEs: string;
  precio: string;
  descripcionEs: string;
  hitosPagoEs: string;
}

export interface Sprint {
  numero: number;
  nombreEs: string;
  objetivoEs: string;
  entregableEs: string;
  dias: string;
}
export interface FeatureCard {
  categoria: string;
  descripcion: string;
}

export interface SectionHero {
  etiquetaSuperiorEs: string;
  tituloRichEs: RichText;
  subtituloEs: string;
  ctaPrincipalEs: string;
  ctaSecundarioEs: string;
  tarjetasLateralesCollection?: { 
    items: { categoria: string; descripcion: string; }[] 
  } | null;
}

export interface SectionProblem {
  tituloH2Es: string;
  cuerpoEs: RichText;
}

export interface SectionTarget {
  tituloH2Es: string;
  verticalesEs: string;
  encajaSiEs: RichText;
  noEncajaSiEs: RichText;
}

export interface SectionSolution {
  tituloH2Es: string;
  cuerpoEs: RichText;
  frameworkImage?: ContentfulAsset | null;
  foundersCollection: { items: Founder[] };
}

export interface SectionProcess {
  tituloH2Es: string;
  introEs: string;
  cierreEs: RichText;
  sprintsCollection: { items: Sprint[] };
}

export interface SectionPricing {
  tituloH2Es: string;
  ofertaIrresistibleEs: RichText;
  productosCollection: { items: Product[] };
}

export interface SectionClosing {
  tituloH2Es: string;
  ctaTextoEs: string;
  cuerpoEs: RichText;
}

export interface HomepageData {
  hero: SectionHero | null;
  problem: SectionProblem | null;
  target: SectionTarget | null;
  solution: SectionSolution | null;
  process: SectionProcess | null;
  pricing: SectionPricing | null;
  closing: SectionClosing | null;
}
