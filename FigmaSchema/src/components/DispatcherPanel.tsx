import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Bell,
  Settings,
  AlertTriangle,
  Clock,
  CheckCircle,
  Users,
  TrendingUp,
  Activity
} from 'lucide-react';
import type { Screen } from '../App';

interface DispatcherPanelProps {
  onNavigate: (screen: Screen) => void;
}

export function DispatcherPanel({ onNavigate }: DispatcherPanelProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showAddMessage, setShowAddMessage] = React.useState(false);
  const [newMessage, setNewMessage] = React.useState({
    line: '',
    message: '',
    priority: 'medium'
  });

  // Mock data for connections
  const connections = [
    {
      id: 1,
      line: 'M1',
      operator: 'Metro Warszawskie',
      route: 'Młociny - Kabaty',
      status: 'delayed',
      delay: 15,
      lastReport: '2 min temu',
      affected: 3500,
      nextUpdate: '10:45'
    },
    {
      id: 2,
      line: '174',
      operator: 'ZTM Warszawa',
      route: 'Dworzec Centralny - Bemowo',
      status: 'on-time',
      delay: 0,
      lastReport: '5 min temu',
      affected: 0,
      nextUpdate: '10:50'
    },
    {
      id: 3,
      line: 'S3',
      operator: 'PKP SKM',
      route: 'Warszawa Zachodnia - Legionowo',
      status: 'breakdown',
      delay: 25,
      lastReport: '12 min temu',
      affected: 2100,
      nextUpdate: '11:00'
    },
    {
      id: 4,
      line: '128',
      operator: 'ZTM Warszawa',
      route: 'Wilanów - Bemowo',
      status: 'on-time',
      delay: 2,
      lastReport: '1 min temu',
      affected: 0,
      nextUpdate: '10:55'
    },
    {
      id: 5,
      line: '95',
      operator: 'ZTM Warszawa',
      route: 'Żoliborz - Ursynów',
      status: 'delayed',
      delay: 8,
      lastReport: '3 min temu',
      affected: 850,
      nextUpdate: '10:48'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'bg-green-100 text-green-800';
      case 'delayed': return 'bg-yellow-100 text-yellow-800';
      case 'breakdown': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time': return <CheckCircle className="w-4 h-4" />;
      case 'delayed': return <Clock className="w-4 h-4" />;
      case 'breakdown': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on-time': return 'Na czas';
      case 'delayed': return 'Opóźniony';
      case 'breakdown': return 'Awaria';
      default: return 'Nieznany';
    }
  };

  const handleAddMessage = () => {
    // Simulate adding message
    console.log('Adding message:', newMessage);
    setNewMessage({ line: '', message: '', priority: 'medium' });
    setShowAddMessage(false);
    alert('Komunikat został wysłany do pasażerów!');
  };

  const filteredConnections = connections.filter(conn => 
    conn.line.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conn.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conn.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('landing')}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors lg:hidden"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel Dyspozytora</h1>
              <p className="text-gray-600">Zarządzanie komunikacją publiczną w czasie rzeczywistym</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => setShowAddMessage(true)}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Dodaj komunikat
            </Button>
            <Button variant="outline">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktywne linie</p>
                <p className="text-2xl font-bold text-gray-900">34</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Opóźnione</p>
                <p className="text-2xl font-bold text-yellow-600">8</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Awarie</p>
                <p className="text-2xl font-bold text-red-600">2</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pasażerowie</p>
                <p className="text-2xl font-bold text-green-600">47.2k</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </Card>
        </div>

        {/* Controls */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Szukaj linii, przewoźnika, trasy..."
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtry
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Eksport
              </Button>
            </div>
          </div>
        </Card>

        {/* Connections Table */}
        <Card>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Aktualne połączenia</h3>
            <p className="text-gray-600">Monitoring wszystkich linii w czasie rzeczywistym</p>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Linia</TableHead>
                  <TableHead>Przewoźnik</TableHead>
                  <TableHead>Trasa</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Opóźnienie</TableHead>
                  <TableHead>Dotknięci</TableHead>
                  <TableHead>Ostatnie zgłoszenie</TableHead>
                  <TableHead>Działania</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConnections.map((connection) => (
                  <TableRow key={connection.id}>
                    <TableCell className="font-medium">
                      <Badge variant="outline">{connection.line}</Badge>
                    </TableCell>
                    <TableCell>{connection.operator}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {connection.route}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(connection.status)} flex items-center gap-1 w-fit`}>
                        {getStatusIcon(connection.status)}
                        {getStatusText(connection.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {connection.delay > 0 ? (
                        <span className="text-red-600 font-medium">+{connection.delay} min</span>
                      ) : (
                        <span className="text-green-600">Na czas</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {connection.affected > 0 ? (
                        <span className="text-red-600">{connection.affected.toLocaleString()}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {connection.lastReport}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Komunikat
                        </Button>
                        <Button size="sm" variant="outline">
                          Szczegóły
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ostatnia aktywność</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-red-800">Awaria sygnalizacji M1</p>
                <p className="text-sm text-red-600">Stacja Centrum • Czas naprawy: ~30 min</p>
                <p className="text-xs text-red-500 mt-1">12 min temu</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-yellow-800">Opóźnienie linii 174</p>
                <p className="text-sm text-yellow-600">Al. Jerozolimskie • Korek uliczny</p>
                <p className="text-xs text-yellow-500 mt-1">5 min temu</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-blue-800">Zwiększony ruch pasażerski</p>
                <p className="text-sm text-blue-600">Metro - godziny szczytu</p>
                <p className="text-xs text-blue-500 mt-1">15 min temu</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Add Message Modal */}
      {showAddMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dodaj komunikat</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="line">Linia</Label>
                <Input
                  id="line"
                  value={newMessage.line}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, line: e.target.value }))}
                  placeholder="np. M1, 174, S3"
                />
              </div>
              
              <div>
                <Label htmlFor="message">Treść komunikatu</Label>
                <Textarea
                  id="message"
                  value={newMessage.message}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Wpisz informację dla pasażerów..."
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <Label>Priorytet</Label>
                <div className="flex gap-2 mt-2">
                  {['low', 'medium', 'high'].map((priority) => (
                    <button
                      key={priority}
                      onClick={() => setNewMessage(prev => ({ ...prev, priority }))}
                      className={`px-3 py-2 rounded-lg border-2 text-sm transition-all ${
                        newMessage.priority === priority
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {priority === 'low' ? 'Niski' : priority === 'medium' ? 'Średni' : 'Wysoki'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button 
                onClick={handleAddMessage}
                className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                Wyślij komunikat
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddMessage(false)}
              >
                Anuluj
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}