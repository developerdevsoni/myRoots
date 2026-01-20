import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/landing-page';
import { Dashboard } from './components/dashboard';
import { FamilyTree } from './components/family-tree';
import { RootMatches } from './components/root-matches';
import { LoginPage } from './components/login-page';
import { SignupPage } from './components/signup-page';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tree" element={<FamilyTree />} />
        <Route path="/matches" element={<RootMatches />} />
      </Routes>
    </BrowserRouter>
  );
}