import { User, Settings, Bell, Download, LogOut, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface UserProfileProps {
  userRole: string;
  onLogout: () => void;
}

export function UserProfile({ userRole, onLogout }: UserProfileProps) {
  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'citizen': return '👨‍👩‍👧‍👦 Citizen';
      case 'researcher': return '🔬 Researcher';
      case 'policymaker': return '🏛️ Policymaker';
      default: return 'User';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">Profile</h2>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* User Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Account Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="font-medium">{getRoleDisplay(userRole)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">User ID</p>
            <p className="font-medium text-xs font-mono">JW_{userRole.toUpperCase()}_001</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Account Status</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <span className="text-sm">Active</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notification Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Critical Alerts</p>
              <p className="text-xs text-muted-foreground">Immediate intervention required</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Daily Reports</p>
              <p className="text-xs text-muted-foreground">Summary of station activities</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Weekly Analysis</p>
              <p className="text-xs text-muted-foreground">Trends and insights</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Data & Privacy</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Download className="h-4 w-4 mr-2" />
            Export My Data
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Settings className="h-4 w-4 mr-2" />
            Privacy Settings
          </Button>
        </CardContent>
      </Card>

      {/* App Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">App Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Version</span>
            <span>1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last Sync</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Data Source</span>
            <span>NITI Aayog DWLR Network</span>
          </div>
        </CardContent>
      </Card>

      {/* Logout */}
      <Button 
        variant="destructive" 
        className="w-full"
        onClick={onLogout}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </div>
  );
}