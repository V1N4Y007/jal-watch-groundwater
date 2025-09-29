import { useState } from "react";
import { RoleSelection } from "@/components/onboarding/RoleSelection";
import { StationMap } from "@/components/home/StationMap";
import { StationDetail } from "@/components/station/StationDetail";
import { AlertsList } from "@/components/alerts/AlertsList";
import { PolicyDashboard } from "@/components/dashboard/PolicyDashboard";
import { ResearcherDashboard } from "@/components/researcher/ResearcherDashboard";
import { DecisionSupportDashboard } from "@/components/policymaker/DecisionSupportDashboard";
import { UserProfile } from "@/components/profile/UserProfile";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { type DWLRStation } from "@/data/mockData";

type AppState = 'onboarding' | 'main';
type MainView = 'home' | 'alerts' | 'dashboard' | 'researcher' | 'policy' | 'profile' | 'station-detail';

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
      case 'researcher':
        return <ResearcherDashboard />;
      case 'policy':
        return <DecisionSupportDashboard />;
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
      {/* Main Content */}
      <div className="pb-20 px-4 pt-4 max-w-md mx-auto">
        {renderMainContent()}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={currentView === 'station-detail' ? 'home' : currentView} 
        onTabChange={handleTabChange}
        userRole={userRole}
      />
    </div>
  );
};

export default JalWatchApp;