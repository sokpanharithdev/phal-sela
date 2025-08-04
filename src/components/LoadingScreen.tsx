import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  progress: number;
}

export const LoadingScreen = ({ onLoadingComplete, progress }: LoadingScreenProps) => {
  // const [isVisible, setIsVisible] = useState(true);

  // useEffect(() => {
  //   if (progress >= 100) {
  //     setTimeout(() => {
  //       setIsVisible(false);
  //       setTimeout(onLoadingComplete, 300);
  //     }, 200);
  //   }
  // }, [progress, onLoadingComplete]);

  // if (!isVisible) {
  //   return null;
  // }

  return (
    // <div className="fixed inset-0 z-50 bg-background flex items-center justify-center animate-fadeIn">
    //   <div className="text-center">
    //     {/* Logo/Name Animation */}
    //     <div className="mb-8 animate-scaleIn">
    //       <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
    //         PHAL SELA
    //       </h1>
    //       <p className="text-lg md:text-xl text-muted-foreground mt-2 animate-fadeInUp">
    //         UX UI Designer
    //       </p>
    //     </div>

    //     {/* Loading Bar */}
    //     <div className="w-64 md:w-80 mx-auto mb-6">
    //       <div className="relative">
    //         <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
    //           <div 
    //             className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-300 ease-out"
    //             style={{ width: `${progress}%` }}
    //           />
    //         </div>
    //         <div className="absolute -top-8 right-0 text-sm text-muted-foreground animate-fadeIn">
    //           {Math.round(progress)}%
    //         </div>
    //       </div>
    //     </div>

    //     {/* Loading Dots */}
    //     <div className="flex justify-center space-x-2 animate-fadeIn">
    //       {[0, 1, 2].map((i) => (
    //         <div
    //           key={i}
    //           className="w-2 h-2 bg-primary rounded-full animate-pulse"
    //           style={{
    //             animationDelay: `${i * 0.2}s`,
    //             animationDuration: '1.5s'
    //           }}
    //         />
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <></>
  );
}; 