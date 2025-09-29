import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdvancedCharts } from "@/components/charts/AdvancedCharts";
import { ForecastingTools } from "./ForecastingTools";
import { DataExportTools } from "./DataExportTools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Activity, Database, Download, Brain } from "lucide-react";

export function ResearcherDashboard() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">Researcher Dashboard</h2>
        <p className="text-sm text-muted-foreground">Advanced analytics and forecasting tools</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Active Models</p>
              <p className="text-2xl font-bold">12</p>
              <Badge variant="secondary" className="text-xs">
                <Brain className="h-3 w-3 mr-1" />
                Running
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Data Points</p>
              <p className="text-2xl font-bold">2.4M</p>
              <Badge variant="secondary" className="text-xs">
                <Database className="h-3 w-3 mr-1" />
                Updated
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Avg Accuracy</p>
              <p className="text-2xl font-bold">94.2%</p>
              <Badge variant="secondary" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                Excellent
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Exports</p>
              <p className="text-2xl font-bold">156</p>
              <Badge variant="secondary" className="text-xs">
                <Download className="h-3 w-3 mr-1" />
                This Month
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="forecasting" className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>Forecasting</span>
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdvancedCharts 
              title="Water Level Trends" 
              type="trends" 
            />
            <AdvancedCharts 
              title="Seasonal Variations" 
              type="seasonal" 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdvancedCharts 
              title="Rainfall Correlation" 
              type="correlation" 
            />
            <AdvancedCharts 
              title="Level Distribution" 
              type="distribution" 
            />
          </div>

          {/* Research Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>Research Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Key Findings</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• 23% decline in pre-monsoon levels (2019-2024)</li>
                    <li>• Strong correlation (r=0.84) with rainfall patterns</li>
                    <li>• Faster recovery rates in coastal regions</li>
                    <li>• Urban stations show 15% higher variability</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Anomalies Detected</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Rapid drawdown in Chennai region (Jan 10-15)</li>
                    <li>• Unusual recharge pattern in Mumbai (Dec 2024)</li>
                    <li>• Sensor calibration drift at 3 stations</li>
                    <li>• Data gaps during monsoon season</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forecasting" className="space-y-4">
          <ForecastingTools />
        </TabsContent>
        
        <TabsContent value="export" className="space-y-4">
          <DataExportTools />
        </TabsContent>
      </Tabs>
    </div>
  );
}