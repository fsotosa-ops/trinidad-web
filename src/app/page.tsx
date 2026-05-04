// src/app/page.tsx
import { getHomepage } from '@/lib/contentful/homepage';
import { SiteHeader } from '@/components/sections/header';
import { SiteFooter } from '@/components/sections/footer';
import { Hero } from '@/components/sections/hero';
import { Problem } from '@/components/sections/problem';
import { Target } from '@/components/sections/target';
import { Solution } from '@/components/sections/solution';
import { Process } from '@/components/sections/process';
import { Pricing } from '@/components/sections/pricing';
import { Closing } from '@/components/sections/closing';

export default async function HomePage() {
  const data = await getHomepage();

  if (!data) {
    return <div>Error loading content</div>;
  }

  // Extraemos el link global del Hero
  const globalCtaUrl = data.hero?.ctaUrlEs || "mailto:hola@trinidad.consulting";

  return (
    <>
      <SiteHeader ctaLink={globalCtaUrl} />
      <main>
        <Hero data={data.hero} />
        <Problem data={data.problem} />
        <Solution data={data.solution} />
        <Target data={data.target} />
        <Process data={data.process} />
        <Pricing data={data.pricing} />
        <Closing data={data.closing} />
      </main>
      <SiteFooter ctaLink={globalCtaUrl} />
    </>
  );
}