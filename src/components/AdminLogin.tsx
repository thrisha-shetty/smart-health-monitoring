import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCog, MapPin, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (adminData: { name: string; village: string }) => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    adminName: '',
    villageName: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin({ name: formData.adminName, village: formData.villageName });
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
            <UserCog className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            {t('admin')} {t('login')}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminName">{t('adminName')}</Label>
              <Input
                id="adminName"
                type="text"
                value={formData.adminName}
                onChange={(e) => handleInputChange('adminName', e.target.value)}
                placeholder="Enter admin name"
                required
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="villageId">Village ID</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="villageId"
                  type="text"
                  value={formData.villageName}
                  onChange={(e) => handleInputChange('villageName', e.target.value)}
                  placeholder="Enter village ID (e.g., VIL001)"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              variant="hero" 
              className="w-full h-12 mt-6"
              disabled={isLoading || !formData.adminName || !formData.villageName}
            >
              {isLoading ? 'Logging in...' : t('login')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;