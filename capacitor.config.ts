import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.df18e1c5fdab43c28b255f8502234195',
  appName: 'JalWatch - Groundwater Monitoring',
  webDir: 'dist',
  server: {
    url: 'https://df18e1c5-fdab-43c2-8b25-5f8502234195.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1e88e5',
      showSpinner: false
    }
  }
};

export default config;