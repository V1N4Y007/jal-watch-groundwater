import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { userRoles } from "@/data/mockData";
import { Droplet, Waves } from "lucide-react";

interface RoleSelectionProps {
  onRoleSelect: (role: string) => void;
}

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <Waves className="absolute top-10 left-10 h-20 w-20 text-white animate-bounce-gentle" />
        <Droplet className="absolute bottom-20 right-10 h-16 w-16 text-white animate-pulse" />
        <Waves className="absolute top-1/2 left-1/4 h-12 w-12 text-white animate-bounce-gentle" style={{animationDelay: '1s'}} />
      </div>
      
      <div className="w-full max-w-sm space-y-8 animate-fade-in-up relative z-10">
        {/* Hero Header */}
        <div className="text-center space-y-4">
          <div className="relative">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              JalWatch
            </h1>
            <div className="absolute -inset-1 bg-white/20 blur-xl rounded-full"></div>
          </div>
          <p className="text-white/90 text-lg font-medium">
            Real-time Groundwater Monitoring
          </p>
          <div className="w-16 h-1 bg-white/40 rounded-full mx-auto"></div>
        </div>
        
        {/* Role Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center text-white mb-6">
            Choose Your Role
          </h2>
          
          {userRoles.map((role, index) => (
            <Card 
              key={role.id} 
              className="glass cursor-pointer hover:shadow-glow-lg transform hover:scale-105 transition-all duration-300 border-white/20 backdrop-blur-md"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'slide-up 0.5s ease-out forwards'
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl bg-white/10 p-3 rounded-full backdrop-blur-sm">
                    {role.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg text-white">{role.title}</CardTitle>
                    <CardDescription className="text-white/80">
                      {role.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  onClick={() => onRoleSelect(role.id)}
                  className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 transition-all duration-300 backdrop-blur-sm font-medium"
                  size="lg"
                >
                  Select {role.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <p className="text-xs text-white/70 text-center leading-relaxed">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}