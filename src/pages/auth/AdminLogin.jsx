import { Link } from 'react-router-dom'
import AuthShell from './AuthShell.jsx'

export default function AdminLogin() {
  return (
    <AuthShell
      role="admin"
      provider="google"
      providerLabel="Continue with Google"
      title="Platform oversight and control"
      subtitle="Monitor users, projects, payments, complaints and bug reports. Verify deliveries and release payments."
      footerNote={
        <>
          Looking for a workspace? <Link to="/login/developer" className="font-semibold text-brand-700">Developer login</Link>
        </>
      }
    />
  )
}
