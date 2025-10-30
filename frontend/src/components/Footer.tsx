import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApi } from '@/contexts/ApiContext';

const Footer = () => {
  const { portfolioConfig, socialLinks: apiSocialLinks } = useApi();
  
  // Default URLs if config is not loaded yet
  const urls = portfolioConfig.urls || {
    home: "/",
    about: "/about",
    projects: "/projects",
    skills: "/skills",
    contact: "/contact",
    admin: "/hey-admin"
  };

  // Use API social links or fallback to config
  const socialLinks = apiSocialLinks.length > 0 ? apiSocialLinks.map(link => ({
    icon: link.platform === 'github' ? Github : 
          link.platform === 'linkedin' ? Linkedin :
          link.platform === 'twitter' ? Twitter :
          link.platform === 'email' ? Mail : Github,
    url: link.url,
    name: link.platform.charAt(0).toUpperCase() + link.platform.slice(1)
  })) : [
    { icon: Github, url: portfolioConfig.socialMedia?.github, name: 'GitHub' },
    { icon: Linkedin, url: portfolioConfig.socialMedia?.linkedin, name: 'LinkedIn' },
    { icon: Twitter, url: portfolioConfig.socialMedia?.twitter, name: 'Twitter' },
    { icon: Mail, url: portfolioConfig.socialMedia?.email, name: 'Email' }
  ].filter(link => link.url); // Only show links that have URLs

  const quickLinks = [
    { name: 'About', href: urls.about },
    { name: 'Projects', href: urls.projects },
    { name: 'Skills', href: urls.skills },
    { name: 'Contact', href: urls.contact }
  ];

  return (
    <footer className="py-12 border-t border-border bg-card/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <Link to={urls.home} className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-foreground">{portfolioConfig.header?.logo || 'S'}</span>
                </div>
                <span className="text-xl font-bold gradient-text">{portfolioConfig.header?.logoText || 'Portfolio'}</span>
              </Link>
              <p className="text-muted-foreground leading-relaxed">
                {portfolioConfig.about?.description || 'Passionate designer creating beautiful digital experiences that blend creativity with functionality.'}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-accent">Quick Links</h4>
              <div className="space-y-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block text-muted-foreground hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-accent">Connect</h4>
              <div className="flex space-x-4 mb-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target={social.name === 'Email' ? '_self' : '_blank'}
                    rel={social.name === 'Email' ? '' : 'noopener noreferrer'}
                    className="w-10 h-10 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-lg flex items-center justify-center transition-colors duration-300 group"
                    title={social.name}
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
              <p className="text-muted-foreground text-sm">
                Let's create something amazing together!
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <span>© 2025 Sohanur Islam Shuvo. All Rights Reserved.</span>
              </div>
              
              <div className="flex items-center space-x-2 text-muted-foreground">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>and lots of coffee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;