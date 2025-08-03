import { useState } from 'react';
import { LoadingScreen } from './LoadingScreen';
import { useImagePreloader } from '../hooks/useImagePreloader';

interface PageLoaderProps {
  children: React.ReactNode;
}

export const PageLoader = ({ children }: PageLoaderProps) => {
  const { progress, isLoading } = useImagePreloader();
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setShowContent(true);
  };

  if (!showContent) {
    return (
      <LoadingScreen 
        onLoadingComplete={handleLoadingComplete}
        progress={progress}
      />
    );
  }

  return (
    <div className="animate-fadeIn">
      {children}
    </div>
  );
}; 