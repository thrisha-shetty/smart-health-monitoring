import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Droplets, Thermometer, PanelBottomOpen } from 'lucide-react';

interface WaterQualityReading {
  turbidity: number;
  pH: number;
  temperature: number;
  timestamp: Date;
  location: string;
}

interface WaterQualityCardProps {
  reading: WaterQualityReading;
}

const WaterQualityCard: React.FC<WaterQualityCardProps> = ({ reading }) => {
  const { t } = useLanguage();

  const getQualityStatus = (turbidity: number, pH: number) => {
    if (turbidity > 5 || pH < 6.5 || pH > 8.5) {
      return { status: 'unsafe', color: 'bg-water-unsafe', text: t('unsafe') };
    } else if (turbidity > 2 || pH < 7 || pH > 8) {
      return { status: 'warning', color: 'bg-water-warning', text: t('warning') };
    }
    return { status: 'safe', color: 'bg-water-safe', text: t('safe') };
  };

  const getTurbidityStatus = (turbidity: number) => {
    if (turbidity > 5) return 'unsafe';
    if (turbidity > 2) return 'warning';
    return 'safe';
  };

  const getPHStatus = (pH: number) => {
    if (pH < 6.5 || pH > 8.5) return 'unsafe';
    if (pH < 7 || pH > 8) return 'warning';
    return 'safe';
  };

  const getTemperatureStatus = (temp: number) => {
    if (temp > 30) return 'warning';
    return 'safe';
  };

  const qualityStatus = getQualityStatus(reading.turbidity, reading.pH);

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Droplets className="w-5 h-5 text-primary" />
            {t('waterQuality')}
          </CardTitle>
          <Badge className={`${qualityStatus.color} text-white border-0`}>
            {qualityStatus.text}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{reading.location}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <PanelBottomOpen className={`w-6 h-6 mx-auto mb-2 ${getTurbidityStatus(reading.turbidity) === 'safe' ? 'text-water-safe' : getTurbidityStatus(reading.turbidity) === 'warning' ? 'text-water-warning' : 'text-water-unsafe'}`} />
            <div className="text-sm font-medium">{t('turbidity')}</div>
            <div className="text-lg font-bold">{reading.turbidity} NTU</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className={`w-6 h-6 mx-auto mb-2 rounded-full ${getPHStatus(reading.pH) === 'safe' ? 'bg-water-safe' : getPHStatus(reading.pH) === 'warning' ? 'bg-water-warning' : 'bg-water-unsafe'}`}>
              <span className="text-xs text-white font-bold flex items-center justify-center h-full">pH</span>
            </div>
            <div className="text-sm font-medium">{t('pH')}</div>
            <div className="text-lg font-bold">{reading.pH}</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <Thermometer className={`w-6 h-6 mx-auto mb-2 ${getTemperatureStatus(reading.temperature) === 'safe' ? 'text-water-safe' : 'text-water-warning'}`} />
            <div className="text-sm font-medium">{t('temperature')}</div>
            <div className="text-lg font-bold">{reading.temperature}°C</div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground text-center">
          Last updated: {reading.timestamp.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterQualityCard;