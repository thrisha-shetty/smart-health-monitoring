import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCog, Lock, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (adminData: { name: string; village: string }) => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    adminName: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // For now, we'll just pass a mock village name based on the admin name
      // In a real application, you would validate the password and fetch the village from the server
      onLogin({ name: formData.adminName, village: 'Mock Village' }); 
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
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              variant="hero" 
              className="w-full h-12 mt-6"
              disabled={isLoading || !formData.adminName || !formData.password}
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