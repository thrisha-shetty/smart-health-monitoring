import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCog, Users, ChevronRight } from 'lucide-react';

interface RoleSelectorProps {
  onRoleSelect: (role: 'admin' | 'asha') => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onRoleSelect }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground mb-2">
            {t('selectRole')}
          </CardTitle>
          <p className="text-muted-foreground">
            Choose your role to access the appropriate dashboard
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full h-20 flex-col space-y-2 hover:shadow-card transition-all duration-300"
            onClick={() => onRoleSelect('admin')}
          >
            <UserCog className="w-8 h-8 text-primary" />
            <div className="text-center">
              <div className="font-semibold">{t('admin')}</div>
              <div className="text-sm text-muted-foreground">
                Manage ASHA workers and view reports
              </div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="w-full h-20 flex-col space-y-2 hover:shadow-card transition-all duration-300"
            onClick={() => onRoleSelect('asha')}
          >
            <Users className="w-8 h-8 text-secondary" />
            <div className="text-center">
              <div className="font-semibold">{t('ashaWorker')}</div>
              <div className="text-sm text-muted-foreground">
                Enter patient data and monitor water quality
              </div>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleSelector;