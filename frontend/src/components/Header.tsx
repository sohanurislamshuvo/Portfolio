import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useApi } from '@/contexts/ApiContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { portfolioConfig } = useApi();
  const location = useLocation();

  // Default URLs if config is not loaded yet
  const urls = portfolioConfig.urls || {
    home: "/",
    about: "/about",
    projects: "/projects",
    skills: "/skills",
    contact: "/contact",
    admin: "/hey-admin"
  };

  // Create navigation items with dynamic URLs
  const navItems = [
    { name: 'Home', href: urls.home },
    { name: 'About', href: urls.about },
    { name: 'Projects', href: urls.projects },
    { name: 'Skills', href: urls.skills },
    { name: 'Contact', href: urls.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={urls.home} className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">{portfolioConfig.header?.logo || 'S'}</span>
            </div>
            <span className="text-xl font-bold gradient-text">{portfolioConfig.header?.logoText || 'Portfolio'}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-colors duration-300 relative group ${
                  location.pathname === item.href 
                    ? 'text-accent' 
                    : 'text-foreground hover:text-accent'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                  location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground hover:text-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`transition-colors duration-300 py-2 ${
                    location.pathname === item.href 
                      ? 'text-accent' 
                      : 'text-foreground hover:text-accent'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;