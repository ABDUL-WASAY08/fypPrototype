import { Link } from 'react-router-dom'
import {
  Github, ArrowRight, Sparkles, ScanSearch, Wand2, FileText, BookOpen, UserRound, Store,
  GitBranch, MessageSquareText, Rocket, CheckCircle2, Star, ChevronRight, Layers,
} from 'lucide-react'
import { features, platformStats, developers, initialProjects } from '../data/mockData.js'
import { RagFlow } from '../components/domain.jsx'
import { StatusBadge, Avatar } from '../components/ui.jsx'

const ICONS = { Github, ScanSearch, Wand2, FileText, BookOpen, UserRound, Store, Sparkles }

const steps = [
  { icon: Github, title: 'Connect GitHub', desc: 'Link your account and pick the repositories you want TOM to understand.' },
  { icon: ScanSearch, title: 'Analyze Repository', desc: 'Quality, security and maintainability scores across every file.' },
  { icon: MessageSquareText, title: 'Ask AI', desc: 'RAG-grounded answers about your own codebase, with citations.' },
  { icon: Wand2, title: 'Improve & Document', desc: 'Before/after code improvements, README and full documentation.' },
  { icon: UserRound, title: 'Build Portfolio', desc: 'Select your best repositories and publish a shareable portfolio.' },
  { icon: Store, title: 'Connect with Clients', desc: 'Bid on projects, deliver work and get paid through escrow.' },
]

