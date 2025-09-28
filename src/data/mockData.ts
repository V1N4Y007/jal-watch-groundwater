export interface DWLRStation {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    district: string;
    state: string;
  };
  currentLevel: number; // meters
  previousLevel: number;
  lastUpdated: string;
  status: 'normal' | 'warning' | 'critical';
  weeklyData: Array<{
    date: string;
    level: number;
  }>;
}

export interface Alert {
  id: string;
  type: 'drawdown' | 'recharge' | 'critical' | 'maintenance';
  stationId: string;
  stationName: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  isRead: boolean;
}

export interface PolicyMetrics {
  avgWaterLevelChange: number; // meters in last 30 days
  criticalStationsPercentage: number;
  droughtProneDistricts: number;
  totalStations: number;
  stationsOnline: number;
  lastUpdated: string;
}

export const mockStations: DWLRStation[] = [
  {
    id: "DWLR_001",
    name: "Delhi Central Station",
    location: {
      lat: 28.6139,
      lng: 77.2090,
      district: "New Delhi",
      state: "Delhi"
    },
    currentLevel: 12.5,
    previousLevel: 13.1,
    lastUpdated: "2024-01-15T10:30:00Z",
    status: "warning",
    weeklyData: [
      { date: "2024-01-09", level: 14.2 },
      { date: "2024-01-10", level: 13.8 },
      { date: "2024-01-11", level: 13.5 },
      { date: "2024-01-12", level: 13.2 },
      { date: "2024-01-13", level: 13.0 },
      { date: "2024-01-14", level: 12.8 },
      { date: "2024-01-15", level: 12.5 }
    ]
  },
  {
    id: "DWLR_002",
    name: "Mumbai Coastal Monitor",
    location: {
      lat: 19.0760,
      lng: 72.8777,
      district: "Mumbai",
      state: "Maharashtra"
    },
    currentLevel: 8.2,
    previousLevel: 7.9,
    lastUpdated: "2024-01-15T10:15:00Z",
    status: "normal",
    weeklyData: [
      { date: "2024-01-09", level: 7.1 },
      { date: "2024-01-10", level: 7.3 },
      { date: "2024-01-11", level: 7.6 },
      { date: "2024-01-12", level: 7.8 },
      { date: "2024-01-13", level: 7.9 },
      { date: "2024-01-14", level: 8.0 },
      { date: "2024-01-15", level: 8.2 }
    ]
  },
  {
    id: "DWLR_003",
    name: "Chennai Water Point",
    location: {
      lat: 13.0827,
      lng: 80.2707,
      district: "Chennai",
      state: "Tamil Nadu"
    },
    currentLevel: 5.1,
    previousLevel: 5.8,
    lastUpdated: "2024-01-15T10:45:00Z",
    status: "critical",
    weeklyData: [
      { date: "2024-01-09", level: 6.8 },
      { date: "2024-01-10", level: 6.5 },
      { date: "2024-01-11", level: 6.2 },
      { date: "2024-01-12", level: 5.9 },
      { date: "2024-01-13", level: 5.6 },
      { date: "2024-01-14", level: 5.3 },
      { date: "2024-01-15", level: 5.1 }
    ]
  },
  {
    id: "DWLR_004",
    name: "Bangalore Tech Hub",
    location: {
      lat: 12.9716,
      lng: 77.5946,
      district: "Bangalore",
      state: "Karnataka"
    },
    currentLevel: 18.7,
    previousLevel: 18.1,
    lastUpdated: "2024-01-15T10:20:00Z",
    status: "normal",
    weeklyData: [
      { date: "2024-01-09", level: 17.2 },
      { date: "2024-01-10", level: 17.5 },
      { date: "2024-01-11", level: 17.8 },
      { date: "2024-01-12", level: 18.0 },
      { date: "2024-01-13", level: 18.3 },
      { date: "2024-01-14", level: 18.5 },
      { date: "2024-01-15", level: 18.7 }
    ]
  },
  {
    id: "DWLR_005",
    name: "Rajasthan Desert Monitor",
    location: {
      lat: 26.9124,
      lng: 75.7873,
      district: "Jaipur",
      state: "Rajasthan"
    },
    currentLevel: 42.3,
    previousLevel: 43.1,
    lastUpdated: "2024-01-15T09:50:00Z",
    status: "warning",
    weeklyData: [
      { date: "2024-01-09", level: 44.5 },
      { date: "2024-01-10", level: 44.1 },
      { date: "2024-01-11", level: 43.8 },
      { date: "2024-01-12", level: 43.5 },
      { date: "2024-01-13", level: 43.2 },
      { date: "2024-01-14", level: 42.8 },
      { date: "2024-01-15", level: 42.3 }
    ]
  }
];

export const mockAlerts: Alert[] = [
  {
    id: "ALERT_001",
    type: "drawdown",
    stationId: "DWLR_003",
    stationName: "Chennai Water Point",
    message: "⚠️ Rapid drawdown detected (0.7m in 24h)",
    severity: "high",
    timestamp: "2024-01-15T08:30:00Z",
    isRead: false
  },
  {
    id: "ALERT_002",
    type: "recharge",
    stationId: "DWLR_002",
    stationName: "Mumbai Coastal Monitor",
    message: "🌧️ Recharge improving (rainfall impact +0.3m)",
    severity: "low",
    timestamp: "2024-01-15T07:15:00Z",
    isRead: false
  },
  {
    id: "ALERT_003",
    type: "critical",
    stationId: "DWLR_001",
    stationName: "Delhi Central Station",
    message: "🚨 Water level below critical threshold",
    severity: "high",
    timestamp: "2024-01-14T22:45:00Z",
    isRead: true
  },
  {
    id: "ALERT_004",
    type: "maintenance",
    stationId: "DWLR_005",
    stationName: "Rajasthan Desert Monitor",
    message: "🔧 Sensor calibration completed successfully",
    severity: "low",
    timestamp: "2024-01-14T14:20:00Z",
    isRead: true
  }
];

export const mockPolicyMetrics: PolicyMetrics = {
  avgWaterLevelChange: -0.45, // negative indicates decline
  criticalStationsPercentage: 23.8,
  droughtProneDistricts: 127,
  totalStations: 5260,
  stationsOnline: 4987,
  lastUpdated: "2024-01-15T10:45:00Z"
};

export const userRoles = [
  {
    id: "citizen",
    title: "Citizen",
    description: "Monitor water levels in your area",
    icon: "👨‍👩‍👧‍👦"
  },
  {
    id: "researcher",
    title: "Researcher",
    description: "Access detailed data and analytics",
    icon: "🔬"
  },
  {
    id: "policymaker",
    title: "Policymaker", 
    description: "View policy insights and trends",
    icon: "🏛️"
  }
];