import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies?: string[];
  screens?: string;
  link: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
}

export const ProjectCard = ({ project, index, isVisible }: ProjectCardProps) => {
  const animationClass = isVisible 
    ? index % 2 === 0 
      ? 'slide-in-left' 
      : 'slide-in-right'
    : 'opacity-0 translate-x-0';

  return (
    <Card className={`project-card overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 ${animationClass}`}>
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Badge 
          variant="secondary" 
          className="absolute top-4 left-4 bg-background/90 text-foreground backdrop-blur-sm"
        >
          {project.category}
        </Badge>
        <a
          href={project.link}
          className="absolute top-4 right-4 w-10 h-10 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary/40 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {project.description}
        </p>
        
        {project.screens && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-primary font-semibold">{project.screens}</span>
            <span className="text-muted-foreground text-sm">Screens & Component</span>
          </div>
        )}
        
        {project.technologies && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className="text-xs border-border/50 text-muted-foreground"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};