import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PageLoader } from "@/components/PageLoader";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageLoader>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">Oops! Page not found</p>
          <a 
            href="/" 
            className="text-primary hover:text-primary/80 underline transition-colors duration-200"
          >
            Return to Home
          </a>
        </div>
      </div>
    </PageLoader>
  );
};

export default NotFound;
