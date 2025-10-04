import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Search, 
  Plus, 
  Map, 
  ArrowRight, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Navigation,
  Bell,
  User,
  Settings,
  Menu
} from 'lucide-react';
import type { Screen } from '../App';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [searchFrom, setSearchFrom] = React.useState('');
  const [searchTo, setSearchTo] = React.useState('');

  // Mock data for recent reports - Kraków locations
  const recentReports = [
    {
      id: 1,
      line: '8',
      type: 'Opóźnienie',
      location: 'Nowa Huta Centrum',
      time: '2 min temu',
      severity: 'high',
      delay: '15 min',
      reporter: 'Anna K.'
    },
    {
      id: 2,
      line: '174',
      type: 'Korek',
      location: 'Al. 3 Maja',
      time: '5 min temu',
      severity: 'medium',
      delay: '8 min',
      reporter: 'Michał P.'
    },
    {
      id: 3,
      line: '3',
      type: 'Awaria',
      location: 'Rynek Główny',
      time: '12 min temu',
      severity: 'high',
      delay: '25 min',
      reporter: 'System MPK'
    },
    {
      id: 4,
      line: '52',
      type: 'Normalnie',
      location: 'Bronowice',
      time: '15 min temu',
      severity: 'low',
      delay: 'Na czas',
      reporter: 'Tomasz W.'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">TransitTracker</h1>
              <p className="text-xs text-blue-600">Kraków</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            <button 
              onClick={() => onNavigate('landing')}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Witaj z powrotem!</h2>
          <p className="text-blue-100 mb-4">
            Sprawdź aktualne informacje o transporcie publicznym
          </p>
          
          <div className="flex gap-3">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => onNavigate('report')}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Zgłoś problem
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-transparent border-white text-white hover:bg-white hover:text-blue-500"
              onClick={() => onNavigate('map')}
            >
              <Map className="w-4 h-4" />
              Mapa
            </Button>
          </div>
        </div>

        {/* Search Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Sprawdź połączenie</h3>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="np. Nowa Huta Centrum, Rynek Główny..."
                value={searchFrom}
                onChange={(e) => setSearchFrom(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="np. Bronowice, Dworzec Główny..."
                value={searchTo}
                onChange={(e) => setSearchTo(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              onClick={() => onNavigate('route-details')}
            >
              Znajdź połączenie
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNavigate('report')}
          >
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
            <h4 className="font-semibold">Zgłoś problem</h4>
            <p className="text-sm text-gray-600">Opóźnienie, awaria, korek</p>
          </Card>
          
          <Card 
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNavigate('map')}
          >
            <div className="flex items-center justify-between mb-2">
              <Map className="w-8 h-8 text-blue-500" />
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
            <h4 className="font-semibold">Mapa</h4>
            <p className="text-sm text-gray-600">Zobacz utrudnienia</p>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Najnowsze zgłoszenia</h3>
            <Button variant="ghost" size="sm">
              Zobacz wszystkie
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Badge className={`${getSeverityColor(report.severity)} flex items-center gap-1 px-2 py-1`}>
                  {getSeverityIcon(report.severity)}
                  {report.line}
                </Badge>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">{report.type}</p>
                    <span className="text-sm text-gray-500">{report.time}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-1">{report.location}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">zgłoszone przez {report.reporter}</span>
                    <span className={`text-sm font-medium ${
                      report.severity === 'high' ? 'text-red-600' : 
                      report.severity === 'medium' ? 'text-yellow-600' : 
                      'text-green-600'
                    }`}>
                      {report.delay}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">247</div>
            <p className="text-sm text-gray-600">Punkty za zgłoszenia</p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">18</div>
            <p className="text-sm text-gray-600">Zgłoszenia w tym miesiącu</p>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center gap-1 p-2 text-blue-600">
            <Clock className="w-6 h-6" />
            <span className="text-xs">Główna</span>
          </button>
          
          <button 
            className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => onNavigate('map')}
          >
            <Map className="w-6 h-6" />
            <span className="text-xs">Mapa</span>
          </button>
          
          <button 
            className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => onNavigate('report')}
          >
            <Plus className="w-6 h-6" />
            <span className="text-xs">Zgłoś</span>
          </button>
          
          <button 
            className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => onNavigate('landing')}
          >
            <Settings className="w-6 h-6" />
            <span className="text-xs">Ustawienia</span>
          </button>
        </div>
      </div>

      {/* Add bottom padding to prevent content being hidden behind bottom nav */}
      <div className="h-20"></div>
    </div>
  );
}