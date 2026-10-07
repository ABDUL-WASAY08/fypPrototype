import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Briefcase, CheckCircle2, Flag, CreditCard, CircleDollarSign, Lock, ShieldCheck,
  PartyPopper, Clock, Users, ArrowRight, MessageSquare, Paperclip,
} from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { SectionHeader, StatusBadge, ProgressBar, EmptyState, Tabs, Modal, Field, Spinner, Avatar } from '../../components/ui.jsx'

const FLOW = [
  { key: 'pay', label: 'Client pays', icon: CreditCard },
  { key: 'paid', label: 'Payment successful', icon: CheckCircle2 },
  { key: 'active', label: 'Project active', icon: Briefcase },
  { key: 'submit', label: 'Developer completes', icon: Clock },
  { key: 'approve', label: 'Client approves', icon: ShieldCheck },
  { key: 'admin', label: 'Admin verification', icon: Users },
  { key: 'release', label: 'Payment released', icon: PartyPopper },
]

export default function ActiveProjects() {
  const { projects, payments, advanceProject, checkout, toast } = useApp()
  const active = projects.filter((p) => ['in-progress', 'submitted', 'approved', 'completed'].includes(p.status))
  const [selected, setSelected] = useState(active[0]?.id || null)
  const [tab, setTab] = useState('overview')
  const [payOpen, setPayOpen] = useState(false)
  const [method, setMethod] = useState('Visa •••• 4242')
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(null)
  const [issue, setIssue] = useState('')

  const project = projects.find((p) => p.id === selected) || active[0]
  const payment = project ? payments.find((p) => p.project === project.title) : null
  const isPaid = !!payment && ['Paid', 'Pending Release', 'Released'].includes(payment.status)
  const platformFee = project ? Math.round(project.budget * 0.1) : 0

  // step index in flow
  let stepIndex = 0
  if (project) {
    if (isPaid) stepIndex = 3
    if (project.status === 'submitted') stepIndex = 4
    if (project.status === 'approved') stepIndex = 5
    if (payment?.status === 'Released') stepIndex = 6
  }

  const runCheckout = async () => {
    setPaying(true)
    await checkout({ projectTitle: project.title, amount: project.budget, method })
    setPaying(false)
    setPaid({ amount: project.budget, ref: 'TOM-' + Math.random().toString(36).slice(2, 8).toUpperCase() })
  }

  if (active.length === 0) {
    return (
      <div>
        <SectionHeader title="Active Projects" subtitle="Workspaces with an accepted bid appear here." />
        <div className="card">
          <EmptyState icon={Briefcase} title="No active projects" subtitle="Accept a bid to start a project workspace." action={<Link to="/client/bids" className="btn-primary btn-sm">Review bids</Link>} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <SectionHeader title="Active Projects" subtitle="Track delivery, milestones, messages and the escrow payment lifecycle." />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Project list */}
        <div className="space-y-3">
          {active.map((p) => (
            <button
              key={p.id}
              onClick={() => { setSelected(p.id); setTab('overview'); setPaid(null) }}
              className={`w-full text-left card p-4 transition-all ${selected === p.id ? 'border-brand-400 ring-2 ring-brand-100' : 'hover:border-slate-300'}`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-900 truncate">{p.title}</p>
                <StatusBadge>{p.status}</StatusBadge>
              </div>
              <p className="text-xs text-slate-500 mt-1">{p.developer} · ${p.budget.toLocaleString()}</p>
              <div className="mt-2.5"><ProgressBar value={p.progress || 0} height="h-1.5" /></div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment flow */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title flex items-center gap-2"><CircleDollarSign size={17} className="text-brand-600" /> Payment workflow</h2>
              <StatusBadge tone={payment ? (payment.status === 'Released' ? 'success' : payment.status === 'Pending Release' ? 'warning' : 'info') : 'neutral'}>
                {payment?.status || 'Not funded'}
              </StatusBadge>
            </div>

            <div className="flex gap-1 overflow-x-auto scrollbar-thin pb-2">
              {FLOW.map((f, i) => {
                const done = i <= stepIndex
                const current = i === stepIndex
                return (
                  <div key={f.key} className="flex-1 min-w-[110px]">
                    <div className={`rounded-lg border p-2.5 text-center transition-all ${done ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-slate-50'}`}>
                      <f.icon size={15} className={`mx-auto ${done ? 'text-emerald-600' : 'text-slate-400'} ${current ? 'animate-pulse' : ''}`} />
                      <p className={`text-[11px] font-semibold mt-1.5 ${done ? 'text-emerald-800' : 'text-slate-400'}`}>{f.label}</p>
                    </div>
                    {i < FLOW.length - 1 && <div className={`h-2 flex justify-center ${done ? 'text-emerald-400' : 'text-slate-300'}`}>↓</div>}
                  </div>
                )
              })}
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mt-4 text-sm">
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Project amount</p><p className="font-bold text-slate-900">${project.budget.toLocaleString()}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Platform fee (10%)</p><p className="font-bold text-slate-900">${platformFee.toLocaleString()}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Total</p><p className="font-bold text-brand-700">${project.budget.toLocaleString()}</p></div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {!isPaid && (
                <button className="btn-primary" onClick={() => { setPaid(null); setPayOpen(true) }}><CreditCard size={15} /> Pay Project Amount</button>
              )}
              {project.status === 'submitted' && (
                <button className="btn-success" onClick={() => advanceProject(project.id, 'approve')}><CheckCircle2 size={15} /> Approve Project</button>
              )}
              {project.status === 'in-progress' && isPaid && (
                <button className="btn-secondary" onClick={() => advanceProject(project.id, 'issue')}><Flag size={15} /> Raise Issue</button>
              )}
              {payment?.status === 'Pending Release' && <StatusBadge tone="warning">Awaiting admin verification</StatusBadge>}
              {payment?.status === 'Released' && <StatusBadge tone="success">Payment Released</StatusBadge>}
            </div>
          </div>

          {/* Detail card */}
          <div className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{project.title}</h2>
                <p className="text-sm text-slate-500 mt-0.5">{project.description}</p>
              </div>
              <StatusBadge>{project.status}</StatusBadge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-sm">
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Client</p><p className="font-semibold mt-0.5">{project.client}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Developer</p><p className="font-semibold mt-0.5">{project.developer}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Budget</p><p className="font-semibold mt-0.5">${project.budget.toLocaleString()}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Deadline</p><p className="font-semibold mt-0.5">{project.delivery}</p></div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1.5"><span className="text-slate-600">Progress</span><span className="font-semibold">{project.progress || 0}%</span></div>
              <ProgressBar value={project.progress || 0} />
            </div>
          </div>

          <Tabs
            tabs={[
              { id: 'overview', label: 'Milestones' },
              { id: 'messages', label: 'Messages', count: 2 },
              { id: 'files', label: 'Files', count: 3 },
            ]}
            active={tab}
            onChange={setTab}
          />

          {tab === 'overview' && (
            <div className="card p-5 animate-fade-in">
              <div className="space-y-3">
                {(project.milestones || []).map((m, i) => (
                  <div key={m.name} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200">
                    <span className={`h-7 w-7 rounded-full text-xs font-bold flex items-center justify-center ${m.done ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>{m.done ? '✓' : i + 1}</span>
                    <span className={`text-sm font-medium ${m.done ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{m.name}</span>
                    <StatusBadge className="ml-auto" tone={m.done ? 'success' : 'neutral'}>{m.done ? 'Done' : 'Pending'}</StatusBadge>
                  </div>
                ))}
                {(project.milestones || []).length === 0 && <p className="text-sm text-slate-500">No milestones defined for this project yet.</p>}
              </div>
            </div>
          )}

          {tab === 'messages' && (
            <div className="card p-5 animate-fade-in">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <Avatar initials={project.developer.split(' ').map((s) => s[0]).join('')} color="bg-indigo-600" size="h-9 w-9" text="text-xs" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{project.developer}</p>
                  <p className="text-xs text-slate-500">Developer</p>
                </div>
                <span className="ml-auto flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><MessageSquare size={12} /> 2</span>
                  <span className="flex items-center gap-1"><Paperclip size={12} /> 3</span>
                </span>
              </div>
              <div className="space-y-3 mt-4">
                <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-2.5 text-sm text-slate-800">
                  Milestone 1 is complete — staging build is ready for your review.
                  <span className="block text-[10px] text-slate-400 mt-1">10:22</span>
                </div>
                <div className="max-w-[75%] ml-auto rounded-2xl rounded-tr-sm bg-brand-600 px-4 py-2.5 text-sm text-white">
                  Looks great! The export flow works. Keep going 🚀
                  <span className="block text-[10px] text-brand-200 mt-1">10:31</span>
                </div>
              </div>
            </div>
          )}

          {tab === 'files' && (
            <div className="card p-5 animate-fade-in space-y-2">
              {[
                { name: 'requirements-v2.pdf', size: '1.2 MB', by: 'You' },
                { name: 'staging-build-01.zip', size: '18.6 MB', by: project.developer },
                { name: 'api-spec.yaml', size: '42 KB', by: project.developer },
              ].map((f) => (
                <div key={f.name} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200">
                  <Paperclip size={16} className="text-slate-400" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800 truncate">{f.name}</p>
                    <p className="text-xs text-slate-500">{f.size} · {f.by}</p>
                  </div>
                  <button className="btn-secondary btn-sm" onClick={() => toast('Download started (mock)')}>Download</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Checkout modal */}
      <Modal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        title={paid ? 'Payment Successful' : 'Fund escrow'}
        size="max-w-md"
        footer={
          paid ? (
            <>
              <Link to="/client/active" className="btn-secondary" onClick={() => setPayOpen(false)}>Close</Link>
              <button className="btn-primary" onClick={() => setPayOpen(false)}>Project is now active</button>
            </>
          ) : (
            <>
              <button className="btn-secondary" onClick={() => setPayOpen(false)}>Cancel</button>
              <button className="btn-primary" onClick={runCheckout} disabled={paying}>
                {paying ? <Spinner size={15} /> : <Lock size={15} />} {paying ? 'Processing…' : `Pay $${project.budget.toLocaleString()}`}
              </button>
            </>
          )
        }
      >
        {paid ? (
          <div className="text-center py-6">
            <div className="mx-auto h-16 w-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckCircle2 size={32} /></div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">Payment Successful</h3>
            <p className="text-sm text-slate-500 mt-1">${paid.amount.toLocaleString()} locked in escrow for {project.title}.</p>
            <div className="mt-5 rounded-lg bg-slate-50 border border-slate-200 p-4 text-sm space-y-1.5 text-left">
              <div className="flex justify-between"><span className="text-slate-500">Reference</span><span className="font-mono font-semibold">{paid.ref}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Method</span><span className="font-semibold">{method}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Status</span><StatusBadge tone="info">Paid</StatusBadge></div>
            </div>
            <p className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-1.5"><ShieldCheck size={13} /> Funds are released only after approval and admin verification.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
              <p className="text-sm font-semibold text-slate-900">{project.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{project.developer} · escrow funding</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Project Amount</span><span className="font-semibold">${project.budget.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Platform Fee (10%)</span><span className="font-semibold">${platformFee.toLocaleString()}</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-base"><span className="font-semibold">Total</span><span className="font-bold text-brand-700">${project.budget.toLocaleString()}</span></div>
            </div>
            <Field label="Payment Method" hint="Mock payment methods — no real gateway is used.">
              <select className="input" value={method} onChange={(e) => setMethod(e.target.value)}>
                <option>Visa •••• 4242</option>
                <option>Mastercard •••• 8891</option>
                <option>HBL Bank Transfer</option>
                <option>JazzCash Wallet</option>
              </select>
            </Field>
            <p className="text-xs text-slate-400 flex items-center gap-1.5"><Lock size={12} /> 256-bit encrypted · prototype simulation</p>
          </div>
        )}
      </Modal>
    </div>
  )
}
