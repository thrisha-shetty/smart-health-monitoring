import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Users, 
  Plus, 
  MessageSquare, 
  Settings, 
  UserPlus,
  Activity,
  Droplets,
  AlertCircle
} from 'lucide-react';
import WaterQualityCard from './WaterQualityCard';

interface AdminDashboardProps {
  adminData: { name: string; village: string };
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ adminData, onLogout }) => {
  const { t } = useLanguage();
  const [newWorker, setNewWorker] = useState({ name: '', workerId: '' });
  const [workers, setWorkers] = useState([
    { id: 'ASHA001', name: 'Meera Devi', status: 'active' },
    { id: 'ASHA002', name: 'Sunita Sharma', status: 'active' },
    { id: 'ASHA003', name: 'Priya Gogoi', status: 'inactive' }
  ]);

  // Mock water quality data
  const waterQualityData = {
    turbidity: 1.5,
    pH: 7.2,
    temperature: 24,
    timestamp: new Date(),
    location: adminData.village
  };

  const handleAddWorker = () => {
    if (newWorker.name && newWorker.workerId) {
      const generatedPassword = Math.random().toString(36).slice(-8);
      setWorkers([...workers, { 
        id: newWorker.workerId, 
        name: newWorker.name, 
        status: 'active' 
      }]);
      
      // Simulate SMS sending
      alert(`SMS sent to ${newWorker.name}\nWorker ID: ${newWorker.workerId}\nPassword: ${generatedPassword}`);
      
      setNewWorker({ name: '', workerId: '' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero text-white p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold">{t('admin')} {t('dashboard')}</h1>
            <p className="opacity-90">{adminData.name} - {adminData.village}</p>
          </div>
          <Button variant="outline" onClick={onLogout} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            {t('logout')}
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-card hover:shadow-floating transition-all duration-300 animate-slide-up">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-secondary mx-auto mb-2 animate-bounce-gentle" />
              <div className="text-2xl font-bold">{workers.length}</div>
              <div className="text-sm text-muted-foreground">ASHA Workers</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card hover:shadow-floating transition-all duration-300 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 text-primary mx-auto mb-2 animate-float" />
              <div className="text-2xl font-bold">24</div>
              <div className="text-sm text-muted-foreground">Active Cases</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card hover:shadow-floating transition-all duration-300 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-4 text-center">
              <Droplets className="w-8 h-8 text-water-safe mx-auto mb-2 animate-pulse" />
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm text-muted-foreground">Water Sources</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card hover:shadow-floating transition-all duration-300 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-4 text-center">
              <AlertCircle className="w-8 h-8 text-water-warning mx-auto mb-2 animate-bounce-gentle" />
              <div className="text-2xl font-bold">2</div>
              <div className="text-sm text-muted-foreground">Alerts</div>
            </CardContent>
          </Card>
        </div>

        {/* Water Quality Status */}
        <WaterQualityCard reading={waterQualityData} />

        {/* Main Content Tabs */}
        <Tabs defaultValue="workers" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="workers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Workers
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="workers" className="space-y-4">
            {/* Add Worker Form */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  {t('addAshaWorker')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="workerName">{t('workerName')}</Label>
                    <Input
                      id="workerName"
                      value={newWorker.name}
                      onChange={(e) => setNewWorker({...newWorker, name: e.target.value})}
                      placeholder="Enter worker name"
                      className="h-10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="workerId">{t('workerId')}</Label>
                    <Input
                      id="workerId"
                      value={newWorker.workerId}
                      onChange={(e) => setNewWorker({...newWorker, workerId: e.target.value})}
                      placeholder="Enter worker ID"
                      className="h-10"
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleAddWorker} 
                  variant="community" 
                  className="w-full md:w-auto"
                  disabled={!newWorker.name || !newWorker.workerId}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Worker & Send SMS
                </Button>
              </CardContent>
            </Card>

            {/* Workers List */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Active ASHA Workers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workers.map((worker) => (
                    <div key={worker.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">{worker.name}</div>
                        <div className="text-sm text-muted-foreground">ID: {worker.id}</div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${worker.status === 'active' ? 'bg-water-safe text-white' : 'bg-muted text-muted-foreground'}`}>
                        {worker.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>{t('healthTrends')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Health trend charts will be displayed here</p>
                  <p className="text-sm">Data visualization coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>{t('settings')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Village Name</Label>
                    <Input value={adminData.village} disabled />
                  </div>
                  <div>
                    <Label>Admin Name</Label>
                    <Input value={adminData.name} disabled />
                  </div>
                  <Button variant="outline">
                    Update Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;