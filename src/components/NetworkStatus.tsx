import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showOfflineMessage && isOnline) {
    return null;
  }

  return (
    <div className="fixed top-20 left-4 right-4 z-50 max-w-md mx-auto">
      <Alert variant={isOnline ? "default" : "destructive"}>
        {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
        <AlertDescription>
          {isOnline 
            ? "Connection restored!" 
            : "You're offline. Some features may not work properly."
          }
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default NetworkStatus;