export default function Landing() {
  return (
    <div className="bg-white text-slate-800">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="h-8 w-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold">T</span>
            <span className="font-bold text-slate-900 tracking-tight">TOM</span>
            <span className="hidden sm:inline text-xs text-slate-400 border-l border-slate-200 pl-2.5">Train Optimal Model</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link to="/about" className="hover:text-brand-700">About</Link>
            <Link to="/architecture" className="hover:text-brand-700">Architecture</Link>
            <a href="#features" className="hover:text-brand-700">Features</a>
            <a href="#how" className="hover:text-brand-700">How it works</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/login/developer" className="btn-ghost btn-sm hidden sm:inline-flex">Developer login</Link>
            <Link to="/login/client" className="btn-secondary btn-sm hidden sm:inline-flex">Client login</Link>
            <Link to="/login/developer" className="btn-primary btn-sm">Get Started <ArrowRight size={14} /></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.12),transparent_55%)]" />
        <div className="max-w-7xl mx-auto px-5 pt-20 pb-16 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold bg-brand-50 text-brand-700 ring-1 ring-brand-200 rounded-full px-3 py-1.5">
              <Sparkles size={13} /> AI-powered developer platform
            </span>
            <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.05]">
              TOM — Train <span className="text-brand-600">Optimal</span> Model
            </h1>
            <p className="mt-5 text-xl text-slate-600 font-medium">
              AI-powered repository intelligence and a developer marketplace.
            </p>
            <p className="mt-3 text-slate-500 text-lg leading-relaxed">
              Understand your codebase, improve your projects, build your portfolio, and connect with clients.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/login/developer" className="btn-primary px-6 py-3 text-base">
                Get Started <ArrowRight size={17} />
              </Link>
              <Link to="/login/client" className="btn-secondary px-6 py-3 text-base">
                Explore Developers <Store size={17} />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
              {platformStats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-5">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">Platform features</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 tracking-tight">Everything a developer needs, in one platform</h2>
            <p className="mt-3 text-slate-500">From repository intelligence to getting paid — TOM covers the full developer workflow.</p>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => {
              const Icon = ICONS[f.icon] || Sparkles
              return (
                <div key={f.title} className="card p-5 hover:shadow-pop transition-shadow">
                  <div className="h-10 w-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                    <Icon size={19} />
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-900">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
            <Link to="/about" className="card p-5 hover:shadow-pop transition-shadow flex flex-col justify-between border-dashed">
              <div className="h-10 w-10 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                <Layers size={19} />
              </div>
              <div>
                <h3 className="mt-4 font-semibold text-slate-900">Full requirements overview</h3>
                <p className="mt-1.5 text-sm text-slate-500">Functional & non-functional requirements documented in the About page.</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">Read more <ChevronRight size={14} /></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">How it works</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 tracking-tight">Six steps from codebase to client delivery</h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <div key={s.title} className="card p-6 relative">
                <span className="absolute top-5 right-5 text-3xl font-extrabold text-slate-100">{String(i + 1).padStart(2, '0')}</span>
                <div className="h-10 w-10 rounded-lg bg-brand-600 text-white flex items-center justify-center">
                  <s.icon size={18} />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RAG section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold text-brand-400 uppercase tracking-wide">Core AI concept</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Retrieval-Augmented Generation, explained visually</h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              TOM never guesses. Your repository is filtered, chunked and embedded, then every question triggers a vector
              search that retrieves the most relevant code before the LLM drafts an answer with citations.
            </p>
            <ul className="mt-6 space-y-3">
              {['Repository-aware answers with file-level citations', 'Scores for quality, security and maintainability', 'Improvement suggestions mapped to exact lines'].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" /> {t}
                </li>
              ))}
            </ul>
            <Link to="/login/developer" className="btn-primary mt-8 px-5 py-3">
              Try the AI Assistant <ArrowRight size={16} />
            </Link>
          </div>
          <div className="[&_button]:bg-slate-800 [&_button]:border-slate-700 [&_span]:text-slate-300 [&_.text-slate-900]:text-white">
            <RagFlow />
          </div>
        </div>
      </section>

      {/* Marketplace preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">Developer marketplace</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 tracking-tight">Hire vetted, AI-augmented developers</h2>
              <p className="mt-3 text-slate-500">Browse portfolios, compare ratings and invite developers straight to your project.</p>
            </div>
            <Link to="/login/client" className="btn-secondary">Explore Developers <ArrowRight size={15} /></Link>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {developers.slice(0, 3).map((d) => (
              <div key={d.id} className="card p-5">
                <div className="flex items-center gap-3">
                  <Avatar initials={d.avatar} color={d.color} size="h-11 w-11" />
                  <div>
                    <p className="font-semibold text-slate-900">{d.name}</p>
                    <p className="text-xs text-slate-500">{d.title} · {d.experience}</p>
                  </div>
                  <span className="ml-auto flex items-center gap-1 text-sm font-semibold text-amber-600">
                    <Star size={13} className="fill-amber-400 text-amber-400" /> {d.rating}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {d.skills.slice(0, 4).map((s) => (
                    <span key={s} className="text-[11px] font-medium bg-slate-100 text-slate-600 rounded px-2 py-0.5">{s}</span>
                  ))}
                </div>
                <p className="text-sm text-slate-500 mt-3">{d.completedProjects} completed projects · {d.portfolioViews.toLocaleString()} portfolio views</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-5">
            {initialProjects.slice(0, 3).map((p) => (
              <div key={p.id} className="card p-5">
                <div className="flex items-center justify-between">
                  <StatusBadge tone={p.status === 'open' ? 'info' : 'purple'}>{p.status === 'open' ? 'Open' : 'In Progress'}</StatusBadge>
                  <span className="font-bold text-brand-700">${p.budget.toLocaleString()}</span>
                </div>
                <h3 className="mt-3 font-semibold text-slate-900">{p.title}</h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-600">
        <div className="max-w-4xl mx-auto px-5 text-center text-white">
          <Rocket size={30} className="mx-auto opacity-90" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight">Ready to train your optimal workflow?</h2>
          <p className="mt-3 text-brand-100">Sign in as a developer, client or admin and walk through the complete platform.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/login/developer" className="btn bg-white text-brand-700 hover:bg-brand-50 px-6 py-3">Developer Login</Link>
            <Link to="/login/client" className="btn border border-white/40 text-white hover:bg-white/10 px-6 py-3">Client Login</Link>
            <Link to="/login/admin" className="btn border border-white/40 text-white hover:bg-white/10 px-6 py-3">Admin Login</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-8 w-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-sm">T</span>
              <span className="font-bold text-white">TOM</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed">TOM — Train Optimal Model. AI-powered repository intelligence and a developer marketplace.</p>
          </div>
          <div>
            <p className="text-white font-semibold text-sm mb-3">Product</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><Link to="/architecture" className="hover:text-white">Architecture</Link></li>
              <li><Link to="/about" className="hover:text-white">Requirements</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold text-sm mb-3">Portals</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login/developer" className="hover:text-white">Developer</Link></li>
              <li><Link to="/login/client" className="hover:text-white">Client</Link></li>
              <li><Link to="/login/admin" className="hover:text-white">Admin</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold text-sm mb-3">Legal</p>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white cursor-default">Privacy Policy</span></li>
              <li><span className="hover:text-white cursor-default">Terms of Service</span></li>
              <li><span className="hover:text-white cursor-default">© 2026 TOM</span></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
