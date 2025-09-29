import { useEffect, useRef, useState } from 'react';
import { mockStations, type DWLRStation } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, ZoomIn, ZoomOut } from "lucide-react";

interface StationMapProps {
  onStationSelect: (station: DWLRStation) => void;
}

export function StationMap({ onStationSelect }: StationMapProps) {
  const [selectedStation, setSelectedStation] = useState<DWLRStation | null>(null);
  const [mapScale, setMapScale] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const handleStationClick = (station: DWLRStation) => {
    setSelectedStation(station);
    onStationSelect(station);
  };

  const handleZoomIn = () => {
    setMapScale(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setMapScale(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - mapPosition.x, y: e.clientY - mapPosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setMapPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Convert lat/lng to pixel coordinates for our mock map
  const getMarkerPosition = (station: DWLRStation) => {
    const mapWidth = 100;
    const mapHeight = 100;
    
    // Normalize coordinates to India bounds approximately
    const indiaLatRange = [6.5, 37.5]; // Min/Max latitude
    const indiaLngRange = [68, 97.5];  // Min/Max longitude
    
    const x = ((station.location.lng - indiaLngRange[0]) / (indiaLngRange[1] - indiaLngRange[0])) * mapWidth;
    const y = mapHeight - ((station.location.lat - indiaLatRange[0]) / (indiaLatRange[1] - indiaLatRange[0])) * mapHeight;
    
    return { x, y };
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

      {/* Interactive Map Area */}
      <Card className="h-64 relative overflow-hidden cursor-move">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100 dark:from-emerald-900/20 dark:via-blue-900/20 dark:to-indigo-900/20"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapScale})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
          }}
        >
          {/* India Map Background */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M20,80 Q30,60 40,70 L50,40 Q60,35 70,45 L75,30 Q80,25 85,35 L90,50 Q85,70 75,75 L60,85 Q40,90 30,85 Z"
                fill="currentColor"
                className="text-primary"
                strokeWidth="0.5"
                stroke="currentColor"
              />
            </svg>
          </div>
          
          {/* Station Markers */}
          {mockStations.map((station) => {
            const position = getMarkerPosition(station);
            return (
              <div
                key={station.id}
                className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-125 ${
                  selectedStation?.id === station.id ? 'scale-125 z-10' : 'hover:z-10'
                }`}
                style={{ left: `${position.x}%`, top: `${position.y}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStationClick(station);
                }}
              >
                <div className={`w-3 h-3 rounded-full border-2 border-white shadow-lg ${
                  station.status === 'critical' ? 'bg-critical animate-pulse' :
                  station.status === 'warning' ? 'bg-warning' :
                  'bg-success'
                }`}>
                </div>
                {selectedStation?.id === station.id && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-background border rounded-lg p-2 shadow-lg min-w-32 z-20">
                    <p className="text-xs font-medium">{station.name}</p>
                    <p className="text-xs text-muted-foreground">{station.currentLevel}m</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Map Controls */}
        <div className="absolute top-2 right-2 flex flex-col space-y-1">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded border shadow-sm flex items-center justify-center hover:bg-background transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded border shadow-sm flex items-center justify-center hover:bg-background transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
        
        {/* Map Info */}
        <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm rounded px-2 py-1 text-xs text-muted-foreground">
          Interactive Map • Tap markers for details
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