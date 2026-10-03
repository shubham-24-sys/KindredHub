import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { ExploreNGOs } from './components/ExploreNGOs';
import { InteractiveMap } from './components/InteractiveMap';
import { ImpactFeed } from './components/ImpactFeed';
import { CertificatesView } from './components/CertificatesView';
import { DonationTracker } from './components/DonationTracker';
import { VolunteerCertificates } from './components/VolunteerCertificates';
import { TrackedDonation, donationFromCert, seedDonations } from './data/trackerData';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { StoryModal } from './components/StoryModal';
import { NGOProfileModal } from './components/NGOProfileModal';
import { GiveSupportModal } from './components/GiveSupportModal';
import { NgoDashboard } from './components/dashboard/NgoDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { usePlatform } from './data/platform';
import {
  INITIAL_NGOS,
  INITIAL_CERTIFICATES,
  NGO,
  Certificate
} from './data/mockData';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'explore' | 'feed' | 'map' | 'certificates' | 'tracker' | 'volunteer' | 'login' | 'register' | 'ngo-dashboard' | 'admin-dashboard'>('landing');
  const platform = usePlatform();
  const { account, publicNgos: ngos, publicPosts: posts } = platform;
  const [certificates, setCertificates] = useState<Certificate[]>(INITIAL_CERTIFICATES);
  const [selectedNGOId, setSelectedNGOId] = useState<string>('helping-hands');
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [activeProfileNGO, setActiveProfileNGO] = useState<NGO | null>(null);
  const [donations, setDonations] = useState<TrackedDonation[]>(() => {
    try {
      const saved = localStorage.getItem('kh_donations');
      if (saved) return JSON.parse(saved) as TrackedDonation[];
    } catch { /* ignore */ }
    return seedDonations(INITIAL_NGOS, INITIAL_CERTIFICATES);
  });
  useEffect(() => {
    try { localStorage.setItem('kh_donations', JSON.stringify(donations)); } catch { /* ignore */ }
  }, [donations]);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [targetDonateNGOId, setTargetDonateNGOId] = useState<string | undefined>(undefined);
  const isLoggedIn = !!account;
  const dashboardViewFor = (role?: string) =>
    role === 'admin' ? 'admin-dashboard' : role === 'ngo' ? 'ngo-dashboard' : 'feed';

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleSelectNGO = (ngoId: string) => {
    setSelectedNGOId(ngoId);
    const found = ngos.find(n => n.id === ngoId);
    if (found) {
      setActiveProfileNGO(found);
    }
  };

  const handleOpenDonate = (ngoId?: string) => {
    setTargetDonateNGOId(ngoId);
    setIsDonateOpen(true);
  };

  const handleDonationComplete = (newCert: Certificate) => {
    setCertificates(prev => [newCert, ...prev]);
    setDonations(prev => [donationFromCert(newCert, ngos, Date.now()), ...prev]);
  };

  const handleLogin = (email: string, password: string): string | null => {
    const res = platform.login(email, password);
    if (!res.ok) return res.error;
    setCurrentView(dashboardViewFor(res.account?.role) as any);
    return null;
  };

  const handleRegister = (input: { role: 'donor' | 'ngo'; name: string; email: string; password: string }): string | null => {
    const res = platform.register(input);
    if (!res.ok) return res.error;
    setCurrentView(dashboardViewFor(res.account?.role) as any);
    return null;
  };

  const handleLogout = () => {
    platform.logout();
    setCurrentView('landing');
  };

  // Route guards: dashboards are only reachable by the matching role
  const view = (() => {
    if (currentView === 'admin-dashboard' && account?.role !== 'admin') return 'login';
    if (currentView === 'ngo-dashboard' && account?.role !== 'ngo') return 'login';
    return currentView;
  })();

  if (view === 'admin-dashboard') {
    return (
      <AdminDashboard
        platform={platform}
        onHome={() => setCurrentView('landing')}
        onLogout={handleLogout}
      />
    );
  }

  if (view === 'ngo-dashboard') {
    return (
      <>
        <NgoDashboard
          platform={platform}
          donations={donations}
          onHome={() => setCurrentView('landing')}
          onLogout={handleLogout}
          onPreviewProfile={(n) => setActiveProfileNGO(n)}
        />
        {activeProfileNGO && (
          <NGOProfileModal
            ngo={activeProfileNGO}
            onClose={() => setActiveProfileNGO(null)}
            onOpenDonate={() => {}}
          />
        )}
      </>
    );
  }

  // Auth views (Full screen layout without main navbar/footer as shown in the mockup design)
  if (view === 'login') {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onNavigate={(view: string) => setCurrentView(view as any)}
      />
    );
  }

  if (view === 'register') {
    return (
      <RegisterScreen
        onRegister={handleRegister}
        onSocial={() => handleLogin('aditya@example.com', 'Donor@123')}
        onNavigate={(view: string) => setCurrentView(view as any)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f7faf6] text-[#181c1a] flex flex-col justify-between selection:bg-[#95f8a7] selection:text-[#00210a]">
      {/* Universal Top Header */}
      <Navbar
        currentView={currentView}
        onNavigate={(view: string) => setCurrentView(view as any)}
        onOpenDonate={() => handleOpenDonate()}
        isLoggedIn={isLoggedIn}
        onToggleAuth={handleLogout}
        account={account}
        onOpenDashboard={() => setCurrentView(dashboardViewFor(account?.role) as any)}
      />

      {/* Main Body View */}
      <main className="flex-1 w-full pt-20">
        {currentView === 'landing' && (
          <LandingPage
            onNavigate={(view: string) => setCurrentView(view as any)}
            onOpenDonate={() => handleOpenDonate()}
            onSelectNGO={handleSelectNGO}
          />
        )}

        {currentView === 'explore' && (
          <ExploreNGOs
            ngos={ngos}
            onSelectNGO={handleSelectNGO}
            onOpenDonate={handleOpenDonate}
            onNavigate={(view: string) => setCurrentView(view as any)}
          />
        )}

        {currentView === 'feed' && (
          <ImpactFeed
            key={posts.map(p => p.id).join('|')}
            posts={posts}
            onOpenStory={(id: string) => setActiveStoryId(id)}
            onOpenDonate={handleOpenDonate}
            onNavigate={(view: string) => setCurrentView(view as any)}
            onSelectNGO={handleSelectNGO}
          />
        )}

        {currentView === 'map' && (
          <InteractiveMap
            ngos={ngos}
            selectedNGOId={selectedNGOId}
            onSelectNGO={handleSelectNGO}
            onOpenDonate={handleOpenDonate}
            onNavigate={(view: string) => setCurrentView(view as any)}
          />
        )}

        {currentView === 'tracker' && (
          <DonationTracker
            donations={donations}
            onOpenDonate={() => handleOpenDonate()}
            onNavigate={(view: string) => setCurrentView(view as any)}
          />
        )}

        {currentView === 'volunteer' && <VolunteerCertificates />}

        {currentView === 'certificates' && (
          <CertificatesView
            certificates={certificates}
            onOpenDonate={() => handleOpenDonate()}
            onNavigate={(view: string) => setCurrentView(view as any)}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={(view: string) => setCurrentView(view as any)}
        onOpenDonate={() => handleOpenDonate()}
      />

      {/* Modals & Dialogs */}
      {activeStoryId && (
        <StoryModal
          storyId={activeStoryId}
          onClose={() => setActiveStoryId(null)}
          onOpenDonate={(ngoId) => handleOpenDonate(ngoId)}
        />
      )}

      {activeProfileNGO && (
        <NGOProfileModal
          ngo={activeProfileNGO}
          onClose={() => setActiveProfileNGO(null)}
          onOpenDonate={handleOpenDonate}
        />
      )}

      {isDonateOpen && (
        <GiveSupportModal
          ngos={ngos}
          initialNGOId={targetDonateNGOId}
          onClose={() => setIsDonateOpen(false)}
          onDonationComplete={handleDonationComplete}
          onTrack={() => { setIsDonateOpen(false); setCurrentView('tracker'); }}
        />
      )}
    </div>
  );
}
