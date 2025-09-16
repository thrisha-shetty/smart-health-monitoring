import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Droplets, 
  Utensils, 
  HandHeart, 
  Users, 
  AlertTriangle,
  Heart,
  Thermometer
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const HealthAwareness: React.FC = () => {
  const { t } = useLanguage();

  const healthTips = [
    {
      id: 1,
      icon: <Droplets className="w-6 h-6" />,
      title: "Safe Water Practices",
      tips: [
        "Boil water for at least 5 minutes before drinking",
        "Store boiled water in clean covered containers",
        "Use only clean water for cooking and washing utensils",
        "Avoid drinking from stagnant or muddy water sources"
      ],
      priority: "high"
    },
    {
      id: 2,
      icon: <HandHeart className="w-6 h-6" />,
      title: "Personal Hygiene",
      tips: [
        "Wash hands with soap for 20 seconds before meals",
        "Clean hands after using the toilet",
        "Keep fingernails short and clean",
        "Take regular baths with clean water"
      ],
      priority: "high"
    },
    {
      id: 3,
      icon: <Utensils className="w-6 h-6" />,
      title: "Food Safety",
      tips: [
        "Cook food thoroughly and eat while hot",
        "Cover food to protect from flies and dust",
        "Wash fruits and vegetables with clean water",
        "Don't eat food left outside for more than 2 hours"
      ],
      priority: "medium"
    },
    {
      id: 4,
      icon: <Users className="w-6 h-6" />,
      title: "Community Health",
      tips: [
        "Keep surroundings clean and free from stagnant water",
        "Dispose of waste in designated areas",
        "Report illness symptoms to ASHA workers immediately",
        "Participate in community health programs"
      ],
      priority: "medium"
    },
    {
      id: 5,
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Emergency Signs",
      tips: [
        "Seek immediate help for high fever (above 102°F)",
        "Watch for signs of dehydration: dizziness, dry mouth",
        "Don't ignore persistent vomiting or diarrhea",
        "Contact health workers for unusual skin rashes"
      ],
      priority: "critical"
    },
    {
      id: 6,
      icon: <Heart className="w-6 h-6" />,
      title: "Preventive Care",
      tips: [
        "Get regular health checkups with ASHA workers",
        "Follow vaccination schedules for children",
        "Maintain clean environment around water sources",
        "Use mosquito nets during peak mosquito hours"
      ],
      priority: "medium"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-health-critical text-white';
      case 'high': return 'bg-water-warning text-white';
      case 'medium': return 'bg-health-good text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <Shield className="w-4 h-4" />;
      case 'medium': return <Heart className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-3 gradient-health rounded-full animate-pulse-glow">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Health & Hygiene Guidelines
        </h2>
        <p className="text-muted-foreground">
          Essential practices for maintaining good health in rural communities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {healthTips.map((tip, index) => (
          <Card 
            key={tip.id} 
            className="shadow-card hover:shadow-floating transition-all duration-300 animate-fade-in border-l-4 border-l-primary"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {tip.icon}
                  </div>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                </div>
                <Badge className={`${getPriorityColor(tip.priority)} flex items-center gap-1`}>
                  {getPriorityIcon(tip.priority)}
                  {tip.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tip.tips.map((tipText, tipIndex) => (
                  <li key={tipIndex} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{tipText}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Reference Card */}
      <Card className="shadow-card bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Thermometer className="w-5 h-5" />
            Quick Health Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-water-safe/10 rounded-lg">
              <div className="font-medium text-water-safe mb-1">Normal Temperature</div>
              <div className="text-muted-foreground">96.8°F - 99.5°F (36°C - 37.5°C)</div>
            </div>
            <div className="p-3 bg-water-warning/10 rounded-lg">
              <div className="font-medium text-water-warning mb-1">Mild Fever</div>
              <div className="text-muted-foreground">99.6°F - 102°F (37.6°C - 38.9°C)</div>
            </div>
            <div className="p-3 bg-water-unsafe/10 rounded-lg">
              <div className="font-medium text-water-unsafe mb-1">High Fever - Seek Help</div>
              <div className="text-muted-foreground">Above 102°F (38.9°C)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthAwareness;