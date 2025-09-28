import { Home, AlertTriangle, BarChart3, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'alerts', icon: AlertTriangle, label: 'Alerts' },
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/50 z-50 glass">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center py-3 px-4 rounded-2xl transition-all duration-300 transform min-w-[64px] relative",
                isActive 
                  ? "text-primary scale-110 -translate-y-1" 
                  : "text-muted-foreground hover:text-foreground hover:scale-105"
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute inset-0 bg-primary/10 rounded-2xl animate-scale-in"></div>
              )}
              
              {/* Icon with glow effect */}
              <div className={cn(
                "relative z-10 p-1 rounded-full transition-all duration-300",
                isActive && "shadow-glow"
              )}>
                <Icon className={cn(
                  "h-6 w-6 transition-all duration-300",
                  isActive && "drop-shadow-sm"
                )} />
              </div>
              
              {/* Label */}
              <span className={cn(
                "text-xs font-medium mt-1 relative z-10 transition-all duration-300",
                isActive ? "font-semibold" : "font-normal"
              )}>
                {tab.label}
              </span>
              
              {/* Active dot */}
              {isActive && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse-glow"></div>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Safe area for iPhone */}
      <div className="h-safe-area-inset-bottom bg-card/95"></div>
    </div>
  );
}