import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UIConfig {
  hero: {
    greeting: string;
    name: string;
    surname: string;
    tagline: string;
    ctaButtons: {
      primary: string;
      secondary: string;
    };
  };
  header: {
    logo: string;
    logoText: string;
    navItems: Array<{ name: string; href: string }>;
  };
  urls: {
    home: string;
    about: string;
    projects: string;
    skills: string;
    contact: string;
    admin: string;
  };
  about: {
    title: string;
    subtitle: string;
    name: string;
    role: string;
    profilePicture: string;
    story: {
      paragraph1: string;
      paragraph2: string;
    };
    stats: Array<{ label: string; value: string }>;
    tools: string[];
  };
  projects: {
    title: string;
    subtitle: string;
    projects: Array<{
      id: number;
      title: string;
      description: string;
      image: string;
      tags: string[];
      liveUrl: string;
      caseStudyUrl: string;
    }>;
  };
  skills: {
    title: string;
    subtitle: string;
    offerTitle: string;
    skillCategories: Array<{
      title: string;
      skills: Array<{ name: string; level: number }>;
    }>;
    serviceCards: Array<{
      title: string;
      description: string;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
  };
  socialMedia: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
    instagram?: string;
    behance?: string;
    dribbble?: string;
    customLinks: Array<{
      name: string;
      url: string;
      icon: string;
    }>;
    followMePlatforms: string[]; // Array of platform names to show in Follow Me section
  };
  messages: Array<{
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    timestamp: string;
    read: boolean;
  }>;
}

const defaultConfig: UIConfig = {
  hero: {
    greeting: "Hi there, I'm",
    name: "Sohanur Islam",
    surname: "Shuvo",
    tagline: "A passionate designer creating beautiful digital experiences that blend creativity with functionality",
    ctaButtons: {
      primary: "Explore My Work",
      secondary: "Get In Touch"
    }
  },
  header: {
    logo: "S",
    logoText: "Sohanur Islam Shuvo",
    navItems: [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Projects', href: '#projects' },
      { name: 'Skills', href: '#skills' },
      { name: 'Contact', href: '#contact' },
    ]
  },
  urls: {
    home: "/",
    about: "/about",
    projects: "/projects",
    skills: "/skills",
    contact: "/contact",
    admin: "/hey-admin"
  },
  about: {
    title: "About Me",
    subtitle: "Passionate about creating meaningful digital experiences through innovative design",
    name: "Sohanur Islam Shuvo",
    role: "UI/UX Designer & Creative Director",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    story: {
      paragraph1: "I'm a passionate designer with over 5 years of experience in creating beautiful, functional digital experiences. My journey began with a love for art and technology, which naturally evolved into a career in design.",
      paragraph2: "I specialize in UI/UX design, branding, and digital product development. I believe great design is not just about aesthetics—it's about solving problems and creating meaningful connections between people and technology."
    },
    stats: [
      { label: 'Years Experience', value: '5+' },
      { label: 'Projects Completed', value: '50+' },
      { label: 'Happy Clients', value: '30+' },
      { label: 'Based in', value: 'Bangladesh' },
    ],
    tools: [
      'Adobe Photoshop',
      'Adobe Illustrator', 
      'Figma',
      'Sketch',
      'Adobe XD',
      'After Effects',
      'Principle',
      'InVision'
    ]
  },
  projects: {
    title: "My Projects",
    subtitle: "A showcase of my design work across various industries and platforms",
    projects: [
      {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'Modern e-commerce platform with sleek UI and seamless user experience. Features include product catalog, shopping cart, and secure checkout.',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
        tags: ['UI/UX Design', 'E-commerce', 'Mobile First'],
        liveUrl: '#',
        caseStudyUrl: '#'
      },
      {
        id: 2,
        title: 'Mobile Banking App',
        description: 'Intuitive mobile banking application with focus on security and ease of use. Clean interface with smooth animations and gestures.',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
        tags: ['Mobile Design', 'FinTech', 'Security'],
        liveUrl: '#',
        caseStudyUrl: '#'
      },
      {
        id: 3,
        title: 'SaaS Dashboard',
        description: 'Comprehensive dashboard for SaaS platform with data visualization, analytics, and user management. Dark theme with neon accents.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        tags: ['Dashboard', 'SaaS', 'Data Viz'],
        liveUrl: '#',
        caseStudyUrl: '#'
      }
    ]
  },
  skills: {
    title: "My Skills",
    subtitle: "A comprehensive overview of my technical abilities and creative expertise",
    offerTitle: "What I Offer",
    skillCategories: [
      {
        title: 'Design Tools',
        skills: [
          { name: 'Adobe Photoshop', level: 95 },
          { name: 'Adobe Illustrator', level: 90 },
          { name: 'Figma', level: 92 },
          { name: 'Sketch', level: 85 },
        ]
      },
      {
        title: 'Development',
        skills: [
          { name: 'HTML/CSS', level: 88 },
          { name: 'JavaScript', level: 75 },
          { name: 'React', level: 70 },
          { name: 'WordPress', level: 80 },
        ]
      },
      {
        title: 'Specializations',
        skills: [
          { name: 'UI/UX Design', level: 95 },
          { name: 'Brand Identity', level: 90 },
          { name: 'Mobile Design', level: 88 },
          { name: 'Web Design', level: 92 },
        ]
      }
    ],
    serviceCards: [
      {
        title: 'Web Design',
        description: 'Creating stunning, responsive websites that captivate and convert visitors.',
      },
      {
        title: 'Mobile Design',
        description: 'Designing intuitive mobile apps with seamless user experiences.',
      },
      {
        title: 'Brand Identity',
        description: 'Developing comprehensive brand identities that tell your story.',
      },
      {
        title: 'UI/UX Design',
        description: 'Crafting user-centered designs that balance beauty with functionality.',
      },
      {
        title: 'Photography',
        description: 'Capturing moments and creating visual content for brands.',
      },
      {
        title: 'Illustration',
        description: 'Creating custom illustrations and digital artwork.',
      }
    ]
  },
  contact: {
    title: "Get In Touch",
    subtitle: "Let's work together to bring your vision to life",
    email: "hello@sohanur.dev",
    phone: "+880 123 456 789",
    location: "Dhaka, Bangladesh"
  },
  socialMedia: {
    github: "https://github.com/sohanur",
    linkedin: "https://linkedin.com/in/sohanur",
    twitter: "https://twitter.com/sohanur",
    email: "mailto:hello@sohanur.dev",
    instagram: "https://instagram.com/sohanur",
    behance: "https://behance.net/sohanur",
    dribbble: "https://dribbble.com/sohanur",
    customLinks: [
      {
        name: "Portfolio",
        url: "https://sohanur.dev",
        icon: "globe"
      }
    ],
    followMePlatforms: ['github', 'linkedin', 'twitter', 'email', 'instagram', 'behance', 'dribbble'] // Default platforms to show
  },
  messages: []
};

interface UIConfigContextType {
  config: UIConfig;
  updateConfig: (newConfig: Partial<UIConfig>) => void;
  resetConfig: () => void;
  addMessage: (message: Omit<UIConfig['messages'][0], 'id' | 'timestamp' | 'read'>) => void;
  markMessageAsRead: (messageId: string) => void;
  deleteMessage: (messageId: string) => void;
}

const UIConfigContext = createContext<UIConfigContextType | undefined>(undefined);

export const UIConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<UIConfig>(() => {
    const saved = localStorage.getItem('ui-config');
    return saved ? JSON.parse(saved) : defaultConfig;
  });
  

  // Save to localStorage and cloud when config changes
  useEffect(() => {
    localStorage.setItem('ui-config', JSON.stringify(config));
  }, [config]);

  const updateConfig = (newConfig: Partial<UIConfig>) => {
    setConfig(prev => ({
      ...prev,
      ...newConfig,
      hero: { ...prev.hero, ...newConfig.hero },
      header: { ...prev.header, ...newConfig.header },
      urls: { ...prev.urls, ...newConfig.urls },
      about: { ...prev.about, ...newConfig.about },
      projects: { ...prev.projects, ...newConfig.projects },
      skills: { ...prev.skills, ...newConfig.skills },
      contact: { ...prev.contact, ...newConfig.contact },
      socialMedia: { ...prev.socialMedia, ...newConfig.socialMedia },
    }));
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
  };

  const addMessage = (message: Omit<UIConfig['messages'][0], 'id' | 'timestamp' | 'read'>) => {
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setConfig(prev => ({
      ...prev,
      messages: [newMessage, ...prev.messages]
    }));
  };

  const markMessageAsRead = (messageId: string) => {
    setConfig(prev => ({
      ...prev,
      messages: prev.messages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    }));
  };

  const deleteMessage = (messageId: string) => {
    setConfig(prev => ({
      ...prev,
      messages: prev.messages.filter(msg => msg.id !== messageId)
    }));
  };

  return (
    <UIConfigContext.Provider value={{ 
      config, 
      updateConfig, 
      resetConfig, 
      addMessage, 
      markMessageAsRead, 
      deleteMessage
    }}>
      {children}
    </UIConfigContext.Provider>
  );
};

export const useUIConfig = () => {
  const context = useContext(UIConfigContext);
  if (context === undefined) {
    throw new Error('useUIConfig must be used within a UIConfigProvider');
  }
  return context;
};