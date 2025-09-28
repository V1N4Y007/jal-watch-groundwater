import { Bell, AlertTriangle, Droplets, Wrench, AlertCircle } from "lucide-react";
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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Alerts</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unreadCount} new
            </Badge>
          )}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {mockAlerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          const colorVariant = getAlertColor(alert.severity);
          
          return (
            <Card 
              key={alert.id} 
              className={cn(
                "cursor-pointer hover:shadow-md transition-shadow",
                !alert.isRead && "border-l-4 border-l-primary bg-primary/5"
              )}
              onClick={() => onAlertClick?.(alert)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={cn(
                    "p-2 rounded-full",
                    colorVariant === 'critical' && "bg-critical/10 text-critical",
                    colorVariant === 'warning' && "bg-warning/10 text-warning",
                    colorVariant === 'success' && "bg-success/10 text-success"
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{alert.stationName}</p>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={colorVariant === 'critical' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {alert.severity}
                        </Badge>
                        {!alert.isRead && (
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-foreground">{alert.message}</p>
                    
                    <p className="text-xs text-muted-foreground">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alert Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Alert Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-critical">
                {mockAlerts.filter(a => a.severity === 'high').length}
              </p>
              <p className="text-xs text-muted-foreground">High Priority</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">
                {mockAlerts.filter(a => a.severity === 'medium').length}
              </p>
              <p className="text-xs text-muted-foreground">Medium Priority</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">
                {mockAlerts.filter(a => a.severity === 'low').length}
              </p>
              <p className="text-xs text-muted-foreground">Low Priority</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}