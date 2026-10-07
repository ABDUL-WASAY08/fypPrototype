import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, ShieldCheck, Github, ChevronLeft, Loader2 } from 'lucide-react'
import { authService } from '../../services/authService.js'
import { useApp } from '../../context/AppContext.jsx'
import { ragSteps } from '../../data/mockData.js'

const PROVIDER_ICON = {
  github: Github,
  google: (props) => (
    <svg viewBox="0 0 24 24" width="16" height="16" {...props}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  ),
}

export default function AuthShell({ role, title, subtitle, provider, providerLabel, footerNote, homePath }) {
  const { signIn } = useApp()
  const navigate = useNavigate()
  const [email, setEmail] = useState(role === 'developer' ? 'ali.khan@tom.dev' : role === 'client' ? 'nadia@brightlabs.co' : 'hamza@tom.dev')
  const [password, setPassword] = useState('demo1234')
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState('')

  const complete = async (p) => {
    setLoading(p)
    const res = await authService.signIn(role, p)
    signIn(res.role, res.user)
    setLoading(null)
    navigate(role === 'developer' ? '/developer' : role === 'client' ? '/client' : '/admin')
  }

  const submit = (e) => {
    e.preventDefault()
    setError('')
    if (!email.includes('@') || password.length < 6) {
      setError('Enter a valid email and a password of at least 6 characters.')
      return
    }
    complete('email')
  }

  const ProviderIcon = PROVIDER_ICON[provider]

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Brand panel */}
      <div className="hidden lg:flex flex-col justify-between bg-slate-900 text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_45%)]" />
        <Link to="/" className="relative flex items-center gap-2.5 w-fit">
          <span className="h-9 w-9 rounded-lg bg-brand-600 flex items-center justify-center font-bold">T</span>
          <span className="font-bold">TOM</span>
          <span className="text-xs text-slate-400 border-l border-slate-700 pl-2.5">Train Optimal Model</span>
        </Link>

        <div className="relative">
          <p className="text-sm font-semibold text-brand-400 uppercase tracking-wide">{role} portal</p>
          <h1 className="mt-3 text-3xl font-bold leading-snug">{title}</h1>
          <p className="mt-3 text-slate-400 text-sm max-w-md leading-relaxed">{subtitle}</p>

          <div className="mt-8 grid grid-cols-2 gap-2 max-w-md">
            {ragSteps.map((s, i) => (
              <div key={s.key} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs flex items-center gap-2">
                <span className="h-5 w-5 rounded bg-brand-600/80 text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                <span className="text-slate-300">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-slate-500">Authentication is mocked for this prototype — no real credentials are stored.</p>
      </div>

      {/* Form panel */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 bg-slate-50">
        <Link to="/" className="lg:hidden flex items-center gap-2 text-sm text-slate-500 mb-8">
          <ChevronLeft size={15} /> Back to home
        </Link>

        <div className="w-full max-w-md mx-auto">
          <div className="card p-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-700 bg-brand-50 ring-1 ring-brand-200 rounded-full px-3 py-1.5 w-fit">
              <ShieldCheck size={13} /> {role} sign in
            </div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900">{role === 'admin' ? 'Admin Login' : `${role[0].toUpperCase() + role.slice(1)} Login`}</h2>
            <p className="text-sm text-slate-500 mt-1">Welcome back. Continue to your {role} dashboard.</p>

            <button
              onClick={() => complete(provider)}
              disabled={!!loading}
              className="btn-secondary w-full mt-6"
            >
              {loading === provider ? <Loader2 size={16} className="animate-spin" /> : <ProviderIcon size={16} />}
              {loading === provider ? 'Connecting…' : providerLabel}
            </button>

            <div className="flex items-center gap-3 my-5">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">or continue with email</span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="label">Email</label>
                <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div>
                <label className="label">Password</label>
                <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
              {error && <p className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">{error}</p>}
              <button type="submit" className="btn-primary w-full" disabled={!!loading}>
                {loading === 'email' ? <Loader2 size={16} className="animate-spin" /> : null}
                {loading === 'email' ? 'Signing in…' : 'Login'}
              </button>
            </form>

            <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5"><Sparkles size={12} className="text-brand-500" /> Demo credentials pre-filled</span>
            </div>
          </div>

          <div className="mt-5 text-center text-sm text-slate-500">
            {footerNote}
            <div className="mt-3 flex justify-center gap-4 text-xs">
              <Link to="/login/developer" className="hover:text-brand-700 font-medium">Developer</Link>
              <Link to="/login/client" className="hover:text-brand-700 font-medium">Client</Link>
              <Link to="/login/admin" className="hover:text-brand-700 font-medium">Admin</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
