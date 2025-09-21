import React, { useState, useMemo } from 'react';
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
  UserPlus,
  Activity,
  Droplets,
  AlertCircle,
  Trash2,
  List,
  CheckCircle,
  AlertTriangle,
  Award,
  FlaskConical,
  HeartCrack
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

  const [activeTab, setActiveTab] = useState('workers');

  // Dummy data for Active Cases, now with village info
  const [activeCases, setActiveCases] = useState([
    { id: 'C-001', patient: 'Ramesh Singh', issue: 'High Fever', worker: 'ASHA001', status: 'pending', date: '2025-09-15', village: 'Rampur' },
    { id: 'C-002', patient: 'Sita Devi', issue: 'Diarrhea', worker: 'ASHA002', status: 'in-progress', date: '2025-09-14', village: 'Rampur' },
    { id: 'C-003', patient: 'Gopal Reddy', issue: 'Water-borne Illness', worker: 'ASHA001', status: 'resolved', date: '2025-09-12', village: 'Rampur' },
    { id: 'C-004', patient: 'Anjali Patel', issue: 'Malnutrition', worker: 'ASHA003', status: 'pending', date: '2025-09-10', village: 'Srinagar' },
    { id: 'C-005', patient: 'Arjun Kumar', issue: 'Typhoid', worker: 'ASHA001', status: 'pending', date: '2025-09-16', village: 'Gokul' },
    { id: 'C-006', patient: 'Lata Singh', issue: 'Diarrhea', worker: 'ASHA002', status: 'in-progress', date: '2025-09-15', village: 'Gokul' },
    { id: 'C-007', patient: 'Pooja Rai', issue: 'Fever', worker: 'ASHA003', status: 'pending', date: '2025-09-14', village: 'Rampur' },
    { id: 'C-008', patient: 'Vikram Sharma', issue: 'Water-borne Illness', worker: 'ASHA001', status: 'pending', date: '2025-09-13', village: 'Srinagar' }
  ]);

  // Dummy data for Alerts
  const [alerts, setAlerts] = useState([
    { id: 'A-001', type: 'Water Quality', description: 'Turbidity above safe levels at source #3', timestamp: '2025-09-16 10:30 AM' },
    { id: 'A-002', type: 'Health Alert', description: 'Possible outbreak of diarrhea in Sector B', timestamp: '2025-09-16 09:15 AM' }
  ]);

  // Dummy data for Water Sources, now with village info
  const [waterSources, setWaterSources] = useState([
    { id: 'WS-001', name: 'Village Well - North', status: 'safe', lastTest: '2025-09-15', location: 'Near Panchayat Office', village: 'Rampur' },
    { id: 'WS-002', name: 'Community Borewell', status: 'warning', lastTest: '2025-09-16', location: 'Main Village Square', village: 'Rampur' },
    { id: 'WS-003', name: 'Hand Pump - South', status: 'safe', lastTest: '2025-09-16', location: 'South Sector, behind school', village: 'Srinagar' },
    { id: 'WS-004', name: 'Village Well - Central', status: 'warning', lastTest: '2025-09-16', location: 'Near Community Hall', village: 'Gokul' },
    { id: 'WS-005', name: 'Hand Pump - North', status: 'safe', lastTest: '2025-09-15', location: 'Near Temple', village: 'Gokul' },
    { id: 'WS-006', name: 'Community Pond', status: 'warning', lastTest: '2025-09-15', location: 'Near Forest', village: 'Rampur' },
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

  const handleRemoveWorker = (workerId: string) => {
    if (window.confirm(`Are you sure you want to remove ASHA Worker with ID: ${workerId}?`)) {
      setWorkers(workers.filter(worker => worker.id !== workerId));
      alert(`ASHA Worker with ID: ${workerId} has been removed.`);
    }
  };

  const handleCardClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  // Memoized function to calculate and sort the leaderboard
  const leaderboardData = useMemo(() => {
    const scores: { [key: string]: { score: number; patients: number; waterIssues: number } } = {};

    const getVillageScore = (village: string) => {
      if (!scores[village]) {
        scores[village] = { score: 0, patients: 0, waterIssues: 0 };
      }
      return scores[village];
    };

    // Calculate scores for active/pending cases
    activeCases.forEach(caseItem => {
      if (caseItem.status !== 'resolved') {
        getVillageScore(caseItem.village).score += 1;
        getVillageScore(caseItem.village).patients += 1;
      }
    });

    // Calculate scores for unhygienic water sources
    waterSources.forEach(source => {
      if (source.status === 'warning') {
        getVillageScore(source.village).score += 2; // Weight water issues more
        getVillageScore(source.village).waterIssues += 1;
      }
    });

    // Convert to array and sort by score descending
    return Object.entries(scores)
      .map(([village, data]) => ({ village, ...data }))
      .sort((a, b) => b.score - a.score);
  }, [activeCases, waterSources]);

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
          <Card 
            className="shadow-card hover:shadow-floating transition-all duration-300 animate-slide-up cursor-pointer"
            onClick={() => handleCardClick('workers')}
          >
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-secondary mx-auto mb-2 animate-bounce-gentle" />
              <div className="text-2xl font-bold">{workers.length}</div>
              <div className="text-sm text-muted-foreground">ASHA Workers</div>
            </CardContent>
          </Card>
          
          <Card 
            className="shadow-card hover:shadow-floating transition-all duration-300 animate-slide-up cursor-pointer" 
            style={{ animationDelay: '100ms' }}
            onClick={() => handleCardClick('activeCases')}
          >
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 text-primary mx-auto mb-2 animate-float" />
              <div className="text-2xl font-bold">{activeCases.length}</div>
              <div className="text-sm text-muted-foreground">Active Cases</div>
            </CardContent>
          </Card>
          
          <Card 
            className="shadow-card hover:shadow-floating transition-all duration-300 animate-slide-up cursor-pointer" 
            style={{ animationDelay: '200ms' }}
            onClick={() => handleCardClick('reports')}
          >
            <CardContent className="p-4 text-center">
              <Droplets className="w-8 h-8 text-water-safe mx-auto mb-2 animate-pulse" />
              <div className="text-2xl font-bold">{waterSources.length}</div>
              <div className="text-sm text-muted-foreground">Water Sources</div>
            </CardContent>
          </Card>
          
          <Card 
            className="shadow-card hover:shadow-floating transition-all duration-300 animate-slide-up cursor-pointer" 
            style={{ animationDelay: '300ms' }}
            onClick={() => handleCardClick('alerts')}
          >
            <CardContent className="p-4 text-center">
              <AlertCircle className="w-8 h-8 text-water-warning mx-auto mb-2 animate-bounce-gentle" />
              <div className="text-2xl font-bold">{alerts.length}</div>
              <div className="text-sm text-muted-foreground">Alerts</div>
            </CardContent>
          </Card>
        </div>

        {/* Water Quality Status */}
        <WaterQualityCard reading={waterQualityData} />

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="workers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Workers
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="activeCases" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              Cases
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Alerts
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
                <CardTitle>ASHA Workers ({workers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workers.map((worker) => (
                    <div key={worker.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">{worker.name}</div>
                        <div className="text-sm text-muted-foreground">ID: {worker.id}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${worker.status === 'active' ? 'bg-water-safe text-white' : 'bg-muted text-muted-foreground'}`}>
                          {worker.status}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleRemoveWorker(worker.id)}
                          className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            {/* Health & Hygiene Leaderboard */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Health & Hygiene Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                {leaderboardData.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Villages are ranked based on the number of pending health cases and unhygienic water sources.</p>
                    <div className="space-y-3">
                      {leaderboardData.map((data, index) => (
                        <div key={data.village} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${index === 0 ? 'bg-amber-400' : index === 1 ? 'bg-slate-400' : index === 2 ? 'bg-yellow-700' : 'bg-secondary'}`}>
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium">{data.village}</div>
                              <div className="text-sm text-muted-foreground">Score: {data.score}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <HeartCrack className="w-4 h-4 text-red-500" />
                              <span className="font-bold">{data.patients}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FlaskConical className="w-4 h-4 text-yellow-500" />
                              <span className="font-bold">{data.waterIssues}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>No health and hygiene data available to display the leaderboard.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Health Trend Chart - Placeholder */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>{t('healthTrends')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Health trend charts will be displayed here.</p>
                  <p className="text-sm">Data visualization coming soon</p>
                </div>
              </CardContent>
            </Card>

            {/* Water Sources List */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Water Sources ({waterSources.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {waterSources.map((source) => (
                    <div key={source.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">{source.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Location: {source.location} | Last Test: {source.lastTest}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {source.status === 'safe' ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${source.status === 'safe' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                          {source.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activeCases">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Active Cases ({activeCases.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeCases.map((caseItem) => (
                    <div key={caseItem.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">{caseItem.patient}</div>
                        <div className="text-sm text-muted-foreground">Issue: {caseItem.issue}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${caseItem.status === 'resolved' ? 'bg-green-500 text-white' : caseItem.status === 'in-progress' ? 'bg-blue-500 text-white' : 'bg-yellow-500 text-white'}`}>
                          {caseItem.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Water Quality Alerts ({alerts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1 pr-4">
                        <div className="font-medium">{alert.type}</div>
                        <div className="text-sm text-muted-foreground">{alert.description}</div>
                      </div>
                      <div className="text-xs text-muted-foreground min-w-[100px] text-right">
                        {alert.timestamp}
                      </div>
                    </div>
                  ))}
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