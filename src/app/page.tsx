// src/app/page.tsx
import { contentfulFetch } from '@/lib/contentful/fetch';
import { FULL_TEST_QUERY } from '@/lib/contentful/queries';

export default async function TestPage() {
  const { data } = await contentfulFetch(FULL_TEST_QUERY);

  if (!data) return <div className="p-10 text-red-500">Error: No hay datos. Revisa .env.local</div>;

  const solution = data.sectionSolutionCollection.items[0];
  const process = data.sectionProcessCollection.items[0];
  const pricing = data.sectionPricingCollection.items[0];

  return (
    <div className="p-10 font-sans bg-zinc-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-10 text-green-400">Panel de Validación Trinidad</h1>

      {/* VALIDACIÓN SECCIÓN 3: FOUNDERS */}
      <section className="mb-10 p-6 border border-zinc-700 rounded">
        <h2 className="text-xl font-bold mb-4">Sección Solución (Founders)</h2>
        <p className="mb-2">Título: {solution?.tituloH2Es}</p>
        <ul className="list-disc ml-5">
          {solution?.foundersCollection?.items.map((f: any) => (
            <li key={f.nombre}>{f.nombre} — <span className="text-zinc-400">{f.titulocanonico}</span></li>
          ))}
        </ul>
      </section>

      {/* VALIDACIÓN SECCIÓN 4: SPRINTS */}
      <section className="mb-10 p-6 border border-zinc-700 rounded">
        <h2 className="text-xl font-bold mb-4">Sección Proceso (Sprints)</h2>
        <p className="mb-2">Título: {process?.tituloH2Es}</p>
        <div className="grid grid-cols-2 gap-4">
          {process?.sprintsCollection?.items.map((s: any) => (
            <div key={s.numero} className="bg-zinc-800 p-3 rounded">
              <p className="font-bold">Sprint {s.numero}: {s.nombreEs}</p>
              <p className="text-xs text-zinc-400">Entregable: {s.entregableEs}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VALIDACIÓN SECCIÓN 6: PRODUCTOS */}
      <section className="mb-10 p-6 border border-zinc-700 rounded">
        <h2 className="text-xl font-bold mb-4">Sección Precios (Productos)</h2>
        <p className="mb-2">Título: {pricing?.tituloH2Es}</p>
        <ul className="list-disc ml-5">
          {pricing?.productosCollection?.items.map((p: any) => (
            <li key={p.nombreEs}>{p.nombreEs} — <span className="text-green-300">{p.precio}</span></li>
          ))}
        </ul>
      </section>
    </div>
  );
}