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
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);
  const [activeTab, setActiveTab] = useState('portfolio');
  const [showAbout, setShowAbout] = useState(false);
  const [aboutAnimating, setAboutAnimating] = useState(false);
  const [projectAnimations, setProjectAnimations] = useState<('hidden' | 'entering' | 'visible' | 'exiting')[]>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollY = useRef(0);
  const contentRef = useRef(null);

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
      const content = contentRef.current;
      if (content) {
        const height = content.scrollHeight + 'px';
        content.style.setProperty('--collapse-height', height);
      }

      setAboutAnimating(true);
      setTimeout(() => {
        setShowAbout(false);
        setAboutAnimating(false);
      }, 300);
    } else {
      setTimeout(() => {
        setShowAbout(true);
        setAboutAnimating(true);
        setAboutAnimating(false);
      }, 300);
    }
  };

  useEffect(() => {
    let a = 0;
    let b = 0;

    const intervalA = setInterval(() => {
      if (a <= 2) {
        setCountA(a);
        a += 1;
      } else {
        clearInterval(intervalA);
      }
    }, 100);

    const intervalB = setInterval(() => {
      if (b <= 5) {
        setCountB(b);
        b += 1;
      } else {
        clearInterval(intervalB);
      }
    }, 100);

    return () => {
      clearInterval(intervalA);
      clearInterval(intervalB);
    };
  }, []);

  return (
    <div className="bg-background text-foreground">
      <ThemeToggle />
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Profile Image with Name Overlay */}
          <div className="relative mb-8">
            <div className="w-48 h-48 mx-auto overflow-hidden">
              <img
                src={portfolioData.personal.profileImage}
                alt={portfolioData.personal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center pt-[45%] sm:pt-[30%] md:pt-[25%]">
                <p className="h-1.5 text-5xl sm:text-6xl md:text-7xl font-bold drop-shadow-2xl tracking-wider text-center px-4 dark:text-white text-black dark:shadow-none">{portfolioData.personal.name}</p>
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
              <div className="text-2xl font-bold text-primary mb-2">
                {countA}
              </div>
              <div className="text-xl md:text-2xl text-muted-foreground">Years Experiences</div>
            </div>
            <div className="text-center ">
              <div className="text-2xl font-bold text-primary mb-2">
                {countB}+
              </div>
              <div className="text-xl md:text-2xl text-muted-foreground">Projects Completed</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center gap-8 mb-8">
            <Button
              variant={activeTab === 'portfolio' ? 'default' : 'ghost'}
              style={{ backgroundColor: 'inherit', }}
              onClick={() => setActiveTab('portfolio')}
              className={activeTab === 'portfolio' ? "[box-shadow:0_-2.5px_0px_-1px_rgba(255,255,255,0.2),0_-2px_0px_-2px_rgba(0,0,0,0.1)] text-lg px-8 text-primary" : "[box-shadow:0_-3px_0px_-1px_rgba(255,255,255,0.1),0_-2px_0px_-2px_rgba(0,0,0,0.1)] text-lg px-8 hover:text-primary"}
            >
              Portfolio
            </Button>
            <Button
              variant={activeTab === 'skills' ? 'default' : 'ghost'}
              style={{ backgroundColor: 'inherit', }}
              onClick={() => setActiveTab('skills')}
              className={activeTab === 'skills' ? "[box-shadow:0_-2.5px_0px_-1px_rgba(255,255,255,0.2),0_-2px_0px_-2px_rgba(0,0,0,0.1)] text-lg px-8 text-primary" : "[box-shadow:0_-3px_0px_-1px_rgba(255,255,255,0.1),0_-2px_0px_-2px_rgba(0,0,0,0.1)] text-lg px-8 hover:text-primary"}
            >
              Skills
            </Button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'portfolio' && (
            <div>
              {/* More About Me Collapse */}
              <div className="mb-12">
                <div>
                  <div className="w-full max-w-4xl mx-auto flex justify-center hover:cursor-pointer">
                    <div
                      onClick={handleAboutToggle}
                      className="underline text-foreground hover:text-primary transition-colors flex items-center gap-2 mx-auto"
                    >
                      More About Me
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAbout ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  <div>
                    {(showAbout || aboutAnimating) && (
                      <div>
                        <div style={{display: showAbout && !aboutAnimating ? 'block' : 'none'}} className="grid md:grid-cols-2 gap-8 mt-8">
                          {/* Profile Card */}
                          <div className={`grid xs:grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden transition-all ${
          showAbout ? 'animate-expand' : 'animate-collapse'
        }`}>
                            <Card className="p-6 border-none bg-white/5">
                              <div className="text-center">
                                <div className="w-32 h-4/6 mx-auto rounded-md overflow-hidden mb-6">
                                  <img
                                    src={portfolioData.personal.profileImage1}
                                    alt={portfolioData.personal.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-2">
                                  Phal Sela
                                </h3>
                                <p className="text-lg text-foreground mb-6">
                                  UX UI Designer
                                </p>
                                <p className="text-foreground leading-relaxed">
                                  {portfolioData.personal.aboutMe}
                                </p>
                              </div>
                            </Card>

                            {/* Education Timeline */}
                            <Card className="backdrop-blur-sm border-none ">
                              <div className="space-y-6 flex flex-col justify-between">
                                {portfolioData.personal.education?.map((edu, index) => (
                                  <div key={index} className='px-3 [box-shadow:0_-3px_0px_-1px_rgba(255,255,255,0.1),0_-2px_0px_-2px_rgba(0,0,0,0.1)] pb-10 rounded-sm pt-3'>
                                    <div className=""></div>
                                    <div className="flex justify-between items-start mb-2">
                                      <h4 className="text-lg font-semibold text-foreground">
                                        {edu.title}
                                      </h4>
                                      <span className="text-sm text-muted-foreground bg-secondary/20 px-3 py-1 rounded-full">
                                        {edu.period}
                                      </span>
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                      {edu.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </Card>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Projects Section */}
              <div className='xs:mt-0 lg:mt-0'>
                {/* Description */}
                <p className="text-lg text-foreground max-w-2xl mx-auto text-center">
                  {portfolioData.personal.description}
                </p>
                
                <div className="mb-8 w-full max-w-4xl mx-auto mt-12">
                  <Badge variant="secondary" className="mb-4">
                    <p className="text-foreground p-3">Selected Projects</p>
                  </Badge>
                </div>
                
                <div className="space-y-8">
                  {portfolioData.projects.map((project, index) => (
                    <div
                      key={project.id}
                      ref={el => projectRefs.current[index] = el}
                      className="w-full max-w-4xl mx-auto"
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
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="max-w-6xl mx-auto">
              {/* Skills Categories */}
              <div className="flex justify-center gap-16 mb-16 md:flex-row flex-col">
                <div className="text-center">
                  <div className='w-full flex justify-center'>
                    <div className='w-40 rounded-md [box-shadow:0_-3px_0px_-1px_rgba(255,255,255,0.1),0_-2px_0px_-2px_rgba(0,0,0,0.1)]'>
                      <h3 className="text-2xl font-semibold text-foreground mb-8">UX</h3>
                    </div>
                  </div>

                  <div className='w-full flex justify-center mb-8'>
                    <div className="grid grid-cols-2 gap-4 max-w-md">
                      {portfolioData.skills.UX.map((skill, index) => (
                        <div
                          key={index}
                          className="bg-secondary/10 backdrop-blur-sm rounded-lg px-4 py-3 text-center hover:bg-secondary/20 transition-colors"
                        >
                          <span className="text-sm font-medium text-primary">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className='w-full flex justify-center'>
                    <div className='w-40 rounded-md [box-shadow:0_-3px_0px_-1px_rgba(255,255,255,0.1),0_-2px_0px_-2px_rgba(0,0,0,0.1)]'>
                      <h3 className="text-2xl font-semibold text-foreground mb-8">UI</h3>
                    </div>
                  </div>
                  <div className='w-full flex justify-center mb-8'>
                    <div className="grid grid-cols-2 gap-4 max-w-md">
                      {portfolioData.skills.UI.map((skill, index) => (
                        <div
                          key={index}
                          className="bg-secondary/10 backdrop-blur-sm rounded-lg px-4 py-3 text-center hover:bg-secondary/20 transition-colors"
                        >
                          <span className="text-sm font-medium text-primary">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};