import { Home, AlertTriangle, BarChart3, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole: string;
}

export function BottomNavigation({ activeTab, onTabChange, userRole }: BottomNavigationProps) {
  const getTabsForRole = (role: string) => {
    const baseTabs = [
      { id: 'home', icon: Home, label: 'Home' },
      { id: 'alerts', icon: AlertTriangle, label: 'Alerts' },
    ];

    switch (role) {
      case 'researcher':
        return [
          ...baseTabs,
          { id: 'researcher', icon: BarChart3, label: 'Research' },
          { id: 'profile', icon: User, label: 'Profile' },
        ];
      case 'policymaker':
        return [
          ...baseTabs,
          { id: 'policy', icon: BarChart3, label: 'Policy' },
          { id: 'profile', icon: User, label: 'Profile' },
        ];
      default: // citizen
        return [
          ...baseTabs,
          { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
          { id: 'profile', icon: User, label: 'Profile' },
        ];
    }
  };

  const tabs = getTabsForRole(userRole);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors min-w-[60px]",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}