import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Brain, Target, AlertTriangle } from "lucide-react";
import { useState } from "react";

// Mock forecasting data
const arimaForecast = [
  { date: '2024-01-15', actual: 12.5, predicted: 12.3, confidence_upper: 13.1, confidence_lower: 11.5 },
  { date: '2024-01-16', actual: null, predicted: 12.1, confidence_upper: 12.9, confidence_lower: 11.3 },
  { date: '2024-01-17', actual: null, predicted: 11.8, confidence_upper: 12.6, confidence_lower: 11.0 },
  { date: '2024-01-18', actual: null, predicted: 11.5, confidence_upper: 12.3, confidence_lower: 10.7 },
  { date: '2024-01-19', actual: null, predicted: 11.2, confidence_upper: 12.0, confidence_lower: 10.4 },
  { date: '2024-01-20', actual: null, predicted: 10.9, confidence_upper: 11.7, confidence_lower: 10.1 },
  { date: '2024-01-21', actual: null, predicted: 10.6, confidence_upper: 11.4, confidence_lower: 9.8 },
];

const lstmForecast = [
  { date: '2024-01-15', actual: 12.5, predicted: 12.4, confidence_upper: 13.0, confidence_lower: 11.8 },
  { date: '2024-01-16', actual: null, predicted: 12.2, confidence_upper: 12.8, confidence_lower: 11.6 },
  { date: '2024-01-17', actual: null, predicted: 11.9, confidence_upper: 12.5, confidence_lower: 11.3 },
  { date: '2024-01-18', actual: null, predicted: 11.7, confidence_upper: 12.3, confidence_lower: 11.1 },
  { date: '2024-01-19', actual: null, predicted: 11.4, confidence_upper: 12.0, confidence_lower: 10.8 },
  { date: '2024-01-20', actual: null, predicted: 11.2, confidence_upper: 11.8, confidence_lower: 10.6 },
  { date: '2024-01-21', actual: null, predicted: 11.0, confidence_upper: 11.6, confidence_lower: 10.4 },
];

export function ForecastingTools() {
  const [selectedModel, setSelectedModel] = useState("arima");
  const [selectedStation, setSelectedStation] = useState("DWLR_001");
  const [forecastHorizon, setForecastHorizon] = useState("7days");

  const getCurrentForecast = () => {
    return selectedModel === "arima" ? arimaForecast : lstmForecast;
  };

  const getModelAccuracy = () => {
    return selectedModel === "arima" ? 
      { mae: 0.23, rmse: 0.31, mape: 2.1 } : 
      { mae: 0.19, rmse: 0.28, mape: 1.8 };
  };

  const runForecast = () => {
    console.log(`Running ${selectedModel.toUpperCase()} forecast for ${selectedStation} with ${forecastHorizon} horizon`);
    // Mock API call to generate forecast
  };

  return (
    <div className="space-y-4">
      {/* Model Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>Forecasting Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Model Type</label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arima">ARIMA (Time Series)</SelectItem>
                  <SelectItem value="lstm">LSTM (Deep Learning)</SelectItem>
                  <SelectItem value="ensemble">Ensemble Model</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Station</label>
              <Select value={selectedStation} onValueChange={setSelectedStation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DWLR_001">Delhi Central Station</SelectItem>
                  <SelectItem value="DWLR_002">Mumbai Coastal Monitor</SelectItem>
                  <SelectItem value="DWLR_003">Chennai Water Point</SelectItem>
                  <SelectItem value="DWLR_004">Bangalore Tech Hub</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Forecast Horizon</label>
              <Select value={forecastHorizon} onValueChange={setForecastHorizon}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">7 Days</SelectItem>
                  <SelectItem value="30days">30 Days</SelectItem>
                  <SelectItem value="90days">90 Days</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={runForecast} className="w-full">
            <Target className="h-4 w-4 mr-2" />
            Generate Forecast
          </Button>
        </CardContent>
      </Card>

      {/* Model Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Mean Absolute Error</p>
              <p className="text-2xl font-bold">{getModelAccuracy().mae}m</p>
              <Badge variant="secondary" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                Good
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Root Mean Square Error</p>
              <p className="text-2xl font-bold">{getModelAccuracy().rmse}m</p>
              <Badge variant="secondary" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                Good
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Mean Absolute % Error</p>
              <p className="text-2xl font-bold">{getModelAccuracy().mape}%</p>
              <Badge variant="secondary" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                Excellent
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Forecast Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>{selectedModel.toUpperCase()} Forecast - {selectedStation}</span>
            </div>
            <Badge variant="outline">{forecastHorizon}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={getCurrentForecast()}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                className="text-xs"
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value, name) => [
                  `${Number(value).toFixed(2)}m`,
                  name === 'actual' ? 'Actual' :
                  name === 'predicted' ? 'Predicted' :
                  name === 'confidence_upper' ? 'Upper Bound' :
                  'Lower Bound'
                ]}
              />
              
              {/* Confidence Interval */}
              <Area
                type="monotone"
                dataKey="confidence_upper"
                stackId="1"
                stroke="none"
                fill="hsl(var(--primary) / 0.1)"
              />
              <Area
                type="monotone"
                dataKey="confidence_lower"
                stackId="1"
                stroke="none"
                fill="hsl(var(--background))"
              />
              
              {/* Actual Values */}
              <Line
                type="monotone"
                dataKey="actual"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
              
              {/* Predicted Values */}
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Forecast Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Forecast Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-critical/10 rounded-lg border border-critical/20">
            <AlertTriangle className="h-4 w-4 text-critical mt-0.5" />
            <div>
              <p className="text-sm font-medium">Critical Level Warning</p>
              <p className="text-xs text-muted-foreground">
                Water level predicted to reach critical threshold (8.0m) by Jan 20, 2024
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
            <TrendingUp className="h-4 w-4 text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium">Declining Trend Detected</p>
              <p className="text-xs text-muted-foreground">
                Steady decline of 0.3m/day expected over the next week
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}