import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store, Gavel, Search, Send, Clock, DollarSign, Users, CheckCircle2 } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { ProjectCard } from '../../components/domain.jsx'
import { Modal, SectionHeader, Field, StatusBadge, EmptyState, Tabs, Avatar, Spinner } from '../../components/ui.jsx'

export default function Marketplace() {
  const { projects, bids, submitBid, auth, toast } = useApp()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [target, setTarget] = useState(null)
  const [price, setPrice] = useState('')
  const [delivery, setDelivery] = useState('2 weeks')
  const [proposal, setProposal] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(null)

  const myBids = bids.filter((b) => b.developerId === 'dev-1')
  const visible = projects.filter((p) => {
    const q = query.toLowerCase()
    const matchQ = p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.skills.join(' ').toLowerCase().includes(q)
    const matchF = filter === 'all' || (filter === 'open' && p.status === 'open') || (filter === 'mine' && myBids.some((b) => b.projectId === p.id))
    return matchQ && matchF
  })

  const openBid = (p) => {
    setTarget(p)
    setPrice(Math.round(p.budget * 0.85))
    setDelivery('3 weeks')
    setProposal(`I have strong experience with ${p.skills.slice(0, 3).join(', ')}. I can deliver "${p.title}" within ${p.delivery}, starting with the core architecture and shipping weekly demos.`)
    setDone(null)
  }

  const sendBid = async () => {
    setSending(true)
    await submitBid({
      projectId: target.id,
      developer: auth.user.name,
      developerId: 'dev-1',
      price: Number(price),
      delivery,
      proposal,
      rating: 4.9,
    })
    setSending(false)
    setDone(true)
  }

  return (
    <div>
      <SectionHeader
        title="Marketplace"
        subtitle="Browse open client projects and submit proposals."
        actions={<StatusBadge tone="info">{myBids.length} bids submitted</StatusBadge>}
      />

      <div className="card p-4 flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Search projects or skills…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Tabs
          active={filter}
          onChange={setFilter}
          tabs={[
            { id: 'all', label: 'All projects', count: projects.length },
            { id: 'open', label: 'Open', count: projects.filter((p) => p.status === 'open').length },
            { id: 'mine', label: 'I bid on', count: new Set(myBids.map((b) => b.projectId)).size },
          ]}
        />
      </div>

      {visible.length === 0 ? (
        <div className="card"><EmptyState icon={Store} title="No projects found" subtitle="Adjust your search or filters." /></div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {visible.map((p) => {
            const mine = myBids.find((b) => b.projectId === p.id)
            return (
              <ProjectCard
                key={p.id}
                project={p}
                bidCount={bids.filter((b) => b.projectId === p.id).length}
                onClick={() => openBid(p)}
                action={
                  mine ? (
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Your bid: <strong className="text-slate-800">${mine.price.toLocaleString()}</strong></span>
                      <StatusBadge tone={mine.status === 'accepted' ? 'success' : mine.status === 'rejected' ? 'danger' : 'warning'}>{mine.status}</StatusBadge>
                    </div>
                  ) : p.status !== 'open' ? (
                    <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400">Bidding closed — project in progress</div>
                  ) : null
                }
              />
            )
          })}
        </div>
      )}

      {/* Bid modal */}
      <Modal
        open={!!target}
        onClose={() => setTarget(null)}
        title={done ? 'Bid submitted' : `Submit a bid — ${target?.title || ''}`}
        footer={
          done ? (
            <>
              <button className="btn-secondary" onClick={() => { setTarget(null); navigate('/developer/bids') }}>View my bids</button>
              <button className="btn-primary" onClick={() => setTarget(null)}>Done</button>
            </>
          ) : (
            <>
              <button className="btn-secondary" onClick={() => setTarget(null)}>Cancel</button>
              <button className="btn-primary" onClick={sendBid} disabled={sending || !price || !proposal.trim()}>
                {sending ? <Spinner size={15} /> : <Send size={15} />} {sending ? 'Submitting…' : 'Submit Bid'}
              </button>
            </>
          )
        }
      >
        {done ? (
          <div className="text-center py-6">
            <div className="mx-auto h-14 w-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckCircle2 size={28} /></div>
            <h3 className="mt-4 font-semibold text-slate-900">Your bid was submitted successfully</h3>
            <p className="text-sm text-slate-500 mt-1">The client has been notified and can now review your proposal.</p>
            <div className="mt-5 grid grid-cols-3 gap-3 max-w-sm mx-auto text-sm">
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-slate-500 text-xs">Price</p><p className="font-bold">${Number(price).toLocaleString()}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-slate-500 text-xs">Delivery</p><p className="font-bold">{delivery}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-slate-500 text-xs">Status</p><p className="font-bold text-amber-600">Pending</p></div>
            </div>
          </div>
        ) : (
          target && (
            <div className="space-y-5">
              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{target.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{target.client} · {target.company}</p>
                  </div>
                  <span className="text-lg font-bold text-brand-700">${target.budget.toLocaleString()}</span>
                </div>
                <p className="text-sm text-slate-600 mt-2">{target.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {target.skills.map((s) => <span key={s} className="text-[11px] bg-white border border-slate-200 text-slate-600 rounded px-2 py-0.5">{s}</span>)}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Proposed Price ($)" required>
                  <div className="relative">
                    <DollarSign size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="number" className="input pl-8" value={price} onChange={(e) => setPrice(e.target.value)} />
                  </div>
                </Field>
                <Field label="Delivery Time" required>
                  <div className="relative">
                    <Clock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select className="input pl-8" value={delivery} onChange={(e) => setDelivery(e.target.value)}>
                      {['1 week', '2 weeks', '3 weeks', '4 weeks', '6 weeks', '8 weeks'].map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                </Field>
              </div>

              <Field label="Proposal" required hint="Explain your approach, relevant experience and why you are the right fit.">
                <textarea className="input min-h-[130px]" value={proposal} onChange={(e) => setProposal(e.target.value)} />
              </Field>

              <div className="flex items-center gap-3 rounded-lg bg-brand-50 border border-brand-200 p-3 text-sm text-brand-800">
                <Users size={16} />
                {bids.filter((b) => b.projectId === target.id).length} developers have already bid on this project.
              </div>
            </div>
          )
        )}
      </Modal>
    </div>
  )
}
