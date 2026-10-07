import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-5 text-center">
      <div className="h-14 w-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center">
        <Compass size={26} />
      </div>
      <h1 className="mt-6 text-5xl font-extrabold text-slate-900">404</h1>
      <p className="mt-2 text-slate-500">This page does not exist in the TOM prototype.</p>
      <div className="mt-6 flex gap-3">
        <Link to="/" className="btn-primary">Back to home</Link>
        <Link to="/about" className="btn-secondary">About the project</Link>
      </div>
    </div>
  )
}
