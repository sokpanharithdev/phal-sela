import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  image: string;
  technologies?: string[];
  screens?: string;
  link: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  animationState: 'hidden' | 'entering' | 'visible' | 'exiting';
}

export const ProjectCard = ({ project, index, animationState }: ProjectCardProps) => {
  const navigate = useNavigate();

  const getAnimationClass = () => {
    const isEven = index % 2 === 0;

    switch (animationState) {
      case 'entering':
        return isEven ? 'slide-in-left' : 'slide-in-right';
      case 'exiting':
        return isEven ? 'slide-out-left' : 'slide-out-right';
      case 'visible':
        return 'opacity-100';
      default:
        return 'project-hidden';
    }
  };

  const handleViewProject = () => {
    navigate(`/project/${project.slug}`);
  };

  return (
    <Card className={`group project-card overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 ${getAnimationClass()} hover:cursor-pointer hover:shadow-lg transition-shadow duration-200`}
      onClick={handleViewProject}>
      <div className="relative  overflow-hidden aspect-[5/3]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl mb-2 text-foreground">{project.title}</h3>

        {project.technologies && (
          <div className='flex items-center justify-between mb-2'>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-xs border-border/50 text-foreground dark:border-white"
                >
                  <p className='text-foreground'>{tech}</p>
                </Badge>
              ))}
            </div>
            <Button
              className={`
                rounded-full w-18 border h-8
                bg-background
                hover:bg-black/10
                transition-colors
                dark:hover:bg-white/10
                dark:hover:border-white
                group/button
              `}
            >
              <p className='text-foreground'><ArrowRightIcon/></p>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};