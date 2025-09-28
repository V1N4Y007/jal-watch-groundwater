import { Bell, AlertTriangle, Droplets, Wrench, AlertCircle, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockAlerts, type Alert } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface AlertsListProps {
  onAlertClick?: (alert: Alert) => void;
}

export function AlertsList({ onAlertClick }: AlertsListProps) {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'drawdown': return AlertTriangle;
      case 'recharge': return Droplets;
      case 'critical': return AlertCircle;
      case 'maintenance': return Wrench;
      default: return Bell;
    }
  };

  const getAlertColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high': return 'critical';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'muted';
    }
  };

  const unreadCount = mockAlerts.filter(alert => !alert.isRead).length;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Enhanced Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bell className="h-6 w-6 text-primary" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-critical text-critical-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse-glow">
                  {unreadCount}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">Alert Center</h2>
              <p className="text-sm text-muted-foreground">Real-time system notifications</p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="animate-bounce-gentle">
              {unreadCount} new
            </Badge>
          )}
        </div>

        {/* Alert Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="glass border-critical/20 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-3 text-center">
              <Zap className="h-6 w-6 text-critical mx-auto mb-1" />
              <p className="text-lg font-bold text-critical">
                {mockAlerts.filter(a => a.severity === 'high').length}
              </p>
              <p className="text-xs text-muted-foreground">High Priority</p>
            </CardContent>
          </Card>
          <Card className="glass border-warning/20 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-3 text-center">
              <AlertTriangle className="h-6 w-6 text-warning mx-auto mb-1" />
              <p className="text-lg font-bold text-warning">
                {mockAlerts.filter(a => a.severity === 'medium').length}
              </p>
              <p className="text-xs text-muted-foreground">Medium Priority</p>
            </CardContent>
          </Card>
          <Card className="glass border-success/20 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-3 text-center">
              <Bell className="h-6 w-6 text-success mx-auto mb-1" />
              <p className="text-lg font-bold text-success">
                {mockAlerts.filter(a => a.severity === 'low').length}
              </p>
              <p className="text-xs text-muted-foreground">Low Priority</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Alerts List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-primary" />
          Recent Alerts
        </h3>
        
        <div className="space-y-3">
          {mockAlerts.map((alert, index) => {
            const Icon = getAlertIcon(alert.type);
            const colorVariant = getAlertColor(alert.severity);
            
            return (
              <Card 
                key={alert.id} 
                className={cn(
                  "cursor-pointer hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 glass relative overflow-hidden",
                  !alert.isRead && "ring-2 ring-primary/20 shadow-glow",
                  colorVariant === 'critical' && "border-l-4 border-l-critical bg-critical/5",
                  colorVariant === 'warning' && "border-l-4 border-l-warning bg-warning/5",
                  colorVariant === 'success' && "border-l-4 border-l-success bg-success/5"
                )}
                onClick={() => onAlertClick?.(alert)}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slide-up 0.5s ease-out forwards'
                }}
              >
                {/* Shimmer effect for unread */}
                {!alert.isRead && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer"></div>
                )}
                
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    {/* Enhanced Icon */}
                    <div className={cn(
                      "p-3 rounded-full transition-all duration-300",
                      colorVariant === 'critical' && "bg-critical/10 text-critical",
                      colorVariant === 'warning' && "bg-warning/10 text-warning",
                      colorVariant === 'success' && "bg-success/10 text-success",
                      !alert.isRead && "animate-pulse-glow"
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-lg">{alert.stationName}</h4>
                          {!alert.isRead && (
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                          )}
                        </div>
                        <Badge 
                          variant={colorVariant === 'critical' ? 'destructive' : 'secondary'}
                          className={cn(
                            "text-xs font-medium",
                            colorVariant === 'warning' && "bg-warning text-warning-foreground",
                            colorVariant === 'success' && "bg-success text-success-foreground"
                          )}
                        >
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <p className="text-base font-medium leading-relaxed">{alert.message}</p>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                        <div className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          alert.type === 'drawdown' && "bg-critical/10 text-critical",
                          alert.type === 'recharge' && "bg-success/10 text-success",
                          alert.type === 'critical' && "bg-critical/10 text-critical",
                          alert.type === 'maintenance' && "bg-warning/10 text-warning"
                        )}>
                          {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}