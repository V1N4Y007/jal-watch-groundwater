import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { userRoles } from "@/data/mockData";

interface RoleSelectionProps {
  onRoleSelect: (role: string) => void;
}

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">JalWatch</h1>
          <p className="text-muted-foreground">Real-time Groundwater Monitoring</p>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Choose Your Role</h2>
          
          {userRoles.map((role) => (
            <Card key={role.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{role.icon}</span>
                  <div>
                    <CardTitle className="text-lg">{role.title}</CardTitle>
                    <CardDescription>{role.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  onClick={() => onRoleSelect(role.id)}
                  className="w-full"
                  variant="outline"
                >
                  Select {role.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <p className="text-xs text-muted-foreground text-center">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}