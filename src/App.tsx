import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppToaster } from '@/components/ui/AppToaster'
import { LandingPage } from '@/pages/LandingPage'
import { SignupPage } from '@/pages/SignupPage'
import { TermsPage } from '@/pages/TermsPage'
import { WelcomePage } from '@/pages/WelcomePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <AppToaster />
    </BrowserRouter>
  )
}
