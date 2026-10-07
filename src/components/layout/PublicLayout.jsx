import { Link, NavLink } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PublicLayout({ children }) {
  return (
    <div className="bg-white min-h-screen">
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="h-8 w-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold">T</span>
            <span className="font-bold text-slate-900 tracking-tight">TOM</span>
            <span className="hidden sm:inline text-xs text-slate-400 border-l border-slate-200 pl-2.5">Train Optimal Model</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-brand-700' : 'hover:text-brand-700')}>About</NavLink>
            <NavLink to="/architecture" className={({ isActive }) => (isActive ? 'text-brand-700' : 'hover:text-brand-700')}>Architecture</NavLink>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'text-brand-700' : 'hover:text-brand-700')}>Home</NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/login/developer" className="btn-secondary btn-sm hidden sm:inline-flex">Sign in</Link>
            <Link to="/login/developer" className="btn-primary btn-sm">Get Started</Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-slate-900 text-slate-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-5 flex flex-wrap items-center justify-between gap-4 text-sm">
          <p>© 2026 TOM — Train Optimal Model. Final Year Project prototype.</p>
          <Link to="/" className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white">
            <ArrowLeft size={14} /> Back to home
          </Link>
        </div>
      </footer>
    </div>
  )
}
