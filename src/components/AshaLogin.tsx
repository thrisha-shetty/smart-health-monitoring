import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, KeyRound, ArrowLeft } from 'lucide-react';

interface AshaLoginProps {
  onLogin: (workerData: { workerId: string; password: string }) => void;
  onBack: () => void;
}

const AshaLogin: React.FC<AshaLoginProps> = ({ onLogin, onBack }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    workerId: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin({ workerId: formData.workerId, password: formData.password });
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center">
          <Button 
            variant="ghost" 
            className="w-fit mb-4"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex justify-center mb-4">
            <Users className="w-12 h-12 text-secondary" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            {t('ashaWorker')} {t('login')}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Use credentials sent via SMS
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workerId">{t('workerId')}</Label>
              <Input
                id="workerId"
                type="text"
                value={formData.workerId}
                onChange={(e) => handleInputChange('workerId', e.target.value)}
                placeholder="Enter your worker ID"
                required
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter password from SMS"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              variant="health" 
              className="w-full h-12 mt-6"
              disabled={isLoading || !formData.workerId || !formData.password}
            >
              {isLoading ? 'Logging in...' : t('login')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AshaLogin;