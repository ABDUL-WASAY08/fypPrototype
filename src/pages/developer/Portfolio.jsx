import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Share2, Check, Github, Linkedin, Globe, Mail, Eye, ExternalLink, Star, Pencil } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { developers } from '../../data/mockData.js'
import { SectionHeader, StatusBadge, Avatar, Modal, Field, ProgressBar, EmptyState } from '../../components/ui.jsx'

const dev = developers[0]

export default function Portfolio() {
  const { repos, profile, setProfile, toast } = useApp()
  const [copied, setCopied] = useState(false)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(profile)

  const selected = repos.filter((r) => r.portfolio)
  const portfolioUrl = `${window.location.origin}/portfolio/${dev.slug}`

  const share = () => {
    navigator.clipboard?.writeText(portfolioUrl).catch(() => {})
    setCopied(true)
    toast('Portfolio link copied')
    setTimeout(() => setCopied(false), 2200)
  }

  const save = () => {
    setProfile(form)
    setEditing(false)
    toast('Portfolio profile updated')
  }

  return (
    <div>
      <SectionHeader
        title="Developer Portfolio"
        subtitle="Only repositories marked for the portfolio appear on your public page."
        actions={
          <>
            <button className="btn-secondary" onClick={() => { setForm(profile); setEditing(true) }}><Pencil size={15} /> Edit profile</button>
            <button className="btn-primary" onClick={share}>{copied ? <Check size={15} /> : <Share2 size={15} />} Share Portfolio</button>
          </>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="space-y-6">
          <div className="card p-6 text-center">
            <Avatar initials={dev.avatar} color={dev.color} size="h-20 w-20" text="text-2xl" />
            <h2 className="mt-4 text-xl font-bold text-slate-900">{profile.name}</h2>
            <p className="text-sm text-slate-500">{dev.title} · {dev.location}</p>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">{profile.bio}</p>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-slate-50 p-2.5">
                <p className="text-lg font-bold text-slate-900">{dev.rating}</p>
                <p className="text-[11px] text-slate-500">Rating</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5">
                <p className="text-lg font-bold text-slate-900">{dev.completedProjects}</p>
                <p className="text-[11px] text-slate-500">Projects</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5">
                <p className="text-lg font-bold text-slate-900">{dev.portfolioViews.toLocaleString()}</p>
                <p className="text-[11px] text-slate-500">Views</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm text-left">
              <p className="flex items-center gap-2 text-slate-600"><Mail size={14} className="text-slate-400" /> {profile.email}</p>
              <p className="flex items-center gap-2 text-slate-600"><Github size={14} className="text-slate-400" /> {dev.github}</p>
              <p className="flex items-center gap-2 text-slate-600"><Linkedin size={14} className="text-slate-400" /> {dev.linkedin}</p>
              <p className="flex items-center gap-2 text-slate-600"><Globe size={14} className="text-slate-400" /> {dev.website}</p>
            </div>

            <div className="mt-5 rounded-lg bg-slate-50 border border-dashed border-slate-300 p-3">
              <p className="text-[11px] text-slate-500 font-mono break-all">{portfolioUrl}</p>
            </div>
            <Link to={`/portfolio/${dev.slug}`} className="btn-secondary w-full mt-3"><Eye size={15} /> Preview public page</Link>
          </div>

          <div className="card p-6">
            <h3 className="section-title">Skills</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {dev.skills.map((s) => (
                <span key={s} className="text-xs font-semibold bg-brand-50 text-brand-700 ring-1 ring-brand-200 rounded-full px-3 py-1">{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Selected repositories */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="section-title flex items-center gap-2"><Briefcase size={17} className="text-brand-600" /> Selected Projects</h3>
              <StatusBadge tone="purple">{selected.length} selected</StatusBadge>
            </div>

            {selected.length === 0 ? (
              <EmptyState
                icon={Briefcase}
                title="No repositories selected"
                subtitle="Mark repositories for your portfolio from the Repositories page."
                action={<Link to="/developer/repositories" className="btn-primary btn-sm">Open repositories</Link>}
              />
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {selected.map((r) => (
                  <div key={r.id} className="rounded-xl border border-slate-200 p-4 hover:border-brand-300 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="h-8 w-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0">{r.name.slice(0, 2).toUpperCase()}</span>
                        <p className="font-semibold text-slate-900 truncate">{r.name}</p>
                      </div>
                      <StatusBadge tone={r.analyzed ? 'success' : 'neutral'}>{r.analyzed ? 'Analyzed' : 'Draft'}</StatusBadge>
                    </div>
                    <p className="text-sm text-slate-600 mt-2 line-clamp-2">{r.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className={`text-[11px] font-medium bg-slate-100 text-slate-600 rounded px-2 py-0.5`}>{r.language}</span>
                      <span className="text-[11px] font-medium bg-slate-100 text-slate-600 rounded px-2 py-0.5">{r.stars} stars</span>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <a href="#" onClick={(e) => e.preventDefault()} className="text-xs font-semibold text-brand-700 inline-flex items-center gap-1"><Github size={12} /> GitHub <ExternalLink size={10} /></a>
                      <StatusBadge tone="success">Active</StatusBadge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Experience */}
          <div className="card p-6">
            <h3 className="section-title">Experience</h3>
            <div className="mt-4 space-y-4">
              {[
                { role: 'Senior Full Stack Developer', org: 'Nova Digital Studio', period: '2022 — Present', desc: 'Leading a team of 5 building SaaS platforms with React, Node.js and AWS. Shipped 12 client projects.' },
                { role: 'Full Stack Developer', org: 'CodeCraft Solutions', period: '2020 — 2022', desc: 'Built REST APIs, admin dashboards and CI pipelines for e-commerce and fintech clients.' },
                { role: 'Frontend Developer (Intern)', org: 'Pixelforge', period: '2019 — 2020', desc: 'Developed responsive marketing sites and internal component libraries.' },
              ].map((e) => (
                <div key={e.role} className="flex gap-4">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-500 shrink-0" />
                  <div className="border-l border-slate-200 pl-4 pb-1">
                    <p className="text-sm font-semibold text-slate-900">{e.role}</p>
                    <p className="text-xs text-slate-500">{e.org} · {e.period}</p>
                    <p className="text-sm text-slate-600 mt-1">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education + rating */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="section-title">Education</h3>
              <div className="mt-4 space-y-3">
                {dev.education.map((e) => (
                  <div key={e.degree} className="rounded-lg border border-slate-200 p-3">
                    <p className="text-sm font-semibold text-slate-900">{e.degree}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{e.school} · {e.year}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <h3 className="section-title flex items-center gap-2"><Star size={16} className="text-amber-500" /> Client rating</h3>
              <p className="text-4xl font-extrabold text-slate-900 mt-2">{dev.rating}<span className="text-base text-slate-400 font-medium">/5.0</span></p>
              <div className="mt-3 space-y-2">
                {[['5 stars', 82], ['4 stars', 14], ['3 stars', 4]].map(([l, v]) => (
                  <div key={l}>
                    <div className="flex justify-between text-xs text-slate-500 mb-1"><span>{l}</span><span>{v}%</span></div>
                    <ProgressBar value={v} tone="bg-amber-400" height="h-1.5" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit modal */}
      <Modal open={editing} onClose={() => setEditing(false)} title="Edit portfolio profile"
        footer={<><button className="btn-secondary" onClick={() => setEditing(false)}>Cancel</button><button className="btn-primary" onClick={save}>Save changes</button></>}>
        <div className="space-y-4">
          <Field label="Name"><input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label="Email"><input className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
          <Field label="Bio" hint="Shown on your public portfolio page.">
            <textarea className="input min-h-[110px]" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          </Field>
        </div>
      </Modal>
    </div>
  )
}
