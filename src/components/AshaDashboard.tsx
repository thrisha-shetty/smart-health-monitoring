import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  UserPlus, 
  FileText, 
  Bell, 
  Settings,
  User,
  Droplets,
  Thermometer,
  Save,
  MapPin,
  Shield
} from 'lucide-react';
import WaterQualityCard from './WaterQualityCard';
import HealthAwareness from './HealthAwareness';
import { useToast } from '@/hooks/use-toast';

interface AshaDashboardProps {
  workerData: { workerId: string; password: string };
  onLogout: () => void;
}

const AshaDashboard: React.FC<AshaDashboardProps> = ({ workerData, onLogout }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: '',
    symptoms: '',
    location: ''
  });

  const [waterData, setWaterData] = useState({
    turbidity: '',
    pH: '',
    temperature: '',
    sourceCondition: '',
    location: ''
  });

  // Mock current water quality data
  const currentWaterQuality = {
    turbidity: 2.1,
    pH: 7.5,
    temperature: 26,
    timestamp: new Date(),
    location: 'Village Well'
  };

  const handlePatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save patient data (would normally send to API)
    toast({
      title: "Patient data saved",
      description: "Patient information has been recorded successfully.",
    });
    setPatientData({
      name: '',
      age: '',
      gender: '',
      symptoms: '',
      location: ''
    });
  };

  const handleWaterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save water quality data (would normally send to API)
    toast({
      title: "Water quality data saved",
      description: "Water quality measurements have been recorded.",
    });
    setWaterData({
      turbidity: '',
      pH: '',
      temperature: '',
      sourceCondition: '',
      location: ''
    });
  };

  const symptoms = [
    { value: 'fever', label: t('fever') },
    { value: 'cough', label: t('cough') },
    { value: 'diarrhea', label: t('diarrhea') },
    { value: 'vomiting', label: t('vomiting') },
    { value: 'skinIssues', label: t('skinIssues') },
    { value: 'stomachPain', label: t('stomachPain') },
    { value: 'headache', label: t('headache') },
    { value: 'bodyPain', label: t('bodyPain') }
  ];

  const waterSourceConditions = [
    { value: 'clean', label: t('clean') },
    { value: 'muddy', label: t('muddy') },
    { value: 'stagnant', label: t('stagnant') }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-health text-white p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold">{t('ashaWorker')} {t('dashboard')}</h1>
            <p className="opacity-90">ID: {workerData.workerId}</p>
          </div>
          <Button variant="outline" onClick={onLogout} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Current Water Quality Status */}
        <WaterQualityCard reading={currentWaterQuality} />

        {/* Bottom Navigation */}
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="home" className="flex flex-col items-center gap-1 h-16">
              <Home className="w-4 h-4" />
              <span className="text-xs">{t('dashboard')}</span>
            </TabsTrigger>
            <TabsTrigger value="dataentry" className="flex flex-col items-center gap-1 h-16">
              <UserPlus className="w-4 h-4" />
              <span className="text-xs">{t('dataEntry')}</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex flex-col items-center gap-1 h-16">
              <FileText className="w-4 h-4" />
              <span className="text-xs">{t('reports')}</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex flex-col items-center gap-1 h-16">
              <Bell className="w-4 h-4" />
              <span className="text-xs">{t('alerts')}</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex flex-col items-center gap-1 h-16">
              <Settings className="w-4 h-4" />
              <span className="text-xs">{t('settings')}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="home" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-card hover:shadow-floating transition-all duration-300 animate-fade-in">
                <CardContent className="p-4 text-center">
                  <User className="w-8 h-8 text-primary mx-auto mb-2 animate-bounce-gentle" />
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-muted-foreground">Patients Today</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card hover:shadow-floating transition-all duration-300 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <CardContent className="p-4 text-center">
                  <Droplets className="w-8 h-8 text-water-safe mx-auto mb-2 animate-float" />
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-muted-foreground">Water Tests</div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm">Water quality test - Village Well</span>
                    <Badge variant="outline">2 hours ago</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm">Patient: Sunita Devi - Fever symptoms</span>
                    <Badge variant="outline">4 hours ago</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="dataentry" className="space-y-6">
            {/* Patient Data Entry */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {t('patientInfo')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePatientSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patientName">{t('patientName')}</Label>
                      <Input
                        id="patientName"
                        value={patientData.name}
                        onChange={(e) => setPatientData({...patientData, name: e.target.value})}
                        placeholder="Enter patient name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">{t('age')}</Label>
                      <Input
                        id="age"
                        type="number"
                        value={patientData.age}
                        onChange={(e) => setPatientData({...patientData, age: e.target.value})}
                        placeholder="Enter age"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>{t('gender')}</Label>
                      <Select value={patientData.gender} onValueChange={(value) => setPatientData({...patientData, gender: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">{t('male')}</SelectItem>
                          <SelectItem value="female">{t('female')}</SelectItem>
                          <SelectItem value="other">{t('other')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>{t('symptoms')}</Label>
                      <Select value={patientData.symptoms} onValueChange={(value) => setPatientData({...patientData, symptoms: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select symptoms" />
                        </SelectTrigger>
                        <SelectContent>
                          {symptoms.map((symptom) => (
                            <SelectItem key={symptom.value} value={symptom.value}>
                              {symptom.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="patientLocation">{t('location')}</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="patientLocation"
                        value={patientData.location}
                        onChange={(e) => setPatientData({...patientData, location: e.target.value})}
                        placeholder="Enter location"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" variant="health" className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    {t('saveData')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Water Quality Data Entry */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-primary" />
                  {t('waterQuality')} Entry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWaterSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="turbidity">{t('turbidity')} (NTU)</Label>
                      <Input
                        id="turbidity"
                        type="number"
                        step="0.1"
                        value={waterData.turbidity}
                        onChange={(e) => setWaterData({...waterData, turbidity: e.target.value})}
                        placeholder="0.0"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="pH">{t('pH')}</Label>
                      <Input
                        id="pH"
                        type="number"
                        step="0.1"
                        value={waterData.pH}
                        onChange={(e) => setWaterData({...waterData, pH: e.target.value})}
                        placeholder="7.0"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="temperature">{t('temperature')} (°C)</Label>
                      <Input
                        id="temperature"
                        type="number"
                        value={waterData.temperature}
                        onChange={(e) => setWaterData({...waterData, temperature: e.target.value})}
                        placeholder="25"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>{t('waterSourceCondition')}</Label>
                      <Select value={waterData.sourceCondition} onValueChange={(value) => setWaterData({...waterData, sourceCondition: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {waterSourceConditions.map((condition) => (
                            <SelectItem key={condition.value} value={condition.value}>
                              {condition.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="waterLocation">{t('location')}</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="waterLocation"
                          value={waterData.location}
                          onChange={(e) => setWaterData({...waterData, location: e.target.value})}
                          placeholder="Water source location"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" variant="water" className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Water Quality Data
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>{t('reports')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Reports will be displayed here</p>
                  <p className="text-sm">Patient and water quality reports</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  {t('alerts')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-water-warning/10 border border-water-warning/20 rounded-lg animate-fade-in">
                    <div className="flex items-center gap-2 text-water-warning font-medium">
                      <Bell className="w-4 h-4" />
                      Water Quality Alert
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      High turbidity detected at East Village Well
                    </p>
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded-lg animate-fade-in" style={{ animationDelay: '100ms' }}>
                    <div className="font-medium">Health Reminder</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Weekly health checkup due for 5 patients
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Health Awareness Section */}
            <Card className="shadow-card border-primary/20 animate-slide-up">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Shield className="w-5 h-5" />
                  Health & Hygiene Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <HealthAwareness />
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
                    <Label>Worker ID</Label>
                    <Input value={workerData.workerId} disabled />
                  </div>
                  <Button variant="outline">
                    Change Language
                  </Button>
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

export default AshaDashboard;