import React from 'react';
import { useLanguage, Language } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Languages, ChevronRight } from 'lucide-react';

interface LanguageSelectorProps {
  onComplete: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onComplete }) => {
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; name: string; nativeName: string; alphabet: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English', alphabet: 'A' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', alphabet: 'अ' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', alphabet: 'অ' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', alphabet: 'অ' },
    { code: 'tribal', name: 'Tribal Dialects', nativeName: 'Tribal Dialects', alphabet: 'T' }
  ];

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode);
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image with animation */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-bg-pan"
        style={{
          backgroundImage:
            'url(https://storage.googleapis.com/hng-image-assets/bg-language-selector.jpg)',
        }}
      ></div>

      {/* Gradient Overlay - less opaque */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40 animate-gradient-flow"></div>

      {/* Animated shimmer overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent animate-pulse-slow"></div>

      {/* Floating blurred particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-24 h-24 bg-primary/10 rounded-full blur-3xl animate-float-slow top-1/4 left-1/3"></div>
        <div className="absolute w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-float-slower bottom-1/4 right-1/3"></div>
      </div>

      {/* Card UI */}
      <Card className="w-full max-w-md shadow-floating animate-fade-in relative z-10 bg-card/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4 animate-bounce-gentle">
            <Languages className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            {t('selectLanguage')}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={language === lang.code ? 'hero' : 'outline'}
              className={`w-full h-14 justify-start text-left transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-95 ${
                language === lang.code
                  ? 'shadow-lg border-2 border-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
                  : ''
              }`}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              <div className="flex items-center space-x-4">
                <span
                  className={`text-2xl font-bold w-8 text-center transition-colors duration-300 ${
                    language === lang.code ? 'text-white' : 'text-primary'
                  }`}
                >
                  {lang.alphabet}
                </span>
                <div className="flex flex-col items-start">
                  <span className="font-medium">{lang.name}</span>
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      language === lang.code
                        ? 'text-white/80'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {lang.nativeName}
                  </span>
                </div>
              </div>
              <div className="ml-auto">
                {language === lang.code && (
                  <ChevronRight className="w-5 h-5 animate-pulse-fast" />
                )}
              </div>
            </Button>
          ))}

          <div className="pt-4">
            <Button
              variant="community"
              className="w-full h-12 transition-transform transform hover:scale-[1.02] active:scale-95 shadow-lg"
              onClick={handleContinue}
              disabled={!language}
            >
              {t('continue')}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageSelector;
