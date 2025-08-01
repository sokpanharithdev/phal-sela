import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TypingAnimation } from './TypingAnimation';
import { ThemeToggle } from './ThemeToggle';
import { ProjectCard } from './ProjectCard';
import { SocialIcons } from './SocialIcons';
import portfolioData from '../data/portfolio.json';

export const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [showAbout, setShowAbout] = useState(false);
  const [aboutAnimating, setAboutAnimating] = useState(false);
  const [projectAnimations, setProjectAnimations] = useState<('hidden' | 'entering' | 'visible' | 'exiting')[]>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollY = useRef(0);

  // Initialize project animation states
  useEffect(() => {
    setProjectAnimations(new Array(portfolioData.projects.length).fill('hidden'));
  }, []);

  // Enhanced Intersection Observer for bidirectional animations
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = currentScrollY;

      projectRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;

        setProjectAnimations(prev => {
          const newState = [...prev];
          
          if (isVisible && (prev[index] === 'hidden' || prev[index] === 'exiting')) {
            newState[index] = 'entering';
            
            // Set to visible after animation completes
            setTimeout(() => {
              setProjectAnimations(current => {
                const updated = [...current];
                if (updated[index] === 'entering') {
                  updated[index] = 'visible';
                }
                return updated;
              });
            }, 800);
            
          } else if (!isVisible && (prev[index] === 'visible' || prev[index] === 'entering')) {
            newState[index] = 'exiting';
            
            // Set to hidden after animation completes
            setTimeout(() => {
              setProjectAnimations(current => {
                const updated = [...current];
                if (updated[index] === 'exiting') {
                  updated[index] = 'hidden';
                }
                return updated;
              });
            }, 600);
          }
          
          return newState;
        });
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle About Me toggle with animation
  const handleAboutToggle = () => {
    if (showAbout) {
      setAboutAnimating(true);
      setTimeout(() => {
        setShowAbout(false);
        setAboutAnimating(false);
      }, 300);
    } else {
      setShowAbout(true);
      setAboutAnimating(true);
      setTimeout(() => {
        setAboutAnimating(false);
      }, 400);
    }
  };

  return (
    <div className="bg-background text-foreground">
      <ThemeToggle />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Profile Image with Name Overlay */}
          <div className="relative mb-8">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
              <img
                src={portfolioData.personal.profileImage}
                alt={portfolioData.personal.name}
                className="w-full h-full object-cover"
              />
              {/* Name Overlay at 60% from top */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: '60%' }}>
                <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-2xl tracking-wider text-center px-4">
                  {portfolioData.personal.name}
                </h1>
              </div>
            </div>
          </div>

          {/* Typing Animation */}
          <div className="text-xl md:text-2xl text-muted-foreground mb-8 h-8">
            <TypingAnimation texts={portfolioData.personal.title} />
          </div>

          {/* Social Icons */}
          <div className="mb-12">
            <SocialIcons socialLinks={portfolioData.personal.socialLinks} />
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-16 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {portfolioData.personal.stats.experience}
              </div>
              <div className="text-sm text-muted-foreground">Years Experiences</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {portfolioData.personal.stats.projects}
              </div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center gap-8 mb-8">
            <Button
              variant={activeTab === 'portfolio' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('portfolio')}
              className="text-lg px-8"
            >
              Portfolio
            </Button>
            <Button
              variant={activeTab === 'skills' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('skills')}
              className="text-lg px-8"
            >
              Skills
            </Button>
          </div>

          {/* More About Me Collapse */}
          <div className="mb-12">
            <Button
              variant="ghost"
              onClick={handleAboutToggle}
              className="text-foreground hover:text-primary transition-colors flex items-center gap-2 mx-auto"
            >
              More About Me
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAbout ? 'rotate-180' : ''}`} />
            </Button>
            
            {(showAbout || aboutAnimating) && (
              <div className={`mt-6 max-w-2xl mx-auto overflow-hidden ${
                showAbout && !aboutAnimating ? 'about-collapse-enter' : 'about-collapse-exit'
              }`}>
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                  <p className="text-muted-foreground leading-relaxed">
                    {portfolioData.personal.aboutMe}
                  </p>
                </Card>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {portfolioData.personal.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'portfolio' && (
            <div>
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">
                  Selected Projects
                </Badge>
              </div>
              
              <div className="space-y-8">
                {portfolioData.projects.map((project, index) => (
                  <div
                    key={project.id}
                    ref={el => projectRefs.current[index] = el}
                    className="w-full max-w-2xl mx-auto"
                  >
                    <ProjectCard 
                      project={project}
                      index={index}
                      animationState={projectAnimations[index] || 'hidden'}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">
                  Skills & Expertise
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {portfolioData.skills.map((skillCategory, index) => (
                  <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                    <h3 className="text-xl font-semibold mb-4 text-center text-primary">
                      {skillCategory.category}
                    </h3>
                    <div className="space-y-3">
                      {skillCategory.items.map((skill, idx) => (
                        <div key={idx} className="text-center">
                          <Badge variant="outline" className="text-sm">
                            {skill}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};