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
  
  const project = portfolioData.projects.find(p => p.slug === slug);

  // Initialize image refs
  useEffect(() => {
    if (project?.images) {
      imageRefs.current = new Array(project.images.length).fill(null);
    }
  }, [project?.images]);

  // Simplified scroll-based animation system for images
  useEffect(() => {
    if (!project?.images) return;

    const handleScroll = () => {
      imageRefs.current.forEach((ref, index) => {
        if (!ref || visibleImages.has(index)) return;

        const rect = ref.getBoundingClientRect();
        const triggerPoint = window.innerHeight * 0.7; // Trigger when 70% of viewport
        const isInView = rect.top < triggerPoint && rect.bottom > 0;

        if (isInView) {
          // Add staggered delay for smooth sequential animations
          setTimeout(() => {
            setVisibleImages(prev => {
              const newSet = new Set(prev);
              newSet.add(index);
              return newSet;
            });
          }, index * 150); // 150ms delay between each image
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check for already visible images
    setTimeout(handleScroll, 100);
    
    // Fallback: Make all images visible after 2 seconds if they haven't been triggered
    const fallbackTimer = setTimeout(() => {
      if (project.images) {
        setVisibleImages(prev => {
          const newSet = new Set(prev);
          project.images.forEach((_, index) => {
            newSet.add(index);
          });
          return newSet;
        });
      }
    }, 2000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(fallbackTimer);
    };
  }, [project?.images, visibleImages]);
  
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
      return isEven ? 'project-visible-up' : 'project-visible-down';
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
          <div className="flex justify-center items-center mb-16 mt-10 w-full">
            <div className={`${project.id === 5 && 'bg-[#08090A]'} rounded-full w-[150px]`}>
              <img alt='profile' src={project.logo} width={150} height={150}/>
            </div>
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