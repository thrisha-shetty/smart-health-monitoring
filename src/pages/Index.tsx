import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import SplashScreen from '@/components/SplashScreen';
import LanguageSelector from '@/components/LanguageSelector';
import RoleSelector from '@/components/RoleSelector';
import AdminLogin from '@/components/AdminLogin';
import AshaLogin from '@/components/AshaLogin';
import AdminDashboard from '@/components/AdminDashboard';
import AshaDashboard from '@/components/AshaDashboard';

type AppState = 
  | 'splash'
  | 'language-selection'
  | 'role-selection' 
  | 'admin-login'
  | 'asha-login'
  | 'admin-dashboard'
  | 'asha-dashboard';

interface UserData {
  admin?: { name: string; village: string };
  asha?: { workerId: string; password: string };
}

const Index = () => {
  const { language } = useLanguage();
  const [appState, setAppState] = useState<AppState>('splash');
  const [userData, setUserData] = useState<UserData>({});

  // Check if language is already selected
  useEffect(() => {
    const savedLanguage = localStorage.getItem('healthMonitorLanguage');
    if (savedLanguage && appState === 'splash') {
      // Skip language selection if already set
      setTimeout(() => setAppState('role-selection'), 3000);
    }
  }, [appState]);

  const handleSplashComplete = () => {
    const savedLanguage = localStorage.getItem('healthMonitorLanguage');
    if (savedLanguage) {
      setAppState('role-selection');
    } else {
      setAppState('language-selection');
    }
  };

  const handleLanguageSelectionComplete = () => {
    setAppState('role-selection');
  };

  const handleRoleSelection = (role: 'admin' | 'asha') => {
    if (role === 'admin') {
      setAppState('admin-login');
    } else {
      setAppState('asha-login');
    }
  };

  const handleAdminLogin = (adminData: { name: string; village: string }) => {
    setUserData({ admin: adminData });
    setAppState('admin-dashboard');
  };

  const handleAshaLogin = (workerData: { workerId: string; password: string }) => {
    setUserData({ asha: workerData });
    setAppState('asha-dashboard');
  };

  const handleLogout = () => {
    setUserData({});
    setAppState('role-selection');
  };

  const handleBackToRoleSelection = () => {
    setAppState('role-selection');
  };

  // Update page title and meta description based on current state
  useEffect(() => {
    const titles = {
      'splash': 'Smart Health Monitoring - Rural Water Quality',
      'language-selection': 'Select Language - Smart Health Monitoring',
      'role-selection': 'Select Role - Smart Health Monitoring',
      'admin-login': 'Admin Login - Smart Health Monitoring',
      'asha-login': 'ASHA Worker Login - Smart Health Monitoring',
      'admin-dashboard': 'Admin Dashboard - Smart Health Monitoring',
      'asha-dashboard': 'ASHA Dashboard - Smart Health Monitoring'
    };
    
    document.title = titles[appState];
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Smart Community Health Monitoring system for rural Northeast India. Monitor water quality, track patient health, and manage ASHA workers efficiently.'
      );
    }
  }, [appState]);

  // Render current screen based on app state
  switch (appState) {
    case 'splash':
      return <SplashScreen onComplete={handleSplashComplete} />;
    
    case 'language-selection':
      return <LanguageSelector onComplete={handleLanguageSelectionComplete} />;
    
    case 'role-selection':
      return <RoleSelector onRoleSelect={handleRoleSelection} />;
    
    case 'admin-login':
      return (
        <AdminLogin 
          onLogin={handleAdminLogin} 
          onBack={handleBackToRoleSelection}
        />
      );
    
    case 'asha-login':
      return (
        <AshaLogin 
          onLogin={handleAshaLogin} 
          onBack={handleBackToRoleSelection}
        />
      );
    
    case 'admin-dashboard':
      return userData.admin ? (
        <AdminDashboard 
          adminData={userData.admin} 
          onLogout={handleLogout}
        />
      ) : null;
    
    case 'asha-dashboard':
      return userData.asha ? (
        <AshaDashboard 
          workerData={userData.asha} 
          onLogout={handleLogout}
        />
      ) : null;
    
    default:
      return <SplashScreen onComplete={handleSplashComplete} />;
  }
};

export default Index;
