import { useState } from 'react'
import { CreditCard, Search, CheckCircle2, RotateCcw, ShieldCheck, Wallet, Download } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { SectionHeader, StatusBadge, EmptyState, Tabs, Modal, StatCard, Spinner } from '../../components/ui.jsx'

export default function AdminPayments() {
  const { payments, releasePayment, toast } = useApp()
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')
  const [confirm, setConfirm] = useState(null)
  const [busy, setBusy] = useState(false)

  const filtered = payments.filter((p) => {
    const matchTab = tab === 'all' || p.status.toLowerCase().replace(' ', '') === tab.replace(' ', '')
    const matchQ = p.project.toLowerCase().includes(query.toLowerCase()) || p.client.toLowerCase().includes(query.toLowerCase()) || p.developer.toLowerCase().includes(query.toLowerCase())
    return matchTab && matchQ
  })

  const doRelease = async () => {
    setBusy(true)
    await releasePayment(confirm.id)
    setBusy(false)
    setConfirm(null)
  }

  const pending = payments.filter((p) => p.status === 'Pending Release')
  const released = payments.filter((p) => p.status === 'Released')
  const paid = payments.filter((p) => p.status === 'Paid')

  return (
    <div>
      <SectionHeader
        title="Payments"
        subtitle="Verify escrowed payments and release funds to developers."
        actions={<button className="btn-secondary" onClick={() => toast('Payment report exported (mock)')}><Download size={15} /> Export</button>}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Wallet} label="Total volume" value={`$${payments.reduce((s, p) => s + p.amount, 0).toLocaleString()}`} tone="brand" />
        <StatCard icon={CreditCard} label="Paid (in escrow)" value={paid.length} tone="info" hint={`$${paid.reduce((s, p) => s + p.amount, 0).toLocaleString()}`} />
        <StatCard icon={ShieldCheck} label="Pending Release" value={pending.length} tone="amber" hint={`$${pending.reduce((s, p) => s + p.amount, 0).toLocaleString()}`} />
        <StatCard icon={CheckCircle2} label="Released" value={released.length} tone="emerald" hint={`$${released.reduce((s, p) => s + p.amount, 0).toLocaleString()}`} />
      </div>

      <div className="card p-4 flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Search by project, client or developer…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { id: 'all', label: 'All', count: payments.length },
            { id: 'pendingrelease', label: 'Pending Release', count: pending.length },
            { id: 'paid', label: 'Paid', count: paid.length },
            { id: 'released', label: 'Released', count: released.length },
            { id: 'refunded', label: 'Refunded', count: payments.filter((p) => p.status === 'Refunded').length },
          ]}
        />
      </div>

      <div className="card overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState icon={CreditCard} title="No payments found" subtitle="Adjust your search or filters." />
        ) : (
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-200">
                  <th className="py-3 px-5">Project</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Developer</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50/60">
                    <td className="py-3.5 px-5 font-medium text-slate-800">{p.project}</td>
                    <td className="py-3.5 px-4 text-slate-600">{p.client}</td>
                    <td className="py-3.5 px-4 text-slate-600">{p.developer}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">${p.amount.toLocaleString()}</td>
                    <td className="py-3.5 px-4"><StatusBadge>{p.status}</StatusBadge></td>
                    <td className="py-3.5 px-4 text-slate-500">{p.date}</td>
                    <td className="py-3.5 px-4 text-right">
                      {p.status === 'Pending Release' ? (
                        <button className="btn-success btn-sm" onClick={() => setConfirm(p)}><CheckCircle2 size={13} /> Release Payment</button>
                      ) : p.status === 'Paid' ? (
                        <span className="text-xs text-slate-400">awaiting approval</span>
                      ) : (
                        <span className="text-xs text-slate-400">settled</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-6 card p-4 flex items-start gap-3 text-sm text-slate-600">
        <RotateCcw size={16} className="text-slate-400 mt-0.5" />
        <p>Refunds are issued automatically when a complaint is resolved in favour of the client. Open the Complaints portal to process a dispute.</p>
      </div>

      <Modal
        open={!!confirm}
        onClose={() => setConfirm(null)}
        title="Release payment"
        size="max-w-md"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setConfirm(null)}>Cancel</button>
            <button className="btn-success" onClick={doRelease} disabled={busy}>
              {busy ? <Spinner size={15} /> : <CheckCircle2 size={15} />} {busy ? 'Releasing…' : 'Release Payment'}
            </button>
          </>
        }
      >
        {confirm && (
          <div className="space-y-4 text-sm">
            <p className="text-slate-600">
              Confirm that <strong>{confirm.developer}</strong> has delivered the work for <strong>{confirm.project}</strong>. Funds will be transferred immediately.
            </p>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 space-y-2">
              <div className="flex justify-between"><span className="text-slate-500">Amount</span><span className="font-semibold">${confirm.amount.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Platform fee (10%)</span><span className="font-semibold">${Math.round(confirm.amount * 0.1).toLocaleString()}</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-2"><span className="font-semibold">Developer receives</span><span className="font-bold text-emerald-700">${Math.round(confirm.amount * 0.9).toLocaleString()}</span></div>
            </div>
            <p className="text-xs text-slate-400">This action is logged in system activity and cannot be undone.</p>
          </div>
        )}
      </Modal>
    </div>
  )
}
