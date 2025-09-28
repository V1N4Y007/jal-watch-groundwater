import { TrendingDown, TrendingUp, AlertTriangle, Activity, Wifi, WifiOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockPolicyMetrics } from "@/data/mockData";

export function PolicyDashboard() {
  const metrics = mockPolicyMetrics;
  const isNegativeChange = metrics.avgWaterLevelChange < 0;
  const onlinePercentage = (metrics.stationsOnline / metrics.totalStations) * 100;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">Policy Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date(metrics.lastUpdated).toLocaleString()}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              {isNegativeChange ? (
                <TrendingDown className="h-4 w-4 text-critical" />
              ) : (
                <TrendingUp className="h-4 w-4 text-success" />
              )}
              <span>Avg Water Level Change</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${isNegativeChange ? 'text-critical' : 'text-success'}`}>
              {isNegativeChange ? '' : '+'}{metrics.avgWaterLevelChange.toFixed(2)}m
            </p>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span>Critical Stations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-critical">
              {metrics.criticalStationsPercentage}%
            </p>
            <p className="text-xs text-muted-foreground">
              {Math.round((metrics.criticalStationsPercentage / 100) * metrics.totalStations)} stations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Network Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Network Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wifi className="h-4 w-4 text-success" />
              <span className="text-sm">Stations Online</span>
            </div>
            <span className="font-medium">{metrics.stationsOnline}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <WifiOff className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Stations Offline</span>
            </div>
            <span className="font-medium">{metrics.totalStations - metrics.stationsOnline}</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Network Availability</span>
              <span>{onlinePercentage.toFixed(1)}%</span>
            </div>
            <Progress value={onlinePercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Drought Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Drought Risk Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-warning">{metrics.droughtProneDistricts}</p>
              <p className="text-sm text-muted-foreground">Districts at Risk</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{metrics.totalStations}</p>
              <p className="text-sm text-muted-foreground">Total DWLR Stations</p>
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>High Risk</span>
                <span className="text-critical">45 districts</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Medium Risk</span>
                <span className="text-warning">67 districts</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Low Risk</span>
                <span className="text-success">15 districts</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recommended Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-critical mt-2"></div>
              <div>
                <p className="text-sm font-medium">Immediate intervention needed</p>
                <p className="text-xs text-muted-foreground">
                  3 districts showing rapid groundwater depletion
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-warning mt-2"></div>
              <div>
                <p className="text-sm font-medium">Enhance monitoring</p>
                <p className="text-xs text-muted-foreground">
                  Deploy additional sensors in 12 high-risk areas
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-success mt-2"></div>
              <div>
                <p className="text-sm font-medium">Conservation programs</p>
                <p className="text-xs text-muted-foreground">
                  Implement rainwater harvesting in 25 districts
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}