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
        <div className="flex justify-center items-center mb-12 mt-10">
          <img alt='profile' src={project.image} width={200} height={200}/>
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
      </div>
    </div>
  );
}