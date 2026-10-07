import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusCircle, CheckCircle2, Rocket, Sparkles } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { SectionHeader, Field, StatusBadge, Spinner, ProgressBar } from '../../components/ui.jsx'

const SKILL_OPTIONS = ['React', 'Node.js', 'Express', 'MongoDB', 'Python', 'FastAPI', 'PostgreSQL', 'TypeScript', 'Tailwind CSS', 'Docker', 'AI', 'DevOps', 'GitHub API', 'Redis']

export default function CreateProject() {
  const { addProject, toast } = useApp()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
    skills: ['React', 'Node.js'],
    budget: '',
    delivery: '4 weeks',
    requirements: '',
    deliverables: '',
    company: 'Bright Labs',
    client: 'Nadia Hussain',
  })

  const toggleSkill = (s) =>
    setForm((f) => ({ ...f, skills: f.skills.includes(s) ? f.skills.filter((x) => x !== s) : [...f.skills, s] }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim() || !form.budget) {
      toast('Please fill in title, description and budget', 'error')
      return
    }
    setSaving(true)
    await addProject({
      title: form.title,
      description: form.description,
      skills: form.skills.length ? form.skills : ['General'],
      budget: Number(form.budget),
      delivery: form.delivery,
      requirements: form.requirements || 'Standard marketplace delivery agreement.',
      deliverables: form.deliverables ? form.deliverables.split('\n').filter(Boolean) : ['Source code', 'Documentation'],
      client: form.client,
      company: form.company,
      clientId: 'cli-1',
    })
    setSaving(false)
    setDone(form.title)
  }

  if (done) {
    return (
      <div>
        <SectionHeader title="Create Project" subtitle="Publish a project to the marketplace." />
        <div className="card p-10 text-center max-w-xl mx-auto animate-fade-in">
          <div className="mx-auto h-16 w-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckCircle2 size={32} /></div>
          <h2 className="mt-5 text-xl font-bold text-slate-900">Project published successfully</h2>
          <p className="text-sm text-slate-500 mt-2">
            “{done}” is now live. Developers with matching skills have been notified and can start submitting bids.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button className="btn-primary" onClick={() => navigate('/client/projects')}>View my projects</button>
            <button className="btn-secondary" onClick={() => { setDone(null); setForm({ ...form, title: '', description: '', budget: '', requirements: '', deliverables: '' }) }}>
              Create another
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <SectionHeader
        title="Create Project"
        subtitle="Describe the work, set your budget and receive proposals from verified developers."
        actions={<StatusBadge tone="info">Step 1 of 1</StatusBadge>}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <form onSubmit={submit} className="lg:col-span-2 card p-6 space-y-5">
          <Field label="Project Title" required>
            <input className="input" placeholder="e.g. AI Code Review Assistant" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>

          <Field label="Description" required hint="What should be built and why?">
            <textarea className="input min-h-[120px]" placeholder="Describe the project, its goals and the problem it solves…" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>

          <div>
            <label className="label">Required Skills <span className="text-rose-500">*</span></label>
            <div className="flex flex-wrap gap-2">
              {SKILL_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSkill(s)}
                  className={`text-xs font-semibold rounded-full px-3 py-1.5 ring-1 ring-inset transition-colors ${
                    form.skills.includes(s) ? 'bg-brand-600 text-white ring-brand-600' : 'bg-white text-slate-600 ring-slate-200 hover:ring-brand-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-1.5">{form.skills.length} skills selected</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Budget (USD)" required>
              <input type="number" className="input" placeholder="4500" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
            </Field>
            <Field label="Expected Delivery" required>
              <select className="input" value={form.delivery} onChange={(e) => setForm({ ...form, delivery: e.target.value })}>
                {['1 week', '2 weeks', '3 weeks', '4 weeks', '6 weeks', '8 weeks', '12 weeks'].map((d) => <option key={d}>{d}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Project Requirements" hint="Technical constraints, integrations, compliance notes.">
            <textarea className="input min-h-[100px]" placeholder={'REST API with JWT auth\nGitHub OAuth integration\nResponsive dashboard'} value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} />
          </Field>

          <Field label="Deliverables" hint="One deliverable per line.">
            <textarea className="input min-h-[100px]" placeholder={'Source repository\nDeployment guide\nAdmin dashboard\nTest suite'} value={form.deliverables} onChange={(e) => setForm({ ...form, deliverables: e.target.value })} />
          </Field>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-400">A 10% platform fee applies on release.</p>
            <button type="submit" className="btn-primary px-6" disabled={saving}>
              {saving ? <Spinner size={15} /> : <Rocket size={15} />} {saving ? 'Publishing…' : 'Publish Project'}
            </button>
          </div>
        </form>

        {/* Preview / tips */}
        <div className="space-y-6">
          <div className="card p-5">
            <h3 className="section-title flex items-center gap-2"><PlusCircle size={16} className="text-brand-600" /> Live preview</h3>
            <div className="mt-4 rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <StatusBadge tone="info">Open</StatusBadge>
                <span className="text-lg font-bold text-brand-700">{form.budget ? `$${Number(form.budget).toLocaleString()}` : '$—'}</span>
              </div>
              <h4 className="font-semibold text-slate-900 mt-3">{form.title || 'Your project title'}</h4>
              <p className="text-sm text-slate-500 mt-1 line-clamp-3">{form.description || 'Your project description will appear here.'}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {form.skills.slice(0, 5).map((s) => <span key={s} className="text-[11px] bg-slate-100 text-slate-600 rounded px-2 py-0.5">{s}</span>)}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">Nadia Hussain · Bright Labs · {form.delivery}</div>
            </div>
          </div>

          <div className="card p-5 bg-brand-50 border-brand-200">
            <h3 className="font-semibold text-brand-900 flex items-center gap-2"><Sparkles size={16} /> Tips for a great listing</h3>
            <ul className="mt-3 space-y-2 text-sm text-brand-800">
              <li>• Include measurable acceptance criteria.</li>
              <li>• List exact technologies to attract matched bids.</li>
              <li>• Set a realistic budget — average bid is 85–95% of listing.</li>
              <li>• Add deliverables so scope is unambiguous.</li>
            </ul>
            <div className="mt-4">
              <ProgressBar value={Math.min(100, (form.title ? 25 : 0) + (form.description ? 25 : 0) + (form.budget ? 25 : 0) + (form.deliverables ? 25 : 0))} tone="bg-brand-600" />
              <p className="text-xs text-brand-700 mt-1.5">Listing completeness</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
