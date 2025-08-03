import { useState, useEffect } from 'react';
import portfolioData from '../data/portfolio.json';

export const useImagePreloader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      // Separate critical images (above the fold) from non-critical
      const criticalImages: string[] = [
        portfolioData.personal.profileImage,
        portfolioData.personal.profileImage1,
        '/sela/linkedin.png',
        '/sela/telegram.png',
        '/sela/facebook.png',
        '/sela/behance.svg',
      ];

      const nonCriticalImages: string[] = [];

      // Add project images to non-critical
      portfolioData.projects.forEach(project => {
        if (project.image) nonCriticalImages.push(project.image);
        if (project.logo) nonCriticalImages.push(project.logo);
        if (project.images) {
          project.images.forEach(img => nonCriticalImages.push(img));
        }
      });

      // Add other assets
      nonCriticalImages.push('/sela/footer.png');

      let loadedCount = 0;
      const totalImages = criticalImages.length + nonCriticalImages.length;

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
        // Load critical images first with higher priority
        await Promise.all(criticalImages.map(loadImage));
        
        // Start loading non-critical images in background
        const nonCriticalPromise = Promise.all(nonCriticalImages.map(loadImage));
        
        // Wait for either all images to load or a maximum time
        const timeoutPromise = new Promise(resolve => setTimeout(resolve, 800));
        
        await Promise.race([nonCriticalPromise, timeoutPromise]);
        
        // Ensure minimum loading time for smooth UX (reduced from 1500ms to 800ms)
        const minLoadingTime = 800;
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