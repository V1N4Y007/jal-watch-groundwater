import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Legend, ScatterChart, Scatter } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, BarChart3 } from "lucide-react";

// Mock data for advanced charts
const waterLevelTrends = [
  { month: 'Jan', current: 12.5, previous: 13.2, predicted: 12.8 },
  { month: 'Feb', current: 11.8, previous: 12.9, predicted: 12.1 },
  { month: 'Mar', current: 10.2, previous: 11.5, predicted: 10.8 },
  { month: 'Apr', current: 8.9, previous: 10.1, predicted: 9.5 },
  { month: 'May', current: 7.8, previous: 9.2, predicted: 8.2 },
  { month: 'Jun', current: 9.1, previous: 8.8, predicted: 8.9 },
];

const seasonalVariation = [
  { season: 'Pre-Monsoon', avg: 8.2, min: 6.1, max: 10.3 },
  { season: 'Monsoon', avg: 12.8, min: 10.5, max: 15.2 },
  { season: 'Post-Monsoon', avg: 14.1, min: 12.8, max: 16.4 },
  { season: 'Winter', avg: 11.6, min: 9.8, max: 13.2 },
];

const correlationData = [
  { rainfall: 45, waterLevel: 8.2 },
  { rainfall: 120, waterLevel: 12.8 },
  { rainfall: 200, waterLevel: 15.1 },
  { rainfall: 80, waterLevel: 10.5 },
  { rainfall: 160, waterLevel: 14.2 },
  { rainfall: 95, waterLevel: 11.8 },
];

interface AdvancedChartsProps {
  title: string;
  type: 'trends' | 'seasonal' | 'correlation' | 'distribution';
}

export function AdvancedCharts({ title, type }: AdvancedChartsProps) {
  const renderChart = () => {
    switch (type) {
      case 'trends':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={waterLevelTrends}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="current" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Current Year"
              />
              <Line 
                type="monotone" 
                dataKey="previous" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Previous Year"
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="hsl(var(--warning))" 
                strokeWidth={2}
                name="Predicted"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'seasonal':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={seasonalVariation}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="season" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="max" 
                stackId="1"
                stroke="hsl(var(--success))" 
                fill="hsl(var(--success) / 0.2)"
              />
              <Area 
                type="monotone" 
                dataKey="avg" 
                stackId="2"
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary) / 0.4)"
              />
              <Area 
                type="monotone" 
                dataKey="min" 
                stackId="3"
                stroke="hsl(var(--critical))" 
                fill="hsl(var(--critical) / 0.2)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'correlation':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart data={correlationData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="rainfall" 
                name="Rainfall (mm)" 
                className="text-xs"
              />
              <YAxis 
                dataKey="waterLevel" 
                name="Water Level (m)" 
                className="text-xs"
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value, name) => [
                  `${value}${name === 'rainfall' ? 'mm' : 'm'}`,
                  name === 'rainfall' ? 'Rainfall' : 'Water Level'
                ]}
              />
              <Scatter 
                dataKey="waterLevel" 
                fill="hsl(var(--primary))"
              />
            </ScatterChart>
          </ResponsiveContainer>
        );

      case 'distribution':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={seasonalVariation}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="season" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Legend />
              <Bar dataKey="avg" fill="hsl(var(--primary))" name="Average" />
              <Bar dataKey="min" fill="hsl(var(--critical))" name="Minimum" />
              <Bar dataKey="max" fill="hsl(var(--success))" name="Maximum" />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'trends':
        return <TrendingUp className="h-4 w-4" />;
      case 'seasonal':
        return <Activity className="h-4 w-4" />;
      case 'correlation':
        return <TrendingDown className="h-4 w-4" />;
      case 'distribution':
        return <BarChart3 className="h-4 w-4" />;
      default:
        return <BarChart3 className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center space-x-2">
          {getIcon()}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
}