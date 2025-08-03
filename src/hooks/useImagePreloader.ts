import { useState, useEffect } from 'react';
import portfolioData from '../data/portfolio.json';

export const useImagePreloader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      const images: string[] = [];

      // Add profile images
      images.push(portfolioData.personal.profileImage);
      images.push(portfolioData.personal.profileImage1);

      // Add project images
      portfolioData.projects.forEach(project => {
        if (project.image) images.push(project.image);
        if (project.logo) images.push(project.logo);
        if (project.images) {
          project.images.forEach(img => images.push(img));
        }
      });

      // Add social media icons
      images.push('/sela/linkedin.png');
      images.push('/sela/telegram.png');
      images.push('/sela/facebook.png');
      images.push('/sela/behance.svg');

      // Add other assets
      images.push('/sela/footer.png');

      let loadedCount = 0;
      const totalImages = images.length;

      const loadImage = (src: string): Promise<void> => {
        return new Promise((resolve, reject) => {
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
        await Promise.all(images.map(loadImage));
        
        // Ensure minimum loading time for smooth UX
        const minLoadingTime = 1500;
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