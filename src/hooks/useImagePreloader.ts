import { useState, useEffect } from 'react';
import portfolioData from '../data/portfolio.json';

export const useImagePreloader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      // Only load critical images for faster initial load
      const criticalImages: string[] = [
        portfolioData.personal.profileImage,
        portfolioData.personal.profileImage1,
        '/sela/linkedin.png',
        '/sela/telegram.png',
        '/sela/facebook.png',
        '/sela/behance.svg',
      ];

      let loadedCount = 0;
      const totalImages = criticalImages.length;

      const loadImage = (src: string): Promise<void> => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            loadedCount++;
            setProgress((loadedCount / totalImages) * 100);
            resolve();
          };
          img.onerror = () => {
            loadedCount++;
            setProgress((loadedCount / totalImages) * 100);
            resolve(); // Continue even if some images fail
          };
          img.src = src;
        });
      };

      try {
        // Load critical images with a timeout
        const loadPromise = Promise.all(criticalImages.map(loadImage));
        const timeoutPromise = new Promise(resolve => setTimeout(resolve, 500));
        
        await Promise.race([loadPromise, timeoutPromise]);
        
        // Very short minimum loading time for better UX
        const minLoadingTime = 400;
        const elapsedTime = Date.now() - performance.now();
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  return { progress, isLoading };
}; 