import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Target, CheckCircle2, Gauge, LayoutGrid, Workflow, Cpu, ShieldCheck, Users, ArrowRight,
  Github, Bot, ScanSearch, Wand2, FileText, BookOpen, Briefcase, Store, Gavel, FolderKanban,
  CreditCard, Bell, Settings, FlaskConical, GitBranch,
} from 'lucide-react'
import PublicLayout from '../components/layout/PublicLayout.jsx'
import { documentationContent, features, platformStats } from '../data/mockData.js'
import { StatusBadge } from '../components/ui.jsx'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'functional', label: 'Functional Requirements' },
  { id: 'nonfunctional', label: 'Non-Functional Requirements' },
  { id: 'modules', label: 'Platform Modules' },
  { id: 'workflow', label: 'Workflow & Methodology' },
]

const MODULES = [
  { icon: Github, title: 'GitHub Repository Integration', desc: 'OAuth-based connection, repository listing, one-click sync and webhook-ready refresh.', tag: 'Core' },
  { icon: ScanSearch, title: 'Repository Analysis', desc: 'Static + AI analysis producing quality, security, maintainability and documentation scores.', tag: 'Core' },
  { icon: Bot, title: 'AI Code Assistance', desc: 'Repository-scoped assistant that answers questions grounded in indexed code.', tag: 'AI' },
  { icon: GitBranch, title: 'RAG-based Repository Chat', desc: 'Chunking → embeddings → vector search → context assembly → LLM response with citations.', tag: 'AI' },
  { icon: ShieldCheck, title: 'Code Error / Flaw Detection', desc: 'Categorized issue list (High / Medium / Low) with file, line, explanation and fix.', tag: 'Core' },
  { icon: Wand2, title: 'AI Code Improvement', desc: 'Before/after rewrites across performance, readability, maintainability, security and best practices.', tag: 'AI' },
  { icon: FileText, title: 'README Generation', desc: 'Structured Markdown README with features, install steps and API tables.', tag: 'AI' },
  { icon: BookOpen, title: 'Project Documentation', desc: 'Abstract, technology overview, workflow, functional and non-functional requirements.', tag: 'AI' },
  { icon: Briefcase, title: 'Developer Portfolio', desc: 'Public shareable portfolio built only from selected repositories, skills and experience.', tag: 'Marketplace' },
  { icon: Store, title: 'Client–Developer Marketplace', desc: 'Browse verified developers, ratings, badges and direct invitations.', tag: 'Marketplace' },
  { icon: Gavel, title: 'Project Bidding', desc: 'Proposed price, delivery time and proposal per bid with accept/reject flows.', tag: 'Marketplace' },
  { icon: FolderKanban, title: 'Project Management', desc: 'Workspace with milestones, progress, messages, files and status transitions.', tag: 'Marketplace' },
  { icon: CreditCard, title: 'Payment Workflow', desc: 'Escrow funding → approval → admin verification → release. Fully mocked.', tag: 'Business' },
  { icon: Bell, title: 'Real-time Notifications', desc: 'Event-driven in-app notification center simulated for the prototype.', tag: 'Platform' },
  { icon: Users, title: 'Admin Portal', desc: 'Users, projects, payments, complaints, bug reports and system activity.', tag: 'Platform' },
  { icon: Settings, title: 'Role-based Access', desc: 'Developer, Client and Admin portals with guarded routes and RBAC middleware design.', tag: 'Platform' },
]

const WORKFLOW = [
  'Client registers and publishes a project with budget, skills and deliverables.',
  'Developers browse the marketplace and submit bids with price, timeline and proposal.',
  'Client reviews bids, compares portfolios and accepts one bid.',
  'A project workspace is created with milestones, files and messaging.',
  'Client funds the escrow; payment status becomes Paid and the project activates.',
  'Developer completes milestones and marks work as submitted.',
  'Client reviews and approves the work, which flags the payment Pending Release.',
  'Admin verifies delivery and releases the payment to the developer.',
]

export default function About() {
  const [tab, setTab] = useState('overview')

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.12),transparent_55%)]" />
        <div className="max-w-7xl mx-auto px-5 py-16 relative">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">About the project</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            TOM — Train Optimal Model
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 leading-relaxed">
            An AI-powered developer platform that unifies GitHub repository intelligence, retrieval-augmented code
            assistance, developer portfolios and a client–developer marketplace with an escrow payment workflow.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-3xl">
            {platformStats.map((s) => (
              <div key={s.label} className="card p-4">
                <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 py-10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 border-b border-slate-200 mb-8">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                tab === t.id ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ============ OVERVIEW ============ */}
        {tab === 'overview' && (
          <div className="animate-fade-in space-y-10">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="card p-6 lg:col-span-2">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Target size={18} className="text-brand-600" /> Vision</h2>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  Most developers maintain repositories, portfolios, client relationships and payments across five
                  different tools. TOM collapses that into a single platform where the repository itself becomes the
                  source of truth: the same indexed code powers analysis, chat, improvements, README and documentation,
                  and the developer's portfolio is derived from work that was already verified by the platform.
                </p>
                <h2 className="mt-8 text-xl font-bold text-slate-900 flex items-center gap-2"><Cpu size={18} className="text-brand-600" /> Problem statement</h2>
                <ul className="mt-3 space-y-2 text-slate-600 text-sm">
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" /> Code understanding is slow when onboarding onto an unfamiliar repository.</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" /> Documentation and README files are usually outdated or missing entirely.</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" /> Freelance developers juggle portfolios, bidding and payments on disconnected tools.</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" /> Clients lack trust signals when hiring remote developers.</li>
                </ul>
              </div>

              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2"><FlaskConical size={16} className="text-brand-600" /> Prototype scope</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    This build is a presentation prototype: authentication, GitHub, LLM, payments and databases are
                    mocked behind a clean service layer (<code className="text-xs bg-slate-100 px-1 rounded">src/services</code>)
                    so real providers can be plugged in without touching the UI.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <StatusBadge tone="success">Mocked auth</StatusBadge>
                    <StatusBadge tone="info">Mocked GitHub</StatusBadge>
                    <StatusBadge tone="purple">Mocked LLM</StatusBadge>
                    <StatusBadge tone="warning">Mocked payments</StatusBadge>
                  </div>
                </div>
                <div className="card p-6">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2"><Workflow size={16} className="text-brand-600" /> Architecture</h3>
                  <p className="mt-2 text-sm text-slate-600">Frontend → Nginx → Express → MongoDB / Redis · BullMQ → GitHub API → LLM + Vector search.</p>
                  <Link to="/architecture" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                    View architecture diagram <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><LayoutGrid size={18} className="text-brand-600" /> Feature highlights</h2>
              <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {features.map((f) => (
                  <div key={f.title} className="card p-5">
                    <div className="h-9 w-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center text-sm font-bold">✓</div>
                    <h3 className="mt-3 font-semibold text-slate-900 text-sm">{f.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ FUNCTIONAL ============ */}
        {tab === 'functional' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-600" /> Functional Requirements</h2>
              <p className="text-sm text-slate-500 mt-1">
                What the system must <strong>do</strong> — every requirement below is demonstrated interactively in this prototype.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-5">
              {documentationContent.functionalRequirements.map((fr) => {
                const [id, ...rest] = fr.split(' ')
                return (
                  <div key={id} className="card p-4 flex gap-4 hover:border-brand-300 transition-colors">
                    <span className="shrink-0 h-8 w-8 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center ring-1 ring-emerald-200">
                      {id.replace('FR-', '')}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{id}</p>
                      <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">{rest.join(' ')}</p>
                      <Link
                        to={frLink(id)}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-800"
                      >
                        Open module <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 card p-6 bg-slate-900 text-slate-200 border-slate-800">
              <h3 className="font-semibold text-white flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-400" /> Role-based functional scope</h3>
              <div className="mt-4 grid sm:grid-cols-3 gap-4 text-sm">
                <div className="rounded-lg bg-slate-800 p-4">
                  <p className="text-brand-300 font-semibold mb-2">Developer</p>
                  <ul className="space-y-1.5 text-slate-300 text-[13px]">
                    <li>• Connect & analyze repositories</li>
                    <li>• Chat with repository AI</li>
                    <li>• Improve code, generate README/docs</li>
                    <li>• Publish portfolio & bid on projects</li>
                    <li>• Track projects and payments</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-slate-800 p-4">
                  <p className="text-violet-300 font-semibold mb-2">Client</p>
                  <ul className="space-y-1.5 text-slate-300 text-[13px]">
                    <li>• Publish projects & requirements</li>
                    <li>• Review bids and portfolios</li>
                    <li>• Accept/reject bids</li>
                    <li>• Manage active project workspace</li>
                    <li>• Fund escrow, approve & pay</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-slate-800 p-4">
                  <p className="text-emerald-300 font-semibold mb-2">Admin</p>
                  <ul className="space-y-1.5 text-slate-300 text-[13px]">
                    <li>• Manage users & roles</li>
                    <li>• Oversee all projects</li>
                    <li>• Verify & release payments</li>
                    <li>• Resolve complaints/disputes</li>
                    <li>• Triage bug reports & activity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ NON-FUNCTIONAL ============ */}
        {tab === 'nonfunctional' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Gauge size={18} className="text-brand-600" /> Non-Functional Requirements</h2>
              <p className="text-sm text-slate-500 mt-1">
                How the system must <strong>behave</strong> — quality attributes that define platform reliability and usability.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { id: 'NFR-01', title: 'Performance', tone: 'brand', desc: 'Dashboard pages shall render in under 2 seconds on a standard laptop; API p95 latency under 300ms for non-AI endpoints.', metric: '< 2s first render' },
                { id: 'NFR-02', title: 'Scalability', tone: 'violet', desc: 'Analysis, embedding and generation jobs shall run on a queue (BullMQ) so traffic spikes never block API responses.', metric: 'Queue-backed workers' },
                { id: 'NFR-03', title: 'Security', tone: 'rose', desc: 'Passwords hashed with bcrypt, expiring JWTs, RBAC route guards, input validation and webhook signature verification.', metric: 'RBAC + bcrypt + JWT' },
                { id: 'NFR-04', title: 'Availability', tone: 'emerald', desc: 'Target 99.5% uptime with graceful degradation: AI features fail soft while the rest of the platform stays usable.', metric: '99.5% uptime' },
                { id: 'NFR-05', title: 'Usability', tone: 'amber', desc: 'Responsive across desktop, laptop and tablet with consistent components, empty states, loading states and feedback toasts.', metric: 'Responsive UI' },
                { id: 'NFR-06', title: 'Maintainability', tone: 'sky', desc: 'Isolated service layer, reusable components and mock adapters so real providers replace mocks without UI changes.', metric: 'Service-layer adapters' },
                { id: 'NFR-07', title: 'Reliability', tone: 'emerald', desc: 'Payment state transitions are idempotent, audited end-to-end and reversible through refund/dispute handling.', metric: 'Audited transitions' },
                { id: 'NFR-08', title: 'Portability', tone: 'brand', desc: 'Frontend builds to static assets deployable behind Nginx; no vendor lock-in in the frontend stack.', metric: 'Static build output' },
              ].map((n) => (
                <div key={n.id} className="card p-5 hover:shadow-pop transition-shadow">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                      <Gauge size={16} className="text-brand-600" /> {n.title}
                    </h3>
                    <StatusBadge>{n.id}</StatusBadge>
                  </div>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{n.desc}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-brand-500 to-violet-500 rounded-full" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">{n.metric}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 card p-6">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2"><ShieldCheck size={16} className="text-brand-600" /> Constraints & assumptions</h3>
              <div className="mt-3 grid sm:grid-cols-3 gap-4 text-sm text-slate-600">
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="font-semibold text-slate-900 mb-1">Constraints</p>
                  <ul className="space-y-1"><li>• Prototype uses mock services only</li><li>• No real payment gateway settlement</li><li>• Single-tenant demo dataset</li></ul>
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="font-semibold text-slate-900 mb-1">Assumptions</p>
                  <ul className="space-y-1"><li>• Users have a GitHub account</li><li>• Repositories are English/code-mixed</li><li>• Admin approves before release</li></ul>
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="font-semibold text-slate-900 mb-1">Dependencies</p>
                  <ul className="space-y-1"><li>• GitHub API availability</li><li>• LLM provider quota</li><li>• Redis for background jobs</li></ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ MODULES ============ */}
        {tab === 'modules' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><LayoutGrid size={18} className="text-brand-600" /> Platform Modules</h2>
              <p className="text-sm text-slate-500 mt-1">All 16 modules implemented across the three role-based portals.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {MODULES.map((m, i) => (
                <div key={m.title} className="card p-5 hover:shadow-pop transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="h-10 w-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                      <m.icon size={18} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{String(i + 1).padStart(2, '0')} · {m.tag}</span>
                  </div>
                  <h3 className="mt-3 font-semibold text-slate-900">{m.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============ WORKFLOW ============ */}
        {tab === 'workflow' && (
          <div className="animate-fade-in grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card p-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Workflow size={18} className="text-brand-600" /> End-to-end marketplace workflow</h2>
              <ol className="mt-5 space-y-4">
                {WORKFLOW.map((w, i) => (
                  <li key={w} className="flex gap-4">
                    <span className="h-7 w-7 shrink-0 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <p className="text-sm text-slate-700 pt-0.5 leading-relaxed">{w}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="font-semibold text-slate-900">Payment lifecycle</h3>
                <div className="mt-4 space-y-2 text-sm">
                  {['Client pays project amount', 'Payment successful → escrow', 'Project active', 'Developer completes project', 'Client approves', 'Admin verification', 'Payment released'].map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                      <span className={`h-6 w-6 rounded text-[10px] font-bold flex items-center justify-center ${i === 6 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{i + 1}</span>
                      <span className="text-slate-700">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-semibold text-slate-900">Methodology</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Agile iterations over 2 semesters: requirements gathering → UI design → service layer & mocks →
                  portal implementation → RAG pipeline design → testing → committee demonstration.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Agile / Scrum', 'Figma UI kits', 'Component library', 'Mock service layer', 'Manual QA'].map((t) => (
                    <span key={t} className="text-[11px] font-medium bg-slate-100 text-slate-600 rounded px-2 py-1">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  )
}

function frLink(id) {
  const map = {
    'FR-01': '/login/developer',
    'FR-02': '/login/client',
    'FR-03': '/login/developer',
    'FR-04': '/login/developer',
    'FR-05': '/login/developer',
    'FR-06': '/login/developer',
    'FR-07': '/login/developer',
    'FR-08': '/login/developer',
    'FR-09': '/login/developer',
    'FR-10': '/login/developer',
    'FR-11': '/login/client',
    'FR-12': '/login/developer',
    'FR-13': '/login/client',
    'FR-14': '/login/client',
    'FR-15': '/login/developer',
    'FR-16': '/login/admin',
  }
  return map[id] || '/'
}
