import { useState } from "react";
import { User, Settings, Bell, Download, LogOut, Shield, MapPin, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface UserProfileProps {
  userRole: string;
  onLogout: () => void;
}

export function UserProfile({ userRole, onLogout }: UserProfileProps) {
  // Privacy Settings State
  const [locationSharing, setLocationSharing] = useState(false);
  const [notificationPreferences, setNotificationPreferences] = useState(true);
  const [dataUsageOptIn, setDataUsageOptIn] = useState(false);

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

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Privacy Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Location Sharing</p>
                <p className="text-xs text-muted-foreground">Share location for nearby station alerts</p>
              </div>
            </div>
            <Switch 
              checked={locationSharing}
              onCheckedChange={setLocationSharing}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Alert Notifications</p>
                <p className="text-xs text-muted-foreground">Get notified about water level changes</p>
              </div>
            </div>
            <Switch 
              checked={notificationPreferences}
              onCheckedChange={setNotificationPreferences}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Database className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Research Data Sharing</p>
                <p className="text-xs text-muted-foreground">Contribute anonymized data for research</p>
              </div>
            </div>
            <Switch 
              checked={dataUsageOptIn}
              onCheckedChange={setDataUsageOptIn}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Data Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Download className="h-4 w-4 mr-2" />
            Export My Data
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