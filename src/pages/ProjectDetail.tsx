import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import { PageLoader } from '@/components/PageLoader';
import portfolioData from '../data/portfolio.json';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollY = useRef(0);
  const isScrollingDown = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const animationTriggered = useRef<Set<number>>(new Set());
  
  const project = portfolioData.projects.find(p => p.slug === slug);

  // Initialize image refs
  useEffect(() => {
    if (project?.images) {
      imageRefs.current = new Array(project.images.length).fill(null);
    }
  }, [project?.images]);

  // Enhanced scroll-based animation system for images
  useEffect(() => {
    if (!project?.images) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
      
      // Update scroll direction
      isScrollingDown.current = scrollDirection === 'down' && scrollDelta > 10;
      lastScrollY.current = currentScrollY;

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Debounce scroll events for better performance
      scrollTimeout.current = setTimeout(() => {
        // If scrolling up, don't trigger any animations
        if (!isScrollingDown.current) {
          return;
        }

        imageRefs.current.forEach((ref, index) => {
          if (!ref) return;

          const rect = ref.getBoundingClientRect();
          const triggerPoint = window.innerHeight * 0.8;
          const isInView = rect.top < triggerPoint && rect.bottom > 0;

          // Only trigger animation if scrolling down, in view, and not already triggered
          if (isInView && !animationTriggered.current.has(index)) {
            animationTriggered.current.add(index);
            
            // Add staggered delay for smooth sequential animations
            setTimeout(() => {
              setVisibleImages(prev => {
                const newSet = new Set(prev);
                newSet.add(index);
                return newSet;
              });
            }, index * 100); // 200ms delay between each image
          }
        });
      }, 50); // 50ms debounce
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check for already visible images
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [project?.images]);
  
  if (!project) {
    return (
      <PageLoader>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Project not found</h1>
            <Button onClick={() => navigate('/')}>Go back to portfolio</Button>
          </div>
        </div>
      </PageLoader>
    );
  }

  const getImageAnimationClass = (index: number) => {
    const isEven = index % 2 === 0;
    
    if (visibleImages.has(index)) {
      return isEven ? 'project-visible-left' : 'project-visible-right';
    }
    
    return 'project-hidden';
  };

  return (
    <PageLoader>
      <div className="min-h-screen bg-background text-foreground">
        <ThemeToggle />
        
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-8 hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Project Header */}
          <div className="flex justify-center items-center mb-16 mt-10">
            <img alt='profile' src={project.logo} width={150} height={150}/>
          </div>

          {/* Full Description */}
          <div className="mb-12">
            <div className="prose prose-lg max-w-none">
              {project.fullDescription?.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-foreground/80 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className='text-md mb-2'>Role</p>
            <Badge
              variant="outline"
              className="text-sm border-border/50 text-foreground dark:border-white mb-12"
            >
              <p className='text-foreground p-2'>{project.role}</p>
            </Badge>
          </div>

          {/* Project Images */}
          <div className="space-y-8">
            {project.images?.map((image, index) => (
              <div
                key={index}
                ref={el => imageRefs.current[index] = el}
                className={`${getImageAnimationClass(index)}`}
              >
                <Card className="overflow-hidden">
                  <div className="overflow-hidden shadow-2xl">
                    <img 
                      src={image} 
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLoader>
  );
}