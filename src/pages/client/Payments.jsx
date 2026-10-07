import { useState } from 'react'
import { CreditCard, Wallet, Lock, CheckCircle2, ArrowUpRight, CircleDollarSign, ShieldCheck } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { SectionHeader, StatusBadge, StatCard, Modal, Field, Spinner, ProgressBar } from '../../components/ui.jsx'

export default function Payments() {
  const { payments, projects, checkout, toast } = useApp()
  const [open, setOpen] = useState(false)
  const [projectId, setProjectId] = useState(projects[0]?.id || '')
  const [method, setMethod] = useState('Visa •••• 4242')
  const [paying, setPaying] = useState(false)
  const [done, setDone] = useState(null)

  const totalPaid = payments.filter((p) => p.status !== 'Refunded').reduce((s, p) => s + p.amount, 0)
  const inEscrow = payments.filter((p) => p.status === 'Paid').reduce((s, p) => s + p.amount, 0)
  const pendingRelease = payments.filter((p) => p.status === 'Pending Release').reduce((s, p) => s + p.amount, 0)
  const released = payments.filter((p) => p.status === 'Released').reduce((s, p) => s + p.amount, 0)

  const project = projects.find((p) => p.id === projectId)
  const fee = project ? Math.round(project.budget * 0.1) : 0

  const pay = async () => {
    setPaying(true)
    await checkout({ projectTitle: project.title, amount: project.budget, method })
    setPaying(false)
    setDone({ amount: project.budget, project: project.title })
  }

  return (
    <div>
      <SectionHeader
        title="Payments"
        subtitle="Escrow funding, fees and release history for your projects."
        actions={<button className="btn-primary" onClick={() => { setDone(null); setOpen(true) }}><CreditCard size={15} /> Fund escrow</button>}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Wallet} label="Total Spent" value={`$${totalPaid.toLocaleString()}`} tone="brand" />
        <StatCard icon={Lock} label="In Escrow" value={`$${inEscrow.toLocaleString()}`} tone="amber" hint="held until approval" />
        <StatCard icon={ShieldCheck} label="Pending Release" value={`$${pendingRelease.toLocaleString()}`} tone="violet" hint="awaiting admin" />
        <StatCard icon={CircleDollarSign} label="Released to Developers" value={`$${released.toLocaleString()}`} tone="emerald" />
      </div>

      <div className="card p-5 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Payment history</h2>
          <StatusBadge tone="info">{payments.length} transactions</StatusBadge>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-200">
                <th className="py-3 pr-4">Project</th>
                <th className="py-3 pr-4">Developer</th>
                <th className="py-3 pr-4">Amount</th>
                <th className="py-3 pr-4">Fee</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50/60">
                  <td className="py-3.5 pr-4 font-medium text-slate-800">{p.project}</td>
                  <td className="py-3.5 pr-4 text-slate-600">{p.developer}</td>
                  <td className="py-3.5 pr-4 font-semibold text-slate-900">${p.amount.toLocaleString()}</td>
                  <td className="py-3.5 pr-4 text-slate-500">${Math.round(p.amount * 0.1).toLocaleString()}</td>
                  <td className="py-3.5 pr-4"><StatusBadge>{p.status}</StatusBadge></td>
                  <td className="py-3.5 pr-4 text-slate-500">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card p-5 mt-6 bg-slate-900 border-slate-800 text-white">
        <h2 className="font-semibold flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-400" /> How escrow works</h2>
        <div className="mt-4 grid sm:grid-cols-4 gap-3 text-sm">
          {[
            ['1. Fund', 'Client pays the project amount into escrow.'],
            ['2. Deliver', 'Developer completes milestones and submits work.'],
            ['3. Approve', 'Client approves; payment becomes Pending Release.'],
            ['4. Release', 'Admin verifies and funds are paid out.'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg bg-white/5 border border-white/10 p-3">
              <p className="font-semibold text-brand-300">{t}</p>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <ProgressBar value={65} tone="bg-brand-500" />
          <p className="text-xs text-slate-400 mt-1.5">65% of your escrowed value has completed the lifecycle</p>
        </div>
      </div>

      {/* Checkout modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={done ? 'Payment Successful' : 'Fund escrow'}
        size="max-w-md"
        footer={
          done ? (
            <button className="btn-primary" onClick={() => setOpen(false)}>Done</button>
          ) : (
            <>
              <button className="btn-secondary" onClick={() => setOpen(false)}>Cancel</button>
              <button className="btn-primary" onClick={pay} disabled={paying || !project}>
                {paying ? <Spinner size={15} /> : <Lock size={15} />} {paying ? 'Processing…' : project ? `Pay $${project.budget.toLocaleString()}` : 'Select a project'}
              </button>
            </>
          )
        }
      >
        {done ? (
          <div className="text-center py-6">
            <div className="mx-auto h-16 w-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckCircle2 size={32} /></div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">Payment Successful</h3>
            <p className="text-sm text-slate-500 mt-1">${done.amount.toLocaleString()} escrowed for {done.project}.</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400"><ArrowUpRight size={13} /> Project status updated to active</div>
          </div>
        ) : (
          <div className="space-y-4">
            <Field label="Project">
              <select className="input" value={projectId} onChange={(e) => setProjectId(e.target.value)}>
                {projects.filter((p) => !['completed'].includes(p.status)).map((p) => (
                  <option key={p.id} value={p.id}>{p.title} — ${p.budget.toLocaleString()}</option>
                ))}
              </select>
            </Field>
            <div className="space-y-2 text-sm rounded-xl border border-slate-200 p-4">
              <div className="flex justify-between"><span className="text-slate-500">Project Amount</span><span className="font-semibold">${project?.budget.toLocaleString() || '—'}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Platform Fee (10%)</span><span className="font-semibold">${fee.toLocaleString()}</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-base"><span className="font-semibold">Total</span><span className="font-bold text-brand-700">${project?.budget.toLocaleString() || '—'}</span></div>
            </div>
            <Field label="Payment Method" hint="Mock methods only — no gateway integration.">
              <select className="input" value={method} onChange={(e) => setMethod(e.target.value)}>
                <option>Visa •••• 4242</option>
                <option>Mastercard •••• 8891</option>
                <option>HBL Bank Transfer</option>
                <option>JazzCash Wallet</option>
              </select>
            </Field>
          </div>
        )}
      </Modal>
    </div>
  )
}
