import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { ArrowLeft, Clock, Mail, Lock, Smartphone, Chrome } from 'lucide-react';
import type { Screen } from '../App';

interface AuthScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function AuthScreen({ onNavigate }: AuthScreenProps) {
  const [isLogin, setIsLogin] = React.useState(true);

  const handleAuth = () => {
    // Simulate authentication
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      {/* Header */}
      <div className="max-w-md mx-auto pt-8 pb-8">
        <button 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Powrót
        </button>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            TransitTracker
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Zaloguj się do swojego konta' : 'Utwórz nowe konto'}
          </p>
        </div>
      </div>

      {/* Auth Card */}
      <div className="max-w-md mx-auto">
        <Card className="p-8">
          {/* Social Login Buttons */}
          <div className="space-y-4 mb-6">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-3"
              onClick={handleAuth}
            >
              <Chrome className="w-5 h-5" />
              Kontynuuj z Google
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-3"
              onClick={handleAuth}
            >
              <Smartphone className="w-5 h-5" />
              Kontynuuj z Apple
            </Button>
          </div>

          <div className="relative mb-6">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-4 text-sm text-gray-500">lub</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAuth(); }}>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="twoj@email.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Hasło</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword">Potwierdź hasło</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="text-right">
                <button 
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Zapomniałeś hasła?
                </button>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              {isLogin ? 'Zaloguj się' : 'Utwórz konto'}
            </Button>
          </form>

          {/* Switch between login/register */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? 'Nie masz konta?' : 'Masz już konto?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                {isLogin ? 'Zarejestruj się' : 'Zaloguj się'}
              </button>
            </p>
          </div>

          {/* Terms */}
          {!isLogin && (
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Rejestrując się, akceptujesz nasze{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700">Warunki korzystania</a>
                {' '}i{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700">Politykę prywatności</a>
              </p>
            </div>
          )}
        </Card>

        {/* Demo Access */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Chcesz tylko sprawdzić aplikację?
          </p>
          <Button 
            variant="outline" 
            onClick={() => onNavigate('dashboard')}
            className="w-full"
          >
            Wejdź jako gość
          </Button>
        </div>
      </div>
    </div>
  );
}