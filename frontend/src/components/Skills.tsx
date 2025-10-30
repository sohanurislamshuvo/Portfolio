import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Palette, 
  Monitor, 
  Smartphone, 
  Code, 
  Layers, 
  Zap,
  Figma,
  Dribbble,
  Camera,
  PenTool,
  Brush,
  Layout
} from 'lucide-react';
import { useApi } from '@/contexts/ApiContext';

const Skills = () => {
  const { portfolioConfig, skills } = useApi();
  
  const iconMap = {
    'Design Tools': Palette,
    'Development': Code,
    'Specializations': Layers,
  };

  const serviceIconMap = {
    'Web Design': Monitor,
    'Mobile Design': Smartphone,
    'Brand Identity': Brush,
    'UI/UX Design': Layout,
    'Photography': Camera,
    'Illustration': PenTool,
  };

  const serviceColorMap = {
    'Web Design': 'from-primary to-accent',
    'Mobile Design': 'from-accent to-primary',
    'Brand Identity': 'from-primary to-secondary',
    'UI/UX Design': 'from-accent to-secondary',
    'Photography': 'from-secondary to-primary',
    'Illustration': 'from-secondary to-accent',
  };

  // Group skills by category from API data
  const skillCategories = skills.length > 0 ? 
    Object.entries(
      skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = {
            title: skill.category,
            skills: []
          };
        }
        acc[skill.category].skills.push({
          name: skill.name,
          level: skill.level
        });
        return acc;
      }, {} as Record<string, { title: string; skills: Array<{ name: string; level: number }> }>)
    ).map(([category, data]) => ({
      ...data,
      icon: iconMap[data.title as keyof typeof iconMap] || Palette
    })) :
    (portfolioConfig.skills?.skillCategories || []).map(category => ({
      ...category,
      icon: iconMap[category.title as keyof typeof iconMap] || Palette
    }));

  const serviceCards = (portfolioConfig.skills?.serviceCards || []).map(service => ({
    ...service,
    icon: serviceIconMap[service.title as keyof typeof serviceIconMap] || Monitor,
    color: serviceColorMap[service.title as keyof typeof serviceColorMap] || 'from-primary to-accent'
  }));

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {(portfolioConfig.skills?.title || 'My Skills').split(' ').map((word, index) => 
                word === 'Skills' ? (
                  <span key={index} className="gradient-text">{word}</span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {portfolioConfig.skills?.subtitle || 'Technical expertise and creative abilities'}
            </p>
          </div>

          {/* Skills Progress */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((category, index) => (
              <Card 
                key={category.title} 
                className="card-hover p-6 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center mr-4">
                    <category.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-accent">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2 bg-secondary"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Services Grid */}
          <div>
            <h3 className="text-3xl font-bold text-center mb-12">
              {(portfolioConfig.skills?.offerTitle || 'What I Offer').split(' ').map((word, index) => 
                word === 'Offer' ? (
                  <span key={index} className="gradient-text">{word}</span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceCards.map((service, index) => (
                <Card 
                  key={service.title}
                  className="group card-hover p-6 text-center relative overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    
                    <h4 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                      {service.title}
                    </h4>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;