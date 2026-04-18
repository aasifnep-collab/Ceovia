import { bioactiveMatrixLine, bioactives, omegas } from '@/data/clinicalInsight'

export default function BioactiveIntelligence() {
  return (
    <section id="bioactives" className="section-white scroll-mt-32">
      <div className="section-wrapper py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="font-[family-name:var(--font-sans)] text-label-md uppercase tracking-[0.1em] text-himalayan-green">
            Bioactive Intelligence
          </p>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-display-lg leading-tight text-deep-green">
            The Omega System and the broader matrix
          </h2>
          <p className="mt-5 max-w-3xl font-[family-name:var(--font-sans)] text-body-lg text-text-muted">
            CEOVIA is positioned around a full-spectrum lipid and phytonutrient profile. Its value lies not in a single hero compound, but in the coordinated relevance of the matrix.
          </p>

          <div className="mt-12 overflow-hidden rounded-2xl border border-himalayan-green/12 shadow-[0_1px_0_rgba(45,106,79,0.04)]">
            <table className="hidden w-full md:table">
              <caption className="sr-only">Omega system reference</caption>
              <thead className="bg-deep-green text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left font-[family-name:var(--font-sans)] text-sm font-medium">Omega</th>
                  <th scope="col" className="px-6 py-4 text-left font-[family-name:var(--font-sans)] text-sm font-medium">Concentration</th>
                  <th scope="col" className="px-6 py-4 text-left font-[family-name:var(--font-sans)] text-sm font-medium">Primary Clinical Role</th>
                </tr>
              </thead>
              <tbody>
                {omegas.map((row, index) => (
                    <tr key={row.name} className={index % 2 === 0 ? 'bg-clinical-white/70' : 'bg-white'}>
                    <th scope="row" className="px-6 py-5 font-[family-name:var(--font-sans)] text-sm font-medium text-deep-green">{row.name}</th>
                    <td className="px-6 py-5 font-[family-name:var(--font-sans)] text-sm text-text-dark">{row.concentration}</td>
                    <td className="px-6 py-5 font-[family-name:var(--font-sans)] text-sm text-text-muted">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="space-y-4 p-4 md:hidden">
              {omegas.map((row) => (
                <article key={row.name} className="rounded-xl border border-himalayan-green/10 bg-white p-5 shadow-[0_1px_0_rgba(45,106,79,0.03)]">
                  <h3 className="font-[family-name:var(--font-display)] text-display-sm text-deep-green">{row.name}</h3>
                  <p className="mt-2 font-[family-name:var(--font-sans)] text-label-sm uppercase tracking-[0.1em] text-himalayan-green">{row.concentration}</p>
                  <p className="mt-3 font-[family-name:var(--font-sans)] text-body-md text-text-muted">{row.role}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-2xl bg-himalayan-green/8 px-6 py-5 md:px-8">
            <p className="font-[family-name:var(--font-sans)] text-body-md text-deep-green">
              {bioactiveMatrixLine}
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-himalayan-green/12 shadow-[0_1px_0_rgba(45,106,79,0.04)]">
            <table className="hidden w-full md:table">
              <caption className="sr-only">Bioactive matrix reference</caption>
              <thead className="bg-deep-green text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left font-[family-name:var(--font-sans)] text-sm font-medium">Bioactive</th>
                  <th scope="col" className="px-6 py-4 text-left font-[family-name:var(--font-sans)] text-sm font-medium">Category</th>
                  <th scope="col" className="px-6 py-4 text-left font-[family-name:var(--font-sans)] text-sm font-medium">Clinical Role</th>
                </tr>
              </thead>
              <tbody>
                {bioactives.map((row, index) => (
                    <tr key={row.compound} className={index % 2 === 0 ? 'bg-clinical-white/70' : 'bg-white'}>
                    <th scope="row" className="px-6 py-5 font-[family-name:var(--font-sans)] text-sm font-medium text-deep-green">{row.compound}</th>
                    <td className="px-6 py-5">
                      <span className="inline-flex rounded-full bg-himalayan-green/10 px-3 py-1 font-[family-name:var(--font-sans)] text-xs uppercase tracking-[0.08em] text-himalayan-green">
                        {row.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-[family-name:var(--font-sans)] text-sm text-text-muted">{row.clinicalRole}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="space-y-4 p-4 md:hidden">
              {bioactives.map((row) => (
                <article key={row.compound} className="rounded-xl border border-himalayan-green/10 bg-white p-5 shadow-[0_1px_0_rgba(45,106,79,0.03)]">
                  <h3 className="font-[family-name:var(--font-display)] text-[1.4rem] leading-tight text-deep-green">{row.compound}</h3>
                  <span className="mt-3 inline-flex rounded-full bg-himalayan-green/10 px-3 py-1 font-[family-name:var(--font-sans)] text-xs uppercase tracking-[0.08em] text-himalayan-green">
                    {row.category}
                  </span>
                  <p className="mt-4 font-[family-name:var(--font-sans)] text-body-md text-text-muted">{row.clinicalRole}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
