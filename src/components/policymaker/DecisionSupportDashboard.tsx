import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ActionableReports } from "./ActionableReports";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  AlertTriangle, 
  TrendingDown, 
  Target, 
  FileText, 
  Activity,
  ThermometerSun,
  Droplets,
  Map
} from "lucide-react";

// Mock heatmap data for districts
const districtData = [
  { name: "Chennai", state: "Tamil Nadu", riskLevel: "Critical", waterLevel: -2.3, population: 4.9, priority: "High" },
  { name: "Delhi", state: "Delhi", riskLevel: "Warning", waterLevel: -1.8, population: 30.0, priority: "High" },
  { name: "Mumbai", state: "Maharashtra", riskLevel: "Normal", waterLevel: 0.5, population: 12.4, priority: "Medium" },
  { name: "Bangalore", state: "Karnataka", riskLevel: "Normal", waterLevel: 1.2, population: 8.4, priority: "Low" },
  { name: "Jaipur", state: "Rajasthan", riskLevel: "Warning", waterLevel: -1.5, population: 3.1, priority: "Medium" },
];

const anomalies = [
  {
    id: 1,
    type: "Rapid Depletion",
    location: "Chennai District",
    severity: "Critical",
    detected: "2024-01-15",
    description: "Water level dropped 2.3m in 5 days",
    recommendation: "Immediate water rationing and emergency supply activation"
  },
  {
    id: 2,
    type: "Sensor Malfunction",
    location: "Mumbai Coastal",
    severity: "Medium",
    detected: "2024-01-14",
    description: "Inconsistent readings from DWLR_002",
    recommendation: "Schedule maintenance visit within 48 hours"
  },
  {
    id: 3,
    type: "Unusual Recharge",
    location: "Bangalore Tech Hub",
    severity: "Low",
    detected: "2024-01-13",
    description: "Unexpected 1.2m rise without recorded rainfall",
    recommendation: "Investigate potential artificial recharge activities"
  }
];

export function DecisionSupportDashboard() {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'destructive';
      case 'Warning': return 'default';
      case 'Normal': return 'secondary';
      default: return 'secondary';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-critical';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">Decision Support Dashboard</h2>
        <p className="text-sm text-muted-foreground">Strategic insights for groundwater policy</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Critical Districts</p>
              <p className="text-2xl font-bold text-critical">127</p>
              <Badge variant="destructive" className="text-xs">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Urgent Action
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Avg Decline</p>
              <p className="text-2xl font-bold text-warning">-0.45m</p>
              <Badge variant="secondary" className="text-xs">
                <TrendingDown className="h-3 w-3 mr-1" />
                30 Days
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Policy Actions</p>
              <p className="text-2xl font-bold">34</p>
              <Badge variant="secondary" className="text-xs">
                <Target className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Budget Impact</p>
              <p className="text-2xl font-bold">₹2.4B</p>
              <Badge variant="secondary" className="text-xs">
                <Activity className="h-3 w-3 mr-1" />
                Allocated
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Map className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="anomalies" className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Anomalies</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Reports</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {/* District Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>District Risk Assessment</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {districtData.map((district, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-sm">{district.name}</h4>
                          <Badge variant={getRiskColor(district.riskLevel)} className="text-xs">
                            {district.riskLevel}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {district.state} • Pop: {district.population}M
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <p className={`text-sm font-medium ${district.waterLevel < 0 ? 'text-critical' : 'text-success'}`}>
                        {district.waterLevel > 0 ? '+' : ''}{district.waterLevel}m
                      </p>
                      <p className="text-xs text-muted-foreground">Priority: {district.priority}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Policy Implementation Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Policy Implementation Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Artificial Recharge Projects</span>
                    <span>67/100 districts</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Water Conservation Measures</span>
                    <span>89/150 districts</span>
                  </div>
                  <Progress value={59} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monitoring Network Expansion</span>
                    <span>234/300 stations</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Community Awareness Programs</span>
                    <span>412/500 villages</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="anomalies" className="space-y-4">
          {/* Active Anomalies */}
          <div className="space-y-4">
            {anomalies.map((anomaly) => (
              <Alert key={anomaly.id} className="border-l-4 border-l-critical">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{anomaly.type}</span>
                        <Badge variant="outline" className="text-xs">
                          {anomaly.location}
                        </Badge>
                      </div>
                      <span className={`text-xs font-medium ${getSeverityColor(anomaly.severity)}`}>
                        {anomaly.severity}
                      </span>
                    </div>
                    
                    <p className="text-sm">{anomaly.description}</p>
                    
                    <div className="bg-muted/50 p-2 rounded text-xs">
                      <span className="font-medium">Recommendation: </span>
                      {anomaly.recommendation}
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      Detected: {new Date(anomaly.detected).toLocaleDateString()}
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>

          {/* Seasonal Risk Indicators */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center space-x-2">
                <ThermometerSun className="h-4 w-4" />
                <span>Seasonal Risk Indicators</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Pre-Monsoon Risk</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    High depletion risk in 78% of monitored districts
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <ThermometerSun className="h-4 w-4 text-warning" />
                    <span className="text-sm font-medium">Summer Stress</span>
                  </div>
                  <Progress value={92} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Expected high stress in 92% of drought-prone areas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <ActionableReports />
        </TabsContent>
      </Tabs>
    </div>
  );
}