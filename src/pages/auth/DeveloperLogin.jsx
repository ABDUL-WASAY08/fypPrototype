import { Link } from 'react-router-dom'
import AuthShell from './AuthShell.jsx'

export default function DeveloperLogin() {
  return (
    <AuthShell
      role="developer"
      provider="github"
      providerLabel="Continue with GitHub"
      title="Ship better code with repository-aware AI"
      subtitle="Connect your repositories, run analysis, ask questions about your own codebase and publish a portfolio clients can trust."
      footerNote={
        <>
          Not a developer? <Link to="/login/client" className="font-semibold text-brand-700">Client login</Link>
        </>
      }
    />
  )
}
