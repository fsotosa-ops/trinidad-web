import type {
  Founder,
  HomepageData,
  Product,
  SectionClosing,
  SectionHero,
  SectionPricing,
  SectionProblem,
  SectionProcess,
  SectionSolution,
  SectionTarget,
  Sprint,
} from '@/types/contentful';
import { contentfulFetch } from './fetch';
import { HOMEPAGE_QUERY } from './queries';

interface RawCollection<T> {
  items: T[];
}

interface RawHomepage {
  sectionHeroCollection: RawCollection<SectionHero>;
  sectionProblemCollection: RawCollection<SectionProblem>;
  sectionTargetCollection: RawCollection<SectionTarget>;
  sectionSolutionCollection: RawCollection<SectionSolution>;
  sectionProcessCollection: RawCollection<SectionProcess>;
  sectionPricingCollection: RawCollection<SectionPricing>;
  sectionClosingCollection: RawCollection<SectionClosing>;
}

const ARISTA_ORDER: Record<string, number> = {
  CMO: 0,
  CPO: 1,
  CTO: 2,
};

function aristaRank(titulo: string): number {
  const key = titulo.slice(0, 3).toUpperCase();
  return ARISTA_ORDER[key] ?? 99;
}

export async function getHomepage(): Promise<HomepageData> {
  const res = await contentfulFetch(HOMEPAGE_QUERY);
  const data = res?.data as RawHomepage | undefined;

  if (!data) {
    return {
      hero: null,
      problem: null,
      target: null,
      solution: null,
      process: null,
      pricing: null,
      closing: null,
    };
  }

  const solution = data.sectionSolutionCollection.items[0] ?? null;
  if (solution?.foundersCollection?.items) {
    solution.foundersCollection.items = [...solution.foundersCollection.items].sort(
      (a: Founder, b: Founder) => aristaRank(a.titulocanonico) - aristaRank(b.titulocanonico),
    );
  }

  const process = data.sectionProcessCollection.items[0] ?? null;
  if (process?.sprintsCollection?.items) {
    process.sprintsCollection.items = [...process.sprintsCollection.items].sort(
      (a: Sprint, b: Sprint) => a.numero - b.numero,
    );
  }

  const pricing = data.sectionPricingCollection.items[0] ?? null;
  if (pricing?.productosCollection?.items) {
    // Diagnostic ("3/60") goes first, then continuity products.
    pricing.productosCollection.items = [...pricing.productosCollection.items].sort(
      (a: Product, b: Product) => {
        const aIsDiag = /3\s*\/\s*60/.test(a.nombreEs) ? 0 : 1;
        const bIsDiag = /3\s*\/\s*60/.test(b.nombreEs) ? 0 : 1;
        return aIsDiag - bIsDiag;
      },
    );
  }

  return {
    hero: data.sectionHeroCollection.items[0] ?? null,
    problem: data.sectionProblemCollection.items[0] ?? null,
    target: data.sectionTargetCollection.items[0] ?? null,
    solution,
    process,
    pricing,
    closing: data.sectionClosingCollection.items[0] ?? null,
  };
}
