import { useEffect, useRef, useState } from 'react';
import { mockStations, type DWLRStation } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Waves, Activity, Wifi } from "lucide-react";

interface StationMapProps {
  onStationSelect: (station: DWLRStation) => void;
}

export function StationMap({ onStationSelect }: StationMapProps) {
  const [selectedStation, setSelectedStation] = useState<DWLRStation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleStationClick = (station: DWLRStation) => {
    setSelectedStation(station);
  };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-fade-in-up">
        {/* Loading header */}
        <div className="flex items-center justify-between animate-pulse">
          <div className="h-6 bg-muted rounded w-48"></div>
          <div className="h-4 bg-muted rounded w-24"></div>
        </div>
        
        {/* Loading map */}
        <Card className="h-64 flex items-center justify-center">
          <div className="text-center space-y-3">
            <Waves className="h-12 w-12 text-primary mx-auto animate-bounce-gentle" />
            <p className="text-muted-foreground font-medium">Loading stations...</p>
          </div>
        </Card>
        
        {/* Loading stations */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                  <div className="h-8 w-16 bg-muted rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Enhanced Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
              DWLR Network
            </h2>
            <p className="text-sm text-muted-foreground">Real-time monitoring across India</p>
          </div>
          <div className="flex items-center space-x-2 bg-success/10 px-3 py-1.5 rounded-full">
            <Wifi className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-success">{mockStations.length} Online</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="glass border-primary/20 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-3 text-center">
              <Activity className="h-6 w-6 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-primary">{mockStations.length}</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card className="glass border-warning/20 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-3 text-center">
              <MapPin className="h-6 w-6 text-warning mx-auto mb-1" />
              <p className="text-lg font-bold text-warning">
                {mockStations.filter(s => s.status === 'warning').length}
              </p>
              <p className="text-xs text-muted-foreground">Warning</p>
            </CardContent>
          </Card>
          <Card className="glass border-critical/20 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-3 text-center">
              <Waves className="h-6 w-6 text-critical mx-auto mb-1" />
              <p className="text-lg font-bold text-critical">
                {mockStations.filter(s => s.status === 'critical').length}
              </p>
              <p className="text-xs text-muted-foreground">Critical</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Map Area */}
      <Card className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-500">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="relative h-48 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="relative">
              <MapPin className="h-16 w-16 text-primary mx-auto animate-bounce-gentle" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
            </div>
            <div>
              <p className="font-semibold text-lg">Interactive Map View</p>
              <p className="text-sm text-muted-foreground">Tap stations below for detailed insights</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Enhanced Station List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center">
          <Activity className="h-5 w-5 mr-2 text-primary" />
          Active Monitoring Stations
        </h3>
        
        <div className="space-y-3">
          {mockStations.map((station, index) => (
            <Card 
              key={station.id} 
              className="cursor-pointer hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border border-border/50 hover:border-primary/30 glass"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'slide-up 0.5s ease-out forwards'
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold text-lg">{station.name}</h4>
                      <StatusBadge status={station.status} />
                    </div>
                    
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {station.location.district}, {station.location.state}
                    </p>
                    
                    <div className="flex items-center space-x-4">
                      <div>
                        <span className="text-xs text-muted-foreground">Current Level</span>
                        <p className={`text-lg font-bold ${
                          station.currentLevel < station.previousLevel ? "text-critical" : "text-success"
                        }`}>
                          {station.currentLevel}m
                        </p>
                      </div>
                      
                      <div className="text-xs">
                        <span className="text-muted-foreground">24h Change: </span>
                        <span className={`font-medium ${
                          station.currentLevel < station.previousLevel ? "text-critical" : "text-success"
                        }`}>
                          {station.currentLevel < station.previousLevel ? '' : '+'}
                          {(station.currentLevel - station.previousLevel).toFixed(2)}m
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onStationSelect(station)}
                    className="gradient-primary text-white border-none hover:shadow-glow transition-all duration-300"
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}