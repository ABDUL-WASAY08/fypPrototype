import { Link } from 'react-router-dom'
import AuthShell from './AuthShell.jsx'

export default function ClientLogin() {
  return (
    <AuthShell
      role="client"
      provider="google"
      providerLabel="Continue with Google"
      title="Hire developers backed by verified work"
      subtitle="Post projects, review AI-augmented portfolios, accept bids and manage delivery with an escrow payment workflow."
      footerNote={
        <>
          Managing the platform? <Link to="/login/admin" className="font-semibold text-brand-700">Admin login</Link>
        </>
      }
    />
  )
}
