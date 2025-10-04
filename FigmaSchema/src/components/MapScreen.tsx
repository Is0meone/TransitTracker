import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  Navigation,
  Filter,
  Layers,
  Plus,
  Minus
} from 'lucide-react';
import type { Screen } from '../App';

interface MapScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function MapScreen({ onNavigate }: MapScreenProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedIncident, setSelectedIncident] = React.useState<number | null>(null);
  const [mapZoom, setMapZoom] = React.useState(12);

  // Mock incidents data - Kraków locations
  const incidents = [
    {
      id: 1,
      type: 'delay',
      line: '8',
      severity: 'high',
      location: 'Nowa Huta Centrum',
      coordinates: { x: 45, y: 30 },
      delay: '15 min',
      description: 'Awaria sygnalizacji',
      time: '2 min temu',
      affected: 3500
    },
    {
      id: 2,
      type: 'traffic',
      line: '174',
      severity: 'medium',
      location: 'Al. 3 Maja',
      coordinates: { x: 65, y: 45 },
      delay: '8 min',
      description: 'Intensywny ruch',
      time: '5 min temu',
      affected: 850
    },
    {
      id: 3,
      type: 'breakdown',
      line: 'S3',
      severity: 'high',
      location: 'Warszawa Zachodnia',
      coordinates: { x: 25, y: 60 },
      delay: '25 min',
      description: 'Usterka pojazdu',
      time: '12 min temu',
      affected: 2100
    },
    {
      id: 4,
      type: 'normal',
      line: '128',
      severity: 'low',
      location: 'Plac Konstytucji',
      coordinates: { x: 55, y: 70 },
      delay: 'Na czas',
      description: 'Bez problemów',
      time: '15 min temu',
      affected: 0
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'delay': return Clock;
      case 'traffic': return AlertTriangle;
      case 'breakdown': return AlertTriangle;
      case 'normal': return CheckCircle;
      default: return Clock;
    }
  };

  const selectedIncidentData = incidents.find(inc => inc.id === selectedIncident);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('route-details')}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Mapa utrudnień</h1>
          
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Layers className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Szukaj linii, przystanków..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Map Container */}
      <div className="relative flex-1">
        {/* Mock Map Background */}
        <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
          {/* Map grid pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" className="w-full h-full">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Transit Lines */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Metro Line */}
            <line x1="10%" y1="20%" x2="90%" y2="20%" stroke="#dc2626" strokeWidth="3" strokeDasharray="5,5"/>
            {/* Bus Lines */}
            <line x1="20%" y1="10%" x2="20%" y2="90%" stroke="#2563eb" strokeWidth="2"/>
            <line x1="40%" y1="30%" x2="80%" y2="70%" stroke="#16a34a" strokeWidth="2"/>
            <line x1="60%" y1="10%" x2="60%" y2="80%" stroke="#ea580c" strokeWidth="2"/>
          </svg>

          {/* Incident Markers */}
          {incidents.map((incident) => {
            const Icon = getIncidentIcon(incident.type);
            const isSelected = selectedIncident === incident.id;
            
            return (
              <button
                key={incident.id}
                onClick={() => setSelectedIncident(incident.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                  isSelected ? 'scale-125 z-20' : 'z-10'
                }`}
                style={{
                  left: `${incident.coordinates.x}%`,
                  top: `${incident.coordinates.y}%`
                }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg ${getSeverityColor(incident.severity)} ${
                  isSelected ? 'ring-4 ring-white ring-opacity-50' : ''
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                {/* Pulse animation for high severity */}
                {incident.severity === 'high' && (
                  <div className={`absolute top-0 left-0 w-8 h-8 rounded-full ${getSeverityColor(incident.severity)} animate-ping opacity-75`}></div>
                )}
              </button>
            );
          })}

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg">
            <button 
              onClick={() => setMapZoom(Math.min(18, mapZoom + 1))}
              className="p-3 hover:bg-gray-50 transition-colors border-b border-gray-200"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setMapZoom(Math.max(8, mapZoom - 1))}
              className="p-3 hover:bg-gray-50 transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>

          {/* Current Location Button */}
          <button className="absolute bottom-4 left-4 p-3 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
            <Navigation className="w-5 h-5 text-blue-600" />
          </button>
        </div>

        {/* Incident Details Card */}
        {selectedIncidentData && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
            <Card className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Badge className={`${
                    selectedIncidentData.severity === 'high' ? 'bg-red-100 text-red-800' :
                    selectedIncidentData.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedIncidentData.line}
                  </Badge>
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedIncidentData.description}</h4>
                    <p className="text-sm text-gray-600">{selectedIncidentData.location}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedIncident(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">Opóźnienie: <span className="font-semibold">{selectedIncidentData.delay}</span></span>
                  <span className="text-gray-600">Dotyczy: <span className="font-semibold">{selectedIncidentData.affected} osób</span></span>
                </div>
                <span className="text-gray-500">{selectedIncidentData.time}</span>
              </div>
              
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline">
                  Alternatywne trasy
                </Button>
                <Button size="sm" variant="outline">
                  Więcej info
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-white border-t border-gray-200 p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Legenda</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Poważne problemy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Średnie opóźnienia</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Bez problemów</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-gray-600">Poważne</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">7</div>
            <p className="text-xs text-gray-600">Średnie</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">24</div>
            <p className="text-xs text-gray-600">Bez problemów</p>
          </div>
        </div>
      </div>
    </div>
  );
}