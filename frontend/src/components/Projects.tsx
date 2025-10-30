import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { useApi } from '@/contexts/ApiContext';

const Projects = () => {
  const { portfolioConfig, projects } = useApi();

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {(portfolioConfig.projects?.title || 'My Projects').split(' ').map((word, index) => 
                word === 'Projects' ? (
                  <span key={index} className="gradient-text">{word}</span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {portfolioConfig.projects?.subtitle || 'A showcase of my recent work and creative projects'}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(projects.length > 0 ? projects : portfolioConfig.projects?.projects || []).map((project, index) => (
              <Card 
                key={project.id} 
                className="group card-hover overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image_url || project.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-3">
                      <Button size="sm" variant="secondary" className="bg-background/90">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      {project.live_url && (
                        <Button size="sm" className="bg-primary" asChild>
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.technologies || project.tags || []).map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="text-xs border-accent/30 text-accent hover:bg-accent/10"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Project Links */}
                  <div className="flex space-x-3">
                    {project.github_url && (
                      <Button size="sm" variant="ghost" className="text-accent hover:bg-accent/10" asChild>
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.live_url && (
                      <Button size="sm" variant="ghost" className="text-accent hover:bg-accent/10" asChild>
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              View All Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;