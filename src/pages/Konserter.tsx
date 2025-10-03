import BandsintownWidget from "../components/BandsintownWidget";

export default function Konserter() {
  return (
    <section className="container-page py-10 md:py-14">
      <header className="mb-8 md:mb-10">
        <h1 className="text-center mb-6 text-3xl md:text-5xl font-bold tracking-tight">
          KONSERTER
        </h1>
        <p className="mt-2 text-center">
          Følg med på kommende datoer. Billetter slippes fortløpende.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <BandsintownWidget />
        </div>

        <aside className="space-y-4 self-start">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <h2 className="text-lg font-semibold">Praktisk info</h2>
            <ul className="mt-3 space-y-1">
              <li>• Det blir fest</li>
              <li>• God stemning</li>
              <li>• Masse musikk</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <h3 className="font-semibold">Få varsel</h3>
            <p>Følg oss på sosiale medier for billettslipp og oppdateringer.</p>
            <div className="mt-3 flex gap-3">
              <a className="btn">Instagram</a>
              <a className="btn">Facebook</a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
