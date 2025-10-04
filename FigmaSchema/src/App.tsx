import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { AuthScreen } from './components/AuthScreen';
import { Dashboard } from './components/Dashboard';
import { ReportScreen } from './components/ReportScreen';
import { MapScreen } from './components/MapScreen';
import { DispatcherPanel } from './components/DispatcherPanel';
import { RouteDetailsScreen } from './components/RouteDetailsScreen';

export type Screen = 'landing' | 'auth' | 'dashboard' | 'report' | 'map' | 'dispatcher' | 'route-details';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingPage onNavigate={navigateToScreen} />;
      case 'auth':
        return <AuthScreen onNavigate={navigateToScreen} />;
      case 'dashboard':
        return <Dashboard onNavigate={navigateToScreen} />;
      case 'report':
        return <ReportScreen onNavigate={navigateToScreen} />;
      case 'map':
        return <MapScreen onNavigate={navigateToScreen} />;
      case 'dispatcher':
        return <DispatcherPanel onNavigate={navigateToScreen} />;
      case 'route-details':
        return <RouteDetailsScreen onNavigate={navigateToScreen} />;
      default:
        return <LandingPage onNavigate={navigateToScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentScreen()}
    </div>
  );
}