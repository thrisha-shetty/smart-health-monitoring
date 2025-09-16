import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Droplets, Heart, Users } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <>
      <style>{`
        @keyframes smooth-fade-in {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes loading-progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        
        @keyframes icon-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes gentle-glow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(var(--primary-hsl), 0.3)); }
          50% { filter: drop-shadow(0 0 20px rgba(var(--primary-hsl), 0.6)); }
        }
        
        .animate-smooth-fade-in {
          animation: smooth-fade-in 1.2s ease-out forwards;
        }
        
        .animate-loading-progress {
          animation: loading-progress 3s ease-out forwards;
        }
        
        .animate-icon-float {
          animation: icon-float 2s ease-in-out infinite;
        }
        
        .animate-gentle-glow {
          animation: gentle-glow 2s ease-in-out infinite;
        }
      `}</style>
      <div className={`fixed inset-0 gradient-hero flex items-center justify-center z-50 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="text-center text-white px-6">
          <div className="flex items-center justify-center mb-8 space-x-6">
            <div className="relative">
              <Droplets className="w-20 h-20 animate-icon-float animate-gentle-glow" />
              <div className="absolute -top-2 -right-2">
                <Heart className="w-10 h-10 text-red-300 animate-bounce" />
              </div>
            </div>
            <Users className="w-16 h-16 animate-icon-float animate-gentle-glow" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <h1 className="text-5xl font-bold mb-4 animate-smooth-fade-in">
            {t('appName')}
          </h1>
          
          <p className="text-xl opacity-90 animate-smooth-fade-in" style={{ animationDelay: '0.3s' }}>
            {t('tagline')}
          </p>
          
          <div className="mt-12 animate-smooth-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="w-24 h-1.5 bg-white/20 rounded-full mx-auto overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-r from-white to-white/80 rounded-full animate-loading-progress"></div>
            </div>
            <p className="text-sm opacity-75 mt-3">Initializing health monitoring system...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SplashScreen;