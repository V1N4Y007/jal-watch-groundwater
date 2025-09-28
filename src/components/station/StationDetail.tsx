import { ArrowLeft, Download, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { type DWLRStation } from "@/data/mockData";

interface StationDetailProps {
  station: DWLRStation;
  onBack: () => void;
}

export function StationDetail({ station, onBack }: StationDetailProps) {
  const levelChange = station.currentLevel - station.previousLevel;
  const isPositive = levelChange > 0;

  const exportCSV = () => {
    const csvData = [
      ['Date', 'Water Level (m)'],
      ...station.weeklyData.map(d => [d.date, d.level.toString()])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${station.name.replace(/\s+/g, '_')}_data.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Calculate specific yield and recharge using the formula: ΔS = Sy × Δh
  const specificYield = 0.15; // Typical value for sandy loam
  const recharge = specificYield * levelChange;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{station.name}</h1>
          <p className="text-sm text-muted-foreground">
            {station.location.district}, {station.location.state}
          </p>
        </div>
        <StatusBadge status={station.status} />
      </div>

      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Water Level</p>
              <p className="text-2xl font-bold">{station.currentLevel}m</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">24h Change</p>
              <div className="flex items-center space-x-1">
                {isPositive ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-critical" />
                )}
                <p className={`text-lg font-semibold ${isPositive ? 'text-success' : 'text-critical'}`}>
                  {isPositive ? '+' : ''}{levelChange.toFixed(2)}m
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date(station.lastUpdated).toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recharge Formula */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recharge Calculation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm font-mono">ΔS = Sy × Δh</p>
            <p className="text-xs text-muted-foreground mt-1">
              Change in Storage = Specific Yield × Change in Head
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Sy</p>
              <p className="font-medium">{specificYield}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Δh</p>
              <p className="font-medium">{levelChange.toFixed(2)}m</p>
            </div>
            <div>
              <p className="text-muted-foreground">ΔS</p>
              <p className={`font-medium ${recharge > 0 ? 'text-success' : 'text-critical'}`}>
                {recharge.toFixed(3)}m
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Trend */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">7-Day Trend</CardTitle>
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="h-4 w-4 mr-1" />
            CSV
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={station.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  label={{ value: 'Water Level (m)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value: any) => [`${value}m`, 'Water Level']}
                />
                <Line 
                  type="monotone" 
                  dataKey="level" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}