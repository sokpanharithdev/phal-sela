import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import portfolioData from '../data/portfolio.json';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const project = portfolioData.projects.find(p => p.slug === slug);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Button onClick={() => navigate('/')}>Go back to portfolio</Button>
        </div>
      </div>
    );
  }

  // Create project icon based on title
  const getProjectIcon = (title: string) => {
    if (title.includes('SPIK')) {
      return (
        <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      );
    }
    // Default icon for other projects
    return (
      <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="white" strokeWidth="2"/>
          <circle cx="8.5" cy="8.5" r="1.5" stroke="white" strokeWidth="2"/>
          <path d="M21 15L16 10L5 21" stroke="white" strokeWidth="2"/>
        </svg>
      </div>
    );
  };

  return (
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
          Back to Portfolio
        </Button>

        {/* Project Header */}
        <div className="flex items-start gap-6 mb-8">
          {getProjectIcon(project.title)}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
            <p className="text-muted-foreground text-lg mb-4">
              {project.description}
            </p>
            <Badge variant="secondary" className="mb-4">
              {project.role}
            </Badge>
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

        {/* Project Images */}
        <div className="space-y-8">
          {project.images?.map((image, index) => (
            <Card key={index} className="overflow-hidden bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-8">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src={image} 
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            </Card>
          ))}
        </div>

        {/* Technologies */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}