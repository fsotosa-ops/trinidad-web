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

  return (
    <>
      <SiteHeader />
      <main>
        <Hero data={data.hero} />
        <Problem data={data.problem} />
        <Solution data={data.solution} />
        <Target data={data.target} />
        <Process data={data.process} />
        <Pricing data={data.pricing} />
        <Closing data={data.closing} />
      </main>
      <SiteFooter />
    </>
  );
}
