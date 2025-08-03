import { useState, useEffect } from 'react';
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

  // Show content when either loading is complete or progress is high enough
  useEffect(() => {
    if (!isLoading || progress >= 80) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isLoading, progress]);

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