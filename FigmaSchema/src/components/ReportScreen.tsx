import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Wrench, 
  Car, 
  Info,
  Send,
  Star,
  Award
} from 'lucide-react';
import type { Screen } from '../App';

interface ReportScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function ReportScreen({ onNavigate }: ReportScreenProps) {
  const [selectedType, setSelectedType] = React.useState<string>('');
  const [location, setLocation] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const problemTypes = [
    {
      id: 'delay',
      label: 'Opóźnienie',
      icon: Clock,
      color: 'text-yellow-600 bg-yellow-100 border-yellow-200',
      description: 'Pojazd jest spóźniony'
    },
    {
      id: 'breakdown',
      label: 'Awaria',
      icon: Wrench,
      color: 'text-red-600 bg-red-100 border-red-200',
      description: 'Usterka techniczna pojazdu'
    },
    {
      id: 'traffic',
      label: 'Korek',
      icon: Car,
      color: 'text-orange-600 bg-orange-100 border-orange-200',
      description: 'Utrudnienia w ruchu'
    },
    {
      id: 'no-info',
      label: 'Brak informacji',
      icon: Info,
      color: 'text-blue-600 bg-blue-100 border-blue-200',
      description: 'Brak komunikatów o statusie'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || !location) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);

    alert('Zgłoszenie zostało wysłane! Dziękujemy za pomoc. +15 punktów!');
    onNavigate('dashboard');
  };

  const getCurrentLocation = () => {
    setLocation('Pobieranie lokalizacji...');
    setTimeout(() => {
      setLocation('Al. Jerozolimskie 61, Warszawa');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Zgłoś problem</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Points Motivation */}
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Zdobądź punkty!</h3>
              <p className="text-sm text-gray-600">Za każde zgłoszenie otrzymasz 15 punktów</p>
            </div>
          </div>
        </Card>

        {/* Problem Type Selection */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Wybierz typ problemu</h3>
          
          <div className="grid grid-cols-1 gap-3">
            {problemTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${type.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{type.label}</h4>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Location */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Lokalizacja</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="location">Gdzie występuje problem?</Label>
              <div className="flex gap-2 mt-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Wpisz adres lub nazwę przystanku"
                    className="pl-10"
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={getCurrentLocation}
                  className="flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  GPS
                </Button>
              </div>
            </div>
            
            {/* Quick Location Suggestions */}
            <div className="flex flex-wrap gap-2">
              {['Centrum', 'Dworzec Centralny', 'Lotnisko', 'Metro Politechnika'].map((suggestion) => (
                <Badge 
                  key={suggestion}
                  variant="outline" 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setLocation(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Additional Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Dodatkowe informacje</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="comment">Opis sytuacji (opcjonalnie)</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Opisz szczegóły problemu, np. długość opóźnienia, przyczyna awarii..."
                className="mt-2 min-h-[100px]"
              />
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Button 
              type="submit"
              disabled={!selectedType || !location || isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Wysyłanie...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Wyślij zgłoszenie
                </>
              )}
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Twoje zgłoszenie pomoże innym pasażerom i zostanie zweryfikowane przez nasz system
            </p>
          </form>
        </Card>

        {/* Recent User Reports */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Twoje ostatnie zgłoszenia</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div>
                <p className="font-medium text-green-800">Opóźnienie M1</p>
                <p className="text-sm text-green-600">Stacja Centrum • wczoraj</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">+15 pkt</Badge>
                <Star className="w-4 h-4 text-green-600" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div>
                <p className="font-medium text-blue-800">Korek 174</p>
                <p className="text-sm text-blue-600">Al. Jerozolimskie • 2 dni temu</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800">+15 pkt</Badge>
                <Star className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Add bottom padding */}
      <div className="h-6"></div>
    </div>
  );
}
