import { useState } from 'react'
import { Users, Search, Mail, Send, CheckCircle2, Sparkles, Filter } from 'lucide-react'
import { developers } from '../../data/mockData.js'
import { DeveloperCard } from '../../components/domain.jsx'
import { useApp } from '../../context/AppContext.jsx'
import { SectionHeader, Modal, Field, EmptyState, StatusBadge, Tabs, Spinner, Avatar } from '../../components/ui.jsx'

export default function ClientDevelopers() {
  const { projects, toast, notify } = useApp()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [contact, setContact] = useState(null)
  const [invite, setInvite] = useState(null)
  const [message, setMessage] = useState('')
  const [invProject, setInvProject] = useState('')
  const [sent, setSent] = useState(false)

  const openProjects = projects.filter((p) => p.status === 'open')

  const list = developers.filter((d) => {
    const q = query.toLowerCase()
    const matchQ = d.name.toLowerCase().includes(q) || d.skills.join(' ').toLowerCase().includes(q) || d.title.toLowerCase().includes(q)
    const matchF = filter === 'all' || (filter === 'ai' && d.aiBadge) || (filter === 'top' && d.rating >= 4.8)
    return matchQ && matchF
  })

  const startContact = (dev) => {
    setContact(dev)
    setMessage(`Hi ${dev.name.split(' ')[0]}, I came across your portfolio on TOM and would like to discuss a project.`)
    setSent(false)
  }

  const startInvite = (dev) => {
    setInvite(dev)
    setInvProject(openProjects[0]?.id || '')
    setSent(false)
  }

  const doAction = async (kind) => {
    await new Promise((r) => setTimeout(r, 700))
    setSent(true)
    if (kind === 'contact') toast(`Message sent to ${contact.name}`)
    else {
      const p = projects.find((x) => x.id === invProject)
      notify('developer', 'You have been invited to a project.', `${invite.name} invited you to ${p?.title || 'a project'}.`, 'info')
      toast(`Invitation sent to ${invite.name}`)
    }
  }

  return (
    <div>
      <SectionHeader
        title="Developers"
        subtitle="Browse verified developers, inspect their portfolios and invite them to your projects."
        actions={<StatusBadge tone="info">{developers.length} available</StatusBadge>}
      />

      <div className="card p-4 flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Search by name, role or skill…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Tabs
          active={filter}
          onChange={setFilter}
          tabs={[
            { id: 'all', label: 'All', count: developers.length },
            { id: 'ai', label: 'AI-assisted', count: developers.filter((d) => d.aiBadge).length },
            { id: 'top', label: 'Top rated', count: developers.filter((d) => d.rating >= 4.8).length },
          ]}
        />
      </div>

      {list.length === 0 ? (
        <div className="card"><EmptyState icon={Users} title="No developers found" subtitle="Try a different search term." /></div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {list.map((d) => (
            <DeveloperCard key={d.id} dev={d} onContact={startContact} onInvite={startInvite} />
          ))}
        </div>
      )}

      {/* Contact modal */}
      <Modal
        open={!!contact}
        onClose={() => setContact(null)}
        title={sent ? 'Message sent' : `Contact ${contact?.name || ''}`}
        footer={
          sent ? (
            <button className="btn-primary" onClick={() => setContact(null)}>Done</button>
          ) : (
            <>
              <button className="btn-secondary" onClick={() => setContact(null)}>Cancel</button>
              <button className="btn-primary" onClick={() => doAction('contact')} disabled={!message.trim() || sent}>
                {sent ? <CheckCircle2 size={15} /> : <Send size={15} />} Send message
              </button>
            </>
          )
        }
      >
        {sent ? (
          <div className="text-center py-6">
            <div className="mx-auto h-14 w-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckCircle2 size={28} /></div>
            <p className="mt-4 font-semibold text-slate-900">Your message has been delivered</p>
            <p className="text-sm text-slate-500 mt-1">{contact?.name} will be notified in their portal.</p>
          </div>
        ) : (
          contact && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <Avatar initials={contact.avatar} color={contact.color} />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{contact.name}</p>
                  <p className="text-xs text-slate-500">{contact.title} · ${contact.hourlyRate}/hr</p>
                </div>
                <span className="ml-auto"><StatusBadge tone="success">online</StatusBadge></span>
              </div>
              <Field label="Message">
                <textarea className="input min-h-[130px]" value={message} onChange={(e) => setMessage(e.target.value)} />
              </Field>
            </div>
          )
        )}
      </Modal>

      {/* Invite modal */}
      <Modal
        open={!!invite}
        onClose={() => setInvite(null)}
        title={sent ? 'Invitation sent' : `Invite ${invite?.name || ''} to a project`}
        footer={
          sent ? (
            <button className="btn-primary" onClick={() => setInvite(null)}>Done</button>
          ) : (
            <>
              <button className="btn-secondary" onClick={() => setInvite(null)}>Cancel</button>
              <button className="btn-primary" onClick={() => doAction('invite')} disabled={!invProject || sent}>
                {sent ? <CheckCircle2 size={15} /> : <Send size={15} />} Send invitation
              </button>
            </>
          )
        }
      >
        {sent ? (
          <div className="text-center py-6">
            <div className="mx-auto h-14 w-14 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center"><Sparkles size={26} /></div>
            <p className="mt-4 font-semibold text-slate-900">Invitation delivered</p>
            <p className="text-sm text-slate-500 mt-1">{invite?.name} can now submit a bid on your project.</p>
          </div>
        ) : (
          invite && (
            <div className="space-y-4">
              <Field label="Select project" required>
                <select className="input" value={invProject} onChange={(e) => setInvProject(e.target.value)}>
                  {openProjects.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
                  {openProjects.length === 0 && <option value="">No open projects available</option>}
                </select>
              </Field>
              <div className="rounded-lg border border-slate-200 p-4 text-sm text-slate-600">
                <p className="font-semibold text-slate-900 mb-1">What happens next?</p>
                <ul className="space-y-1 list-disc pl-4">
                  <li>{invite.name.split(' ')[0]} receives a notification with your project details.</li>
                  <li>They can submit a price, timeline and proposal.</li>
                  <li>You can accept the bid to open a workspace.</li>
                </ul>
              </div>
            </div>
          )
        )}
      </Modal>
    </div>
  )
}
