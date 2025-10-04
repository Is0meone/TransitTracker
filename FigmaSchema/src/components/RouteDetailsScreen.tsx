import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Navigation,
  Route,
  Zap,
  Bus,
  Train,
  MoreHorizontal,
  ArrowRight
} from 'lucide-react';
import type { Screen } from '../App';

interface RouteDetailsScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function RouteDetailsScreen({ onNavigate }: RouteDetailsScreenProps) {
  const [selectedRoute, setSelectedRoute] = React.useState<number>(0);

  // Mock route data for Kraków
  const routeData = {
    from: 'Nowa Huta Centrum',
    to: 'Rynek Główny',
    routes: [
      {
        id: 0,
        type: 'fastest',
        duration: '28 min',
        status: 'on-time',
        transport: ['tram'],
        stops: [
          'Nowa Huta Centrum',
          'Plac Centralny',
          'Os. Górali',
          'Dworzec Główny',
          'Teatr Bagatela',
          'Rynek Główny'
        ],
        lines: ['1'],
        delay: null,
        cost: '3.80 zł'
      },
      {
        id: 1,
        type: 'alternative',
        duration: '35 min',
        status: 'delayed',
        transport: ['bus', 'tram'],
        stops: [
          'Nowa Huta Centrum',
          'Combinat',
          'Dworzec Główny',
          'Poczta Główna',
          'Rynek Główny'
        ],
        lines: ['174', '3'],
        delay: '8 min',
        cost: '3.80 zł'
      },
      {
        id: 2,
        type: 'alternative',
        duration: '42 min',
        status: 'predicted-delay',
        transport: ['bus'],
        stops: [
          'Nowa Huta Centrum',
          'Bieńczycka',
          'Mogiła',
          'Al. 3 Maja',
          'Stary Kleparz',
          'Rynek Główny'
        ],
        lines: ['52', '128'],
        delay: '12 min',
        cost: '3.80 zł'
      }
    ]
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'on-time':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          label: 'Na czas'
        };
      case 'delayed':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: AlertTriangle,
          label: 'Opóźnione'
        };
      case 'predicted-delay':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Clock,
          label: 'Przewidywane opóźnienie'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Clock,
          label: 'Nieznany'
        };
    }
  };

  const getTransportIcon = (transport: string) => {
    switch (transport) {
      case 'tram':
        return <Train className="w-4 h-4" />;
      case 'bus':
        return <Bus className="w-4 h-4" />;
      default:
        return <Bus className="w-4 h-4" />;
    }
  };

  const getRouteTypeLabel = (type: string) => {
    switch (type) {
      case 'fastest':
        return 'Najszybsza';
      case 'alternative':
        return 'Alternatywna';
      default:
        return 'Trasa';
    }
  };

  const hasDelayAlert = routeData.routes.some(route => 
    route.status === 'delayed' || route.status === 'predicted-delay'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('dashboard')}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="truncate">
              Twoja trasa: <span className="text-blue-600">{routeData.from}</span> → <span className="text-green-600">{routeData.to}</span>
            </h1>
            <p className="text-sm text-gray-600">3 opcje podróży • MPK Kraków</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Map Placeholder */}
        <Card className="overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 relative flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <p className="text-gray-600">Interaktywna mapa trasy</p>
              <p className="text-sm text-gray-500">Google Maps / Leaflet API</p>
            </div>
            
            {/* Route indicator overlay */}
            <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">{routeData.from}</span>
              </div>
            </div>
            
            <div className="absolute bottom-4 right-4 bg-white rounded-lg p-2 shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">{routeData.to}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Delay Alert */}
        {hasDelayAlert && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Uwaga:</strong> Na niektórych trasach występują opóźnienia. 
              Sprawdź szczegóły poniżej i rozważ alternatywne opcje.
            </AlertDescription>
          </Alert>
        )}

        {/* Route Options */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Sugerowane trasy</h2>
          
          {routeData.routes.map((route, index) => {
            const statusConfig = getStatusConfig(route.status);
            const StatusIcon = statusConfig.icon;
            const isSelected = selectedRoute === route.id;
            const isPrimary = route.type === 'fastest';
            
            return (
              <Card 
                key={route.id}
                className={`p-4 cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                } ${isPrimary ? 'ring-2 ring-blue-200' : ''}`}
                onClick={() => setSelectedRoute(route.id)}
              >
                {/* Route Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {isPrimary && (
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        <Zap className="w-3 h-3 mr-1" />
                        {getRouteTypeLabel(route.type)}
                      </Badge>
                    )}
                    {!isPrimary && (
                      <Badge variant="outline">
                        {getRouteTypeLabel(route.type)} {index}
                      </Badge>
                    )}
                    
                    <Badge className={statusConfig.color}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig.label}
                    </Badge>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-lg font-semibold text-gray-900">
                      <Clock className="w-4 h-4" />
                      {route.duration}
                    </div>
                    {route.delay && (
                      <div className="text-sm text-red-600">+{route.delay}</div>
                    )}
                  </div>
                </div>

                {/* Transport Lines */}
                <div className="flex items-center gap-2 mb-3">
                  {route.transport.map((transportType, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      {getTransportIcon(transportType)}
                      <span className="text-sm text-gray-600 capitalize">{transportType}</span>
                    </div>
                  ))}
                  <div className="flex gap-1 ml-2">
                    {route.lines.map((line, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {line}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Route Stops */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <div className="flex items-center gap-1 flex-wrap">
                      {route.stops.slice(0, 3).map((stop, idx) => (
                        <React.Fragment key={idx}>
                          <span className={`${idx === 0 ? 'text-blue-600' : idx === route.stops.length - 1 ? 'text-green-600' : 'text-gray-600'}`}>
                            {stop}
                          </span>
                          {idx < 2 && idx < route.stops.slice(0, 3).length - 1 && (
                            <ArrowRight className="w-3 h-3 text-gray-400" />
                          )}
                        </React.Fragment>
                      ))}
                      {route.stops.length > 3 && (
                        <>
                          <MoreHorizontal className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600">+{route.stops.length - 3} więcej</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <span>Koszt: {route.cost}</span>
                    <span>Przystanki: {route.stops.length}</span>
                  </div>
                  
                  {isSelected && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>

                {/* Delay Warning for specific route */}
                {route.status !== 'on-time' && (
                  <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800">
                        {route.status === 'delayed' 
                          ? `Aktualne opóźnienie ${route.delay} na linii ${route.lines.join(', ')}`
                          : `Przewidywane opóźnienie ${route.delay} w rejonie al. 3 Maja`
                        }
                      </span>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4">
          <Button 
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            size="lg"
            onClick={() => onNavigate('map')}
          >
            <Navigation className="w-5 h-5 mr-2" />
            Wybierz tę trasę i rozpocznij nawigację
          </Button>
          
          <div className="mt-2 text-center">
            <button 
              className="text-sm text-gray-600 hover:text-gray-900"
              onClick={() => onNavigate('dashboard')}
            >
              Wróć do wyszukiwarki
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}