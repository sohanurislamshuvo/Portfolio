import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Award, Users } from 'lucide-react';
import { useApi } from '@/contexts/ApiContext';

const About = () => {
  const { portfolioConfig } = useApi();
  
  const iconMap = {
    'Years Experience': Calendar,
    'Projects Completed': Award,
    'Happy Clients': Users,
    'Based in': MapPin,
  };

  const stats = (portfolioConfig.about?.stats || []).map(stat => ({
    icon: iconMap[stat.label as keyof typeof iconMap] || Calendar,
    label: stat.label,
    value: stat.value
  }));

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {(portfolioConfig.about?.title || 'About Me').split(' ').map((word, index) => 
                word === 'Me' ? (
                  <span key={index} className="gradient-text">{word}</span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {portfolioConfig.about?.subtitle || 'Learn more about my journey and expertise'}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="relative animate-slide-in-left">
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-xl opacity-30 animate-pulse"></div>
                <Card className="relative card-hover p-8 text-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden">
                    {portfolioConfig.about?.profilePicture ? (
                      <img 
                        src={portfolioConfig.about.profilePicture}
                        alt={portfolioConfig.about?.name || 'Profile'}
                        className="w-40 h-40 rounded-full object-cover border-4 border-background shadow-lg"
                        onError={(e) => {
                          // Fallback to logo if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-40 h-40 bg-muted rounded-full flex items-center justify-center ${portfolioConfig.about?.profilePicture ? 'hidden' : 'flex'}`}
                      style={{ display: portfolioConfig.about?.profilePicture ? 'none' : 'flex' }}
                    >
                      <span className="text-6xl font-bold gradient-text">{portfolioConfig.header?.logo || 'S'}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{portfolioConfig.about?.name || 'Your Name'}</h3>
                  <p className="text-accent font-medium">{portfolioConfig.about?.role || 'Your Role'}</p>
                </Card>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8 animate-fade-in">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-glow">My Story</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {portfolioConfig.about?.story?.paragraph1 || 'I am passionate about creating innovative digital solutions that make a difference.'}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {portfolioConfig.about?.story?.paragraph2 || 'With years of experience in web development, I bring creativity and technical expertise to every project.'}
                </p>
              </div>

              {/* Tools & Technologies */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-accent">Tools & Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {(portfolioConfig.about?.tools || ['React', 'Node.js', 'TypeScript', 'Tailwind CSS']).map((tool) => (
                    <Badge 
                      key={tool} 
                      variant="secondary" 
                      className="bg-secondary/50 hover:bg-accent hover:text-accent-foreground transition-colors cursor-default"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <Card 
                key={stat.label} 
                className="card-hover p-6 text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;