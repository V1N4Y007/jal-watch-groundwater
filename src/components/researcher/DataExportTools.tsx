import { Download, FileText, Table, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function DataExportTools() {
  const [selectedFormat, setSelectedFormat] = useState("csv");
  const [selectedTimeRange, setSelectedTimeRange] = useState("30days");
  const [selectedStations, setSelectedStations] = useState("all");

  const handleExport = (format: string, dataType: string) => {
    // Mock export functionality
    console.log(`Exporting ${dataType} as ${format}`);
    
    // Create mock CSV data
    const mockData = `Station ID,Station Name,Date,Water Level (m),Status,Rainfall (mm)
DWLR_001,Delhi Central Station,2024-01-15,12.5,warning,45
DWLR_002,Mumbai Coastal Monitor,2024-01-15,8.2,normal,120
DWLR_003,Chennai Water Point,2024-01-15,5.1,critical,80
DWLR_004,Bangalore Tech Hub,2024-01-15,18.7,normal,95
DWLR_005,Rajasthan Desert Monitor,2024-01-15,42.3,warning,25`;

    // Create and download file
    const blob = new Blob([mockData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `groundwater_data_${dataType}_${Date.now()}.${format}`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Data Export Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Range</label>
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Stations</label>
              <Select value={selectedStations} onValueChange={setSelectedStations}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stations</SelectItem>
                  <SelectItem value="critical">Critical Status Only</SelectItem>
                  <SelectItem value="state">By State</SelectItem>
                  <SelectItem value="custom">Custom Selection</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center space-x-2">
              <Table className="h-4 w-4" />
              <span>Raw Water Level Data</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Hourly water level readings from all DWLR stations with metadata
            </p>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                onClick={() => handleExport(selectedFormat, 'raw_data')}
                className="flex-1"
              >
                <Download className="h-3 w-3 mr-1" />
                Export Raw Data
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Daily Aggregates</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Daily min, max, average water levels with trend indicators
            </p>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleExport(selectedFormat, 'daily_aggregates')}
                className="flex-1"
              >
                <Download className="h-3 w-3 mr-1" />
                Export Aggregates
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Analysis Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Statistical analysis, correlations, and anomaly detection results
            </p>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleExport('pdf', 'analysis_report')}
                className="flex-1"
              >
                <Download className="h-3 w-3 mr-1" />
                Export Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Prediction Models</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">
              ARIMA/LSTM model outputs and forecast confidence intervals
            </p>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleExport(selectedFormat, 'predictions')}
                className="flex-1"
              >
                <Download className="h-3 w-3 mr-1" />
                Export Models
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-dashed">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <div className="text-sm font-medium">Bulk Export</div>
            <p className="text-xs text-muted-foreground">
              Export all selected data types in a single archive
            </p>
            <Button 
              onClick={() => handleExport('zip', 'bulk_export')} 
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Export All Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}