import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, KeyRound, Timer, Layers3, BellRing, Database, Server, MonitorSmartphone } from 'lucide-react'
import PublicLayout from '../components/layout/PublicLayout.jsx'
import { architectureLayers, crossCutting, ragSteps } from '../data/mockData.js'

export default function Architecture() {
  return (
    <PublicLayout>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 py-14">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">System design</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">Architecture & Infrastructure</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            A layered architecture with a queue-backed background processing tier. The prototype mocks every external
            system behind the same interfaces.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 py-12 grid lg:grid-cols-3 gap-8">
        {/* Stack diagram */}
        <div className="lg:col-span-2">
          <h2 className="section-title mb-5">Request path</h2>
          <div className="space-y-3">
            {architectureLayers.map((l, i) => (
              <div key={l.title}>
                <div className={`rounded-xl border p-4 flex items-start gap-4 ${l.tone}`}>
                  <span className="h-8 w-8 rounded-lg bg-white/70 border border-current/20 flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{l.title}</p>
                    <p className="text-sm opacity-80 mt-0.5">{l.desc}</p>
                  </div>
                  <span className="ml-auto hidden sm:flex items-center gap-1.5 text-[11px] font-semibold opacity-70">
                    {i === 0 || i === 1 ? <MonitorSmartphone size={13} /> : i === 2 ? <Server size={13} /> : <Database size={13} />}
                    {i === 0 ? 'client' : i < 3 ? 'edge' : i < 5 ? 'server' : 'external'}
                  </span>
                </div>
                {i < architectureLayers.length - 1 && (
                  <div className="flex justify-center py-1 text-slate-300 text-xs">▼</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-6">
          <div className="card p-5">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2"><Layers3 size={16} className="text-brand-600" /> Cross-cutting concerns</h3>
            <div className="mt-4 space-y-3">
              {[
                { icon: KeyRound, ...crossCutting[0] },
                { icon: ShieldCheck, ...crossCutting[1] },
                { icon: Timer, ...crossCutting[2] },
                { icon: Database, ...crossCutting[3] },
                { icon: BellRing, ...crossCutting[4] },
              ].map((c) => (
                <div key={c.title} className="flex gap-3">
                  <span className="h-8 w-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    <c.icon size={15} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{c.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-slate-900">RAG pipeline</h3>
            <ol className="mt-3 space-y-2">
              {ragSteps.map((s, i) => (
                <li key={s.key} className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="h-5 w-5 rounded bg-brand-50 text-brand-700 text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                  {s.label}
                  <span className="text-xs text-slate-400 ml-auto">{s.hint}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="card p-5 bg-brand-600 border-brand-600 text-white">
            <p className="text-sm font-semibold">Prototype note</p>
            <p className="text-xs text-brand-100 mt-1.5 leading-relaxed">
              MongoDB, Redis, GitHub API, LLM and payment gateway are mocked in <code>src/services</code> with identical
              signatures, so switching to production requires no UI changes.
            </p>
            <Link to="/about" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white">
              Read requirements <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
