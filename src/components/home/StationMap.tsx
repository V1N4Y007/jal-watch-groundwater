import { useEffect, useRef, useState } from 'react';
import { mockStations, type DWLRStation } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

interface StationMapProps {
  onStationSelect: (station: DWLRStation) => void;
}

export function StationMap({ onStationSelect }: StationMapProps) {
  const [selectedStation, setSelectedStation] = useState<DWLRStation | null>(null);
  
  // Mock map implementation - in real app, this would use Mapbox
  const handleStationClick = (station: DWLRStation) => {
    setSelectedStation(station);
  };

  return (
    <div className="space-y-4">
      {/* Map Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">DWLR Station Network</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-success"></div>
          <span>Online: {mockStations.length}</span>
        </div>
      </div>

      {/* Mock Map Area */}
      <Card className="h-64 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <div className="text-center space-y-2">
            <MapPin className="h-8 w-8 text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">Interactive Map View</p>
            <p className="text-xs text-muted-foreground">Click stations below to view details</p>
          </div>
        </div>
      </Card>

      {/* Station List */}
      <div className="space-y-3">
        <h3 className="font-medium">Active Stations</h3>
        {mockStations.map((station) => (
          <Card key={station.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{station.name}</h4>
                    <StatusBadge status={station.status} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {station.location.district}, {station.location.state}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Current Level: </span>
                    <span className={station.currentLevel < station.previousLevel ? "text-critical" : "text-success"}>
                      {station.currentLevel}m
                    </span>
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onStationSelect(station)}
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
  );
}