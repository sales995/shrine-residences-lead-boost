import React from 'react';
import { CircleAlert as AlertCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorMessageProps {
  error: Error | string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  error, 
  onRetry, 
  className 
}) => {
  const errorMessage = typeof error === 'string' ? error : error.message;
  const isNetworkError = errorMessage.toLowerCase().includes('network') || 
                        errorMessage.toLowerCase().includes('fetch');
  const isServerError = errorMessage.includes('503') || 
                       errorMessage.includes('500') ||
                       errorMessage.toLowerCase().includes('server');

  const getErrorIcon = () => {
    if (isNetworkError) return <WifiOff className="h-4 w-4" />;
    if (isServerError) return <Wifi className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  const getErrorTitle = () => {
    if (isNetworkError) return 'Connection Problem';
    if (isServerError) return 'Service Unavailable';
    return 'Error Occurred';
  };

  const getErrorDescription = () => {
    if (isNetworkError) {
      return 'Please check your internet connection and try again.';
    }
    if (isServerError) {
      return 'Our servers are temporarily unavailable. Please try again in a few moments.';
    }
    return errorMessage;
  };

  return (
    <Alert variant="destructive" className={className}>
      {getErrorIcon()}
      <AlertTitle>{getErrorTitle()}</AlertTitle>
      <AlertDescription className="mt-2">
        {getErrorDescription()}
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="mt-3 bg-white hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorMessage;