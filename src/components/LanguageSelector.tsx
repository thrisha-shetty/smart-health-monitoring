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

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'tribal', name: 'Tribal Dialects', nativeName: 'Tribal Dialects' }
  ];

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode);
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-floating">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
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
              variant={language === lang.code ? "hero" : "outline"}
              className="w-full h-14 justify-between text-left"
              onClick={() => handleLanguageSelect(lang.code)}
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">{lang.name}</span>
                <span className={`text-sm ${language === lang.code ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {lang.nativeName}
                </span>
              </div>
              {language === lang.code && <ChevronRight className="w-5 h-5" />}
            </Button>
          ))}
          
          <div className="pt-4">
            <Button 
              variant="community" 
              className="w-full h-12"
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