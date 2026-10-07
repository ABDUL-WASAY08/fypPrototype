import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Gavel, CheckCircle2, XCircle, Eye, Star, Clock, DollarSign, PartyPopper, ExternalLink } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { SectionHeader, StatusBadge, Modal, EmptyState, Avatar, Tabs, Spinner, Field } from '../../components/ui.jsx'
import { developers } from '../../data/mockData.js'

export default function ClientBids() {
  const { bids, projects, acceptBid, rejectBid, toast } = useApp()
  const [tab, setTab] = useState('pending')
  const [confirm, setConfirm] = useState(null)
  const [rejecting, setRejecting] = useState(null)
  const [reason, setReason] = useState('')
  const [busy, setBusy] = useState(false)
  const [portfolio, setPortfolio] = useState(null)

  const filtered = bids.filter((b) => (tab === 'all' ? true : b.status === tab))
  const pending = bids.filter((b) => b.status === 'pending')

  const doAccept = async () => {
    setBusy(true)
    await acceptBid(confirm.id)
    setBusy(false)
    setConfirm(null)
  }

  const doReject = () => {
    rejectBid(rejecting.id)
    setRejecting(null)
    setReason('')
    toast('Bid rejected — developer notified', 'info')
  }

  return (
    <div>
      <SectionHeader
        title="Bid Management"
        subtitle="Compare proposals, review portfolios and select your developer."
        actions={<StatusBadge tone={pending.length ? 'warning' : 'neutral'}>{pending.length} awaiting review</StatusBadge>}
      />

      <div className="mb-5">
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { id: 'pending', label: 'Pending', count: pending.length },
            { id: 'accepted', label: 'Accepted', count: bids.filter((b) => b.status === 'accepted').length },
            { id: 'rejected', label: 'Rejected', count: bids.filter((b) => b.status === 'rejected').length },
            { id: 'all', label: 'All bids', count: bids.length },
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="card"><EmptyState icon={Gavel} title="No bids in this view" subtitle="Bids will appear as developers respond to your projects." /></div>
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => {
            const project = projects.find((p) => p.id === b.projectId)
            const dev = developers.find((d) => d.id === b.developerId)
            return (
              <div key={b.id} className="card p-5">
                <div className="flex flex-wrap items-start gap-4">
                  <Avatar initials={b.developer.split(' ').map((s) => s[0]).join('')} color={dev?.color || 'bg-brand-600'} size="h-12 w-12" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-slate-900">{b.developer}</h3>
                      {dev?.aiBadge && <StatusBadge tone="purple">AI Code Assistance</StatusBadge>}
                      <span className="text-xs text-amber-600 font-semibold flex items-center gap-1"><Star size={12} className="fill-amber-400" /> {b.rating}</span>
                      <span className="text-xs text-slate-400">· bid on {b.createdAt}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-0.5">{project?.title} · {project?.client}</p>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm">
                      <span className="flex items-center gap-1.5 text-slate-700"><DollarSign size={14} className="text-slate-400" /> Proposed <strong>${b.price.toLocaleString()}</strong></span>
                      <span className="flex items-center gap-1.5 text-slate-600"><Clock size={14} className="text-slate-400" /> {b.delivery}</span>
                      <span className="flex items-center gap-1.5 text-slate-600"><Gavel size={14} className="text-slate-400" /> <StatusBadge tone={b.status === 'accepted' ? 'success' : b.status === 'rejected' ? 'danger' : 'warning'}>{b.status}</StatusBadge></span>
                    </div>

                    <p className="text-sm text-slate-600 mt-3 leading-relaxed border-l-2 border-slate-200 pl-3">{b.proposal}</p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <button className="btn-secondary btn-sm" onClick={() => setPortfolio(dev || { name: b.developer, title: 'Developer', skills: project?.skills || [], bio: b.proposal, rating: b.rating, completedProjects: 12, experience: '4 years' })}>
                        <Eye size={13} /> View Portfolio
                      </button>
                      {b.status === 'pending' && (
                        <>
                          <button className="btn-success btn-sm" onClick={() => setConfirm(b)}><CheckCircle2 size={13} /> Accept Bid</button>
                          <button className="btn-ghost btn-sm text-rose-600" onClick={() => setRejecting(b)}><XCircle size={13} /> Reject Bid</button>
                        </>
                      )}
                      {b.status === 'accepted' && (
                        <Link to="/client/active" className="btn-primary btn-sm"><ExternalLink size={13} /> Open workspace</Link>
                      )}
                      {b.status === 'accepted' && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200 rounded-full px-3 py-1.5 ml-auto">
                          <PartyPopper size={13} /> Developer Selected
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="hidden xl:block w-44 text-right border-l border-slate-100 pl-4">
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Proposed price</p>
                    <p className="text-2xl font-bold text-brand-700 mt-1">${b.price.toLocaleString()}</p>
                    <p className="text-xs text-slate-500 mt-1">Platform fee (10%): ${Math.round(b.price * 0.1).toLocaleString()}</p>
                    <p className="text-xs text-slate-500">Developer gets: ${Math.round(b.price * 0.9).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Accept confirmation */}
      <Modal
        open={!!confirm}
        onClose={() => setConfirm(null)}
        title="Accept this bid?"
        size="max-w-md"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setConfirm(null)}>Cancel</button>
            <button className="btn-success" onClick={doAccept} disabled={busy}>
              {busy ? <Spinner size={15} /> : <CheckCircle2 size={15} />} {busy ? 'Accepting…' : 'Accept Bid'}
            </button>
          </>
        }
      >
        {confirm && (
          <div className="space-y-4 text-sm">
            <p className="text-slate-600">
              You are selecting <strong>{confirm.developer}</strong> for <strong>{projects.find((p) => p.id === confirm.projectId)?.title}</strong> at{' '}
              <strong>${confirm.price.toLocaleString()}</strong>. A project workspace will be created immediately.
            </p>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 space-y-2">
              <div className="flex justify-between"><span className="text-slate-500">Project budget</span><span className="font-semibold">${projects.find((p) => p.id === confirm.projectId)?.budget.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Agreed price</span><span className="font-semibold text-brand-700">${confirm.price.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Delivery</span><span className="font-semibold">{confirm.delivery}</span></div>
            </div>
            <p className="text-xs text-slate-400">Other pending bids on this project will be rejected automatically.</p>
          </div>
        )}
      </Modal>

      {/* Reject modal */}
      <Modal
        open={!!rejecting}
        onClose={() => setRejecting(null)}
        title="Reject bid"
        size="max-w-md"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setRejecting(null)}>Cancel</button>
            <button className="btn-danger" onClick={doReject} disabled={!reason.trim()}>Reject bid</button>
          </>
        }
      >
        <Field label="Reason (shared with the developer)" hint="Optional but recommended.">
          <textarea className="input min-h-[100px]" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. We selected a developer with more domain experience for this scope." />
        </Field>
      </Modal>

      {/* Portfolio modal */}
      <Modal open={!!portfolio} onClose={() => setPortfolio(null)} title={`${portfolio?.name || ''} — Portfolio`}>
        {portfolio && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar initials={portfolio.avatar || portfolio.name.split(' ').map((s) => s[0]).join('')} color={portfolio.color || 'bg-brand-600'} size="h-14 w-14" />
              <div>
                <p className="font-semibold text-slate-900">{portfolio.name}</p>
                <p className="text-sm text-slate-500">{portfolio.title} · {portfolio.experience}</p>
                <p className="text-xs text-amber-600 font-semibold mt-0.5">★ {portfolio.rating} · {portfolio.completedProjects} projects</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{portfolio.bio}</p>
            <div className="flex flex-wrap gap-1.5">
              {(portfolio.skills || []).map((s) => <span key={s} className="text-xs bg-slate-100 text-slate-600 rounded px-2 py-1">{s}</span>)}
            </div>
            <Link to={`/portfolio/${portfolio.slug || 'ali-khan'}`} className="btn-secondary btn-sm" onClick={() => setPortfolio(null)}>
              Open full public portfolio <ExternalLink size={13} />
            </Link>
          </div>
        )}
      </Modal>
    </div>
  )
}
