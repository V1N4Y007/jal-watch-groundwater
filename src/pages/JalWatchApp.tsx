import { useState } from "react";
import { RoleSelection } from "@/components/onboarding/RoleSelection";
import { StationMap } from "@/components/home/StationMap";
import { StationDetail } from "@/components/station/StationDetail";
import { AlertsList } from "@/components/alerts/AlertsList";
import { PolicyDashboard } from "@/components/dashboard/PolicyDashboard";
import { UserProfile } from "@/components/profile/UserProfile";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { type DWLRStation } from "@/data/mockData";

type AppState = 'onboarding' | 'main';
type MainView = 'home' | 'alerts' | 'dashboard' | 'profile' | 'station-detail';

const JalWatchApp = () => {
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [userRole, setUserRole] = useState<string>('');
  const [currentView, setCurrentView] = useState<MainView>('home');
  const [selectedStation, setSelectedStation] = useState<DWLRStation | null>(null);

  const handleRoleSelect = (role: string) => {
    setUserRole(role);
    setAppState('main');
  };

  const handleStationSelect = (station: DWLRStation) => {
    setSelectedStation(station);
    setCurrentView('station-detail');
  };

  const handleTabChange = (tab: string) => {
    setCurrentView(tab as MainView);
    if (tab !== 'station-detail') {
      setSelectedStation(null);
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedStation(null);
  };

  const handleLogout = () => {
    setAppState('onboarding');
    setUserRole('');
    setCurrentView('home');
    setSelectedStation(null);
  };

  if (appState === 'onboarding') {
    return <RoleSelection onRoleSelect={handleRoleSelect} />;
  }

  const renderMainContent = () => {
    switch (currentView) {
      case 'home':
        return <StationMap onStationSelect={handleStationSelect} />;
      case 'alerts':
        return <AlertsList />;
      case 'dashboard':
        return <PolicyDashboard />;
      case 'profile':
        return <UserProfile userRole={userRole} onLogout={handleLogout} />;
      case 'station-detail':
        return selectedStation ? (
          <StationDetail station={selectedStation} onBack={handleBackToHome} />
        ) : (
          <StationMap onStationSelect={handleStationSelect} />
        );
      default:
        return <StationMap onStationSelect={handleStationSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Status Bar Background for mobile */}
      <div className="h-safe-area-inset-top bg-primary/5"></div>
      
      {/* Main Content Container */}
      <div className="pb-24 px-4 pt-6 max-w-md mx-auto min-h-screen">
        <div className="animate-fade-in-up">
          {renderMainContent()}
        </div>
      </div>

      {/* Enhanced Bottom Navigation */}
      <BottomNavigation 
        activeTab={currentView === 'station-detail' ? 'home' : currentView} 
        onTabChange={handleTabChange} 
      />
    </div>
  );
};

export default JalWatchApp;