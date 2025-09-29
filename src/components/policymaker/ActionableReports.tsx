import { FileText, Download, Calendar, MapPin, AlertTriangle, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const reports = [
  {
    id: 1,
    title: "Drought Risk Assessment - Q1 2024",
    type: "Quarterly Report",
    status: "Ready",
    date: "2024-01-15",
    districts: 127,
    criticalStations: 23,
    recommendations: 8,
    description: "Comprehensive analysis of drought-prone districts with actionable interventions"
  },
  {
    id: 2,
    title: "Groundwater Depletion Hotspots",
    type: "Critical Alert",
    status: "Urgent",
    date: "2024-01-14",
    districts: 45,
    criticalStations: 67,
    recommendations: 12,
    description: "Immediate intervention required for rapidly depleting aquifers"
  },
  {
    id: 3,
    title: "Recharge Potential Mapping",
    type: "Strategic Planning",
    status: "Draft",
    date: "2024-01-12",
    districts: 234,
    criticalStations: 5,
    recommendations: 15,
    description: "Identification of optimal locations for artificial recharge structures"
  },
  {
    id: 4,
    title: "Monsoon Impact Analysis 2023",
    type: "Annual Review",
    status: "Ready",
    date: "2024-01-10",
    districts: 456,
    criticalStations: 12,
    recommendations: 20,
    description: "Post-monsoon recovery patterns and regional variations"
  }
];

export function ActionableReports() {
  const handleDownloadReport = (reportId: number, format: string) => {
    console.log(`Downloading report ${reportId} as ${format}`);
    
    // Mock PDF generation
    const mockPdfContent = `
GROUNDWATER MONITORING REPORT
Generated: ${new Date().toLocaleDateString()}

EXECUTIVE SUMMARY
- Total Stations Monitored: 5,260
- Critical Status Stations: 23.8%
- Drought-Prone Districts: 127
- Average Decline: -0.45m (30 days)

KEY RECOMMENDATIONS
1. Immediate intervention required in Chennai region
2. Implement artificial recharge in 15 districts
3. Enhance monitoring in coastal areas
4. Update critical thresholds for 67 stations

DETAILED ANALYSIS
[Detailed technical analysis would be included here...]
    `;
    
    const blob = new Blob([mockPdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `groundwater_report_${reportId}_${Date.now()}.${format}`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Urgent': return 'destructive';
      case 'Ready': return 'default';
      case 'Draft': return 'secondary';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Critical Alert': return <AlertTriangle className="h-4 w-4 text-critical" />;
      case 'Quarterly Report': return <Calendar className="h-4 w-4 text-primary" />;
      case 'Strategic Planning': return <MapPin className="h-4 w-4 text-success" />;
      case 'Annual Review': return <TrendingDown className="h-4 w-4 text-warning" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Policy Reports & Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-critical">12</p>
              <p className="text-xs text-muted-foreground">Urgent Reports</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">28</p>
              <p className="text-xs text-muted-foreground">Action Items</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">156</p>
              <p className="text-xs text-muted-foreground">Implemented</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">89%</p>
              <p className="text-xs text-muted-foreground">Success Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getTypeIcon(report.type)}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-sm">{report.title}</h3>
                      <Badge variant={getStatusColor(report.status)} className="text-xs">
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{report.type}</p>
                    <p className="text-xs text-muted-foreground">{report.description}</p>
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  {new Date(report.date).toLocaleDateString()}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Report Metrics */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg font-semibold">{report.districts}</p>
                  <p className="text-xs text-muted-foreground">Districts</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-critical">{report.criticalStations}</p>
                  <p className="text-xs text-muted-foreground">Critical Stations</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-primary">{report.recommendations}</p>
                  <p className="text-xs text-muted-foreground">Recommendations</p>
                </div>
              </div>

              {/* Progress Bar for Implementation */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Implementation Progress</span>
                  <span>{Math.floor(Math.random() * 100)}%</span>
                </div>
                <Progress value={Math.floor(Math.random() * 100)} className="h-2" />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  onClick={() => handleDownloadReport(report.id, 'pdf')}
                  className="flex-1"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download PDF
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDownloadReport(report.id, 'docx')}
                  className="flex-1"
                >
                  <FileText className="h-3 w-3 mr-1" />
                  Word Doc
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Generate New Report */}
      <Card className="border-dashed">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <FileText className="h-8 w-8 text-muted-foreground mx-auto" />
            <div>
              <h3 className="font-medium">Generate Custom Report</h3>
              <p className="text-sm text-muted-foreground">
                Create targeted reports for specific regions or time periods
              </p>
            </div>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Create New Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}