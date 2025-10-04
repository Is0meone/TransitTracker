import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Navigation, 
  Smartphone, 
  TrendingUp,
  Users,
  Shield,
  Menu,
  X
} from 'lucide-react';
import type { Screen } from '../App';

interface LandingPageProps {
  onNavigate: (screen: Screen) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="relative bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">TransitTracker <span className="text-sm text-blue-600">Kraków</span></span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Funkcje</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">Jak działa</a>
            <Button variant="outline" onClick={() => onNavigate('dispatcher')}>
              Panel Dyspozytora
            </Button>
            <Button onClick={() => onNavigate('auth')}>
              Zaloguj się
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Funkcje</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">Jak działa</a>
              <Button variant="outline" onClick={() => onNavigate('dispatcher')} className="w-full">
                Panel Dyspozytora
              </Button>
              <Button onClick={() => onNavigate('auth')} className="w-full">
                Zaloguj się
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Kraków w ruchu - <br />
                bez niespodzianek
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Otrzymuj informacje o opóźnieniach MPK Kraków w czasie rzeczywistym, 
                zgłaszaj problemy i planuj podróże przez miasto z pełną świadomością. 
                Od Nowej Huty po Bronowice - zawsze na bieżąco!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                  onClick={() => onNavigate('auth')}
                >
                  Pobierz aplikację
                </Button>
                <Button size="lg" variant="outline">
                  Dowiedz się więcej
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1722418776680-4e65f1fc4b34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrcmFrb3clMjBtYWluJTIwc3F1YXJlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1OTU4MjMzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Rynek Główny w Krakowie"
                  className="w-80 h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute -z-10 top-4 left-4 w-full h-full bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Problem krakowian i mieszkańców Małopolski
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Czy Twój tramwaj z Nowej Huty do centrum będzie na czas? Czy autobus z Wieliczki 
            jedzie według rozkładu? Brak informacji o opóźnieniach MPK to codzienność 
            tysięcy pasażerów. Nasz system to zmienia.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Nieoczekiwane opóźnienia</h3>
              <p className="text-gray-600">
                Czy tramwaj 8 z Krowodrzy jedzie na czas? Brak info o problemach MPK prowadzi do strat czasu
              </p>
            </Card>
            
            <Card className="p-8 text-center">
              <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Chaos informacyjny</h3>
              <p className="text-gray-600">
                Różne komunikaty na przystankach, w aplikacji i w tramwajach - brak jednego źródła prawdy
              </p>
            </Card>
            
            <Card className="p-8 text-center">
              <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Brak prognozowania</h3>
              <p className="text-gray-600">
                Nie wiesz czy lepiej jechać przez Rynek czy al. 3 Maja - brak planowania tras alternatywnych
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1752659550139-e7efae397fae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrcmFrb3clMjB0cmFtJTIwcHVibGljJTIwdHJhbnNwb3J0fGVufDF8fHx8MTc1OTU4MTk1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Tramwaj MPK Kraków"
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
            
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Inteligentne rozwiązanie dla Krakowa
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nasza aplikacja łączy zgłoszenia krakowian z oficjalnymi danymi MPK Kraków 
                i przewoźników regionalnych. Dzięki temu otrzymujesz pełen obraz transportu 
                w Krakowie i całej Małopolsce w czasie rzeczywistym.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Zgłoszenia krakowian</h4>
                    <p className="text-gray-600">Mieszkańcy miasta zgłaszają problemy w swoich dzielnicach w czasie rzeczywistym</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Dane MPK i przewoźników</h4>
                    <p className="text-gray-600">Integracja z systemami MPK Kraków i regionalnych przewoźników Małopolski</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <TrendingUp className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Analiza predykcyjna</h4>
                    <p className="text-gray-600">Prognozowanie opóźnień na podstawie danych historycznych</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Funkcje dla mieszkańców Krakowa i Małopolski
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wszystko, czego potrzebujesz do płynnego poruszania się po Krakowie i regionie małopolskim
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Zgłaszanie utrudnień</h3>
              <p className="text-gray-600">
                Zgłaszaj opóźnienia na linii 52 czy awarie tramwaju 3 - pomóż innym krakowianom
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Prognozowanie opóźnień</h3>
              <p className="text-gray-600">
                Otrzymuj przewidywania opóźnień na podstawie danych historycznych i aktualnych
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <Clock className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Informacje real-time</h3>
              <p className="text-gray-600">
                Aktualne dane o tramwajach, autobusach MPK i połączeniach regionalnych w całej Małopolsce
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <Navigation className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Mapy i nawigacja</h3>
              <p className="text-gray-600">
                Mapa Krakowa z utrudnieniami i alternatywnymi trasami - od Wawelu po Kopiec Kościuszki
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="px-4 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-16">
            Jak to działa?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Zgłoś problem</h3>
              <p className="text-gray-600">
                Krakowianie zgłaszają opóźnienia, awarie i korki przez aplikację mobilną
              </p>
              {/* Connection line */}
              <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-blue-500 to-green-500"></div>
            </div>
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. System analizuje</h3>
              <p className="text-gray-600">
                System analizuje zgłoszenia i łączy je z oficjalnymi danymi MPK i przewoźników regionu
              </p>
              {/* Connection line */}
              <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-green-500 to-blue-500"></div>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Wszyscy otrzymują info</h3>
              <p className="text-gray-600">
                Zweryfikowane informacje trafiają do wszystkich użytkowników w czasie rzeczywistym
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-blue-500 to-green-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Przemieszczaj się po Krakowie bez niespodzianek
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Dołącz do tysięcy krakowian i mieszkańców Małopolski, którzy już korzystają z TransitTracker
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => onNavigate('auth')}
            >
              Pobierz aplikację
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-blue-500"
              onClick={() => onNavigate('dispatcher')}
            >
              Panel dla przewoźników
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">TransitTracker <span className="text-sm text-blue-400">Kraków</span></span>
              </div>
              <p className="text-gray-400">
                Inteligentne zarządzanie transportem publicznym w Krakowie i Małopolsce
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produkt</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Funkcje</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cennik</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dokumentacja</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Firma</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">O nas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kariera</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontakt</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Prawne</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Polityka prywatności</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Regulamin</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">RODO</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2024 TransitTracker. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}