import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useApi } from '@/contexts/ApiContext';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { portfolioConfig } = useApi();
  
  // Default URLs if config is not loaded yet
  const urls = portfolioConfig.urls || {
    home: "/",
    about: "/about",
    projects: "/projects",
    skills: "/skills",
    contact: "/contact",
    admin: "/hey-admin"
  };
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-bg"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/10 rounded-full blur-lg float"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Greeting */}
          <div className="mb-6">
            <span className="text-accent text-lg font-medium">{portfolioConfig.hero?.greeting || 'Hello, I am'}</span>
          </div>
          
          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">{portfolioConfig.hero?.name || 'Your'}</span>
            <br />
            <span className="text-foreground">{portfolioConfig.hero?.surname || 'Name'}</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {(portfolioConfig.hero?.tagline || 'Creating beautiful digital experiences').split('beautiful digital experiences').map((part, index) => 
              index === 0 ? (
                <span key={index}>
                  {part}
                  <span className="text-accent neon-glow">beautiful digital experiences</span>
                </span>
              ) : (
                part
              )
            )}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to={urls.projects}>
              <Button 
                size="lg" 
                className="btn-hero text-lg px-8 py-4"
              >
                {portfolioConfig.hero?.ctaButtons?.primary || 'View My Work'}
              </Button>
            </Link>
            <Link to={urls.contact}>
              <Button 
                variant="outline" 
                size="lg"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                {portfolioConfig.hero?.ctaButtons?.secondary || 'Get In Touch'}
              </Button>
            </Link>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12">
            {portfolioConfig.socialMedia?.github && (
              <a 
                href={portfolioConfig.socialMedia.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors duration-300 neon-glow hover:scale-110"
                title="GitHub"
              >
                <Github size={24} />
              </a>
            )}
            {portfolioConfig.socialMedia?.linkedin && (
              <a 
                href={portfolioConfig.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors duration-300 neon-glow hover:scale-110"
                title="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            )}
            {portfolioConfig.socialMedia?.email && (
              <a 
                href={portfolioConfig.socialMedia.email}
                className="text-muted-foreground hover:text-accent transition-colors duration-300 neon-glow hover:scale-110"
                title="Email"
              >
                <Mail size={24} />
              </a>
            )}
          </div>
          
          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <ArrowDown className="w-6 h-6 text-accent mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;