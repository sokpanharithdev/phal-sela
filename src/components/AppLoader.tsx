import React from 'react';

export const AppLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-background text-foreground flex items-center justify-center dark">
      <div className="text-center">
        {/* Logo/Name Animation */}
        <div className="mb-8 animate-scaleIn">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            PHAL SELA
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-2 animate-fadeInUp">
            UX UI Designer
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 animate-fadeIn">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 