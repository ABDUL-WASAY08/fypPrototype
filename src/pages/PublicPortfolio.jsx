import { Link, useParams } from 'react-router-dom'
import { Github, Linkedin, Globe, Mail, Star, MapPin, Share2, Check, ArrowLeft, Sparkles, Download } from 'lucide-react'
import { useState } from 'react'
import { developers } from '../data/mockData.js'
import { useApp } from '../context/AppContext.jsx'
import { Avatar, StatusBadge, EmptyState, ProgressBar } from '../components/ui.jsx'

export default function PublicPortfolio() {
  const { slug } = useParams()
  const { repos, toast } = useApp()
  const [copied, setCopied] = useState(false)
  const dev = developers.find((d) => d.slug === slug)

  if (!dev) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-5">
        <div className="card p-10 text-center max-w-md">
          <EmptyState icon={Github} title="Portfolio not found" subtitle="This developer has not published a portfolio yet." />
          <Link to="/" className="btn-primary mt-4"><ArrowLeft size={15} /> Back to home</Link>
        </div>
      </div>
    )
  }

  const isPrimary = dev.slug === 'ali-khan'
  const projects = isPrimary ? repos.filter((r) => r.portfolio) : repos.filter((r) => r.portfolio).slice(0, 3)

  const share = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {})
    setCopied(true)
    toast('Portfolio link copied')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-700">
            <span className="h-7 w-7 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-xs">T</span>
            <span className="hidden sm:inline">TOM Portfolio</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <button className="btn-secondary btn-sm" onClick={share}>{copied ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />} Share Portfolio</button>
            <Link to="/login/client" className="btn-primary btn-sm">Hire {dev.name.split(' ')[0]}</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-5 py-14">
          <div className="flex flex-wrap items-center gap-6">
            <Avatar initials={dev.avatar} color={dev.color} size="h-24 w-24" text="text-3xl" />
            <div className="min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold tracking-tight">{dev.name}</h1>
                {dev.aiBadge && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-brand-600/30 text-brand-200 ring-1 ring-brand-400/40 rounded-full px-2.5 py-1">
                    <Sparkles size={12} /> AI Code Assistance
                  </span>
                )}
                <StatusBadge tone="success">Available for hire</StatusBadge>
              </div>
              <p className="text-slate-300 mt-1.5">{dev.title} · {dev.experience} experience · <span className="inline-flex items-center gap-1"><MapPin size={12} /> {dev.location}</span></p>
              <p className="text-slate-400 mt-3 max-w-2xl leading-relaxed">{dev.bio}</p>
              <div className="flex flex-wrap items-center gap-5 mt-4 text-sm text-slate-300">
                <span className="flex items-center gap-1.5"><Mail size={14} /> {dev.email}</span>
                <span className="flex items-center gap-1.5"><Github size={14} /> {dev.github}</span>
                <span className="flex items-center gap-1.5"><Linkedin size={14} /> {dev.linkedin}</span>
                <span className="flex items-center gap-1.5"><Globe size={14} /> {dev.website}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 max-w-3xl">
            {[
              ['Rating', `${dev.rating}/5.0`],
              ['Completed projects', dev.completedProjects],
              ['Portfolio views', dev.portfolioViews.toLocaleString()],
              ['Hourly rate', `$${dev.hourlyRate}`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-2xl font-bold">{v}</p>
                <p className="text-xs text-slate-400 mt-0.5">{k}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-5 py-12 grid lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="section-title">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-3">
              {dev.skills.map((s) => (
                <span key={s} className="text-xs font-semibold bg-brand-50 text-brand-700 ring-1 ring-brand-200 rounded-full px-3 py-1">{s}</span>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="section-title">Education</h2>
            <div className="mt-3 space-y-3">
              {dev.education.map((e) => (
                <div key={e.degree} className="rounded-lg border border-slate-200 p-3">
                  <p className="text-sm font-semibold text-slate-900">{e.degree}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{e.school} · {e.year}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="section-title flex items-center gap-2"><Star size={16} className="text-amber-500" /> Rating breakdown</h2>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">{dev.rating}</p>
            <div className="mt-3 space-y-2">
              {[['Quality of work', 96], ['Communication', 94], ['On-time delivery', 91]].map(([l, v]) => (
                <div key={l}>
                  <div className="flex justify-between text-xs text-slate-500 mb-1"><span>{l}</span><span>{v}%</span></div>
                  <ProgressBar value={v} tone="bg-amber-400" height="h-1.5" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Selected Projects</h2>
              <StatusBadge tone="purple">{projects.length} repositories</StatusBadge>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {projects.map((r) => (
                <div key={r.id} className="card p-5 hover:shadow-pop transition-shadow">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="h-9 w-9 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0">{r.name.slice(0, 2).toUpperCase()}</span>
                      <p className="font-semibold text-slate-900 truncate">{r.name}</p>
                    </div>
                    <StatusBadge tone="success">Active</StatusBadge>
                  </div>
                  <p className="text-sm text-slate-600 mt-3 line-clamp-2">{r.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <span className="text-[11px] font-medium bg-slate-100 text-slate-600 rounded px-2 py-0.5">{r.language}</span>
                    <span className="text-[11px] font-medium bg-slate-100 text-slate-600 rounded px-2 py-0.5">★ {r.stars}</span>
                    <span className="text-[11px] font-medium bg-slate-100 text-slate-600 rounded px-2 py-0.5">⑂ {r.forks}</span>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-xs font-semibold text-brand-700 inline-flex items-center gap-1"><Github size={12} /> GitHub</a>
                    {r.analyzed && <span className="text-[11px] text-slate-400">Quality {r.quality}%</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Experience</h2>
            <div className="card p-6 space-y-5">
              {[
                { role: 'Senior Full Stack Developer', org: 'Nova Digital Studio', period: '2022 — Present', desc: 'Leading delivery of SaaS platforms with React, Node.js and AWS for international clients.' },
                { role: 'Full Stack Developer', org: 'CodeCraft Solutions', period: '2020 — 2022', desc: 'Built REST APIs, admin dashboards and CI pipelines across e-commerce and fintech.' },
                { role: 'Frontend Developer (Intern)', org: 'Pixelforge', period: '2019 — 2020', desc: 'Delivered responsive marketing sites and contributed to the internal component library.' },
              ].map((e) => (
                <div key={e.role} className="flex gap-4">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-brand-500 shrink-0" />
                  <div className="border-l border-slate-200 pl-4">
                    <p className="text-sm font-semibold text-slate-900">{e.role}</p>
                    <p className="text-xs text-slate-500">{e.org} · {e.period}</p>
                    <p className="text-sm text-slate-600 mt-1">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-6 flex flex-wrap items-center justify-between gap-4 bg-brand-600 border-brand-600 text-white">
            <div>
              <h2 className="text-lg font-bold">Want {dev.name.split(' ')[0]} on your project?</h2>
              <p className="text-sm text-brand-100 mt-1">Invite them directly or post a project and let them bid.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/login/client" className="btn bg-white text-brand-700 hover:bg-brand-50"><Mail size={15} /> Contact</Link>
              <Link to="/login/client" className="btn border border-white/40 hover:bg-white/10">Invite to Project</Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-5 py-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
          <p>© 2026 TOM — Train Optimal Model. Public portfolio.</p>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-brand-700">About</Link>
            <Link to="/login/developer" className="hover:text-brand-700">Developer login</Link>
            <button onClick={share} className="hover:text-brand-700 inline-flex items-center gap-1"><Download size={13} /> Copy link</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
