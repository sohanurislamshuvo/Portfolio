import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useApi } from '@/contexts/ApiContext';
import { Trash2, Plus, Save, RotateCcw, Github, Linkedin, Twitter, Mail, Eye, Clock, User, Mail as MailIcon, Check, Instagram, Palette, Circle, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AdminPanel = () => {
  const { 
    portfolioConfig, 
    projects, 
    skills, 
    messages, 
    messageStats,
    updatePortfolioConfig, 
    createProject, 
    updateProject, 
    deleteProject,
    createSkill, 
    updateSkill, 
    deleteSkill,
    markMessageAsRead, 
    deleteMessage,
    logout,
    refreshData,
    isConfigLoading,
    isProjectsLoading,
    isSkillsLoading,
    isMessagesLoading
  } = useApi();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('hero');

  // Use portfolioConfig with safe defaults to avoid runtime undefined errors
  const raw = (portfolioConfig ?? {}) as any;
  const config = {
    ...raw,
    hero: {
      greeting: '',
      name: '',
      surname: '',
      ctaButtons: { primary: '' },
      tagline: '',
      ...(raw.hero || {})
    },
    header: {
      logo: '',
      logoText: '',
      navItems: [],
      ...(raw.header || {})
    },
    urls: {
      home: '/',
      about: '/about',
      projects: '/projects',
      skills: '/skills',
      contact: '/contact',
      admin: '/hey-admin',
      ...(raw.urls || {})
    },
    about: {
      profilePicture: '',
      title: '',
      name: '',
      subtitle: '',
      role: '',
      story: { paragraph1: '', paragraph2: '', ...(raw.about?.story || {}) },
      tools: [],
      ...(raw.about || {})
    },
    projects: {
      title: '',
      subtitle: '',
      projects: [],
      ...(raw.projects || {})
    },
    skills: {
      title: '',
      subtitle: '',
      offerTitle: 'What I Offer',
      skillCategories: [],
      ...(raw.skills || {})
    },
    contact: {
      title: '',
      subtitle: '',
      email: '',
      phone: '',
      location: '',
      ...(raw.contact || {})
    },
    socialMedia: {
      github: '',
      linkedin: '',
      twitter: '',
      email: '',
      instagram: '',
      behance: '',
      dribbble: '',
      followMePlatforms: [],
      customLinks: [],
      ...(raw.socialMedia || {})
    }
  } as any;
  const updateConfig = (partial: any) => updatePortfolioConfig(partial);

  // Load data when component mounts
  useEffect(() => {
    refreshData();
    // intentionally run once on mount; refreshData reference may change each render
    // which would otherwise cause an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = () => {
    toast({
      title: "Configuration Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleReset = () => {
    // Note: Reset functionality would need to be implemented in the backend
    toast({
      title: "Reset Not Available",
      description: "Reset functionality requires backend implementation.",
      variant: "destructive",
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const addArrayItem = (section: string, field: string, newItem: any) => {
    // This would need to be implemented based on the specific section
    toast({
      title: "Add Item",
      description: "Add functionality needs to be implemented for each section.",
    });
  };

  const removeArrayItem = (section: string, field: string, index: number) => {
    // This would need to be implemented based on the specific section
    toast({
      title: "Remove Item",
      description: "Remove functionality needs to be implemented for each section.",
    });
  };

  const updateArrayItem = (section: string, field: string, index: number, updatedItem: any) => {
    // This would need to be implemented based on the specific section
    toast({
      title: "Update Item",
      description: "Update functionality needs to be implemented for each section.",
    });
  };

  if (!config || !config.hero) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin panel…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 p-6">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage your portfolio content dynamically</p>
          
          <div className="flex gap-4 mt-4">
            <Button onClick={handleSave} className="btn-hero">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button onClick={handleReset} variant="destructive">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Default
            </Button>
            <Button onClick={handleLogout} variant="outline" className="ml-auto">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-9">
                  <TabsTrigger value="hero">Hero</TabsTrigger>
                  <TabsTrigger value="header">Header</TabsTrigger>
                  <TabsTrigger value="urls">URLs</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="social">Social</TabsTrigger>
                  <TabsTrigger value="messages">
                    Messages
                    {messageStats.unread > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        {messageStats.unread}
                      </span>
                    )}
                  </TabsTrigger>
                </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4">Hero Section</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="greeting">Greeting</Label>
                  <Input
                    id="greeting"
                    value={config.hero.greeting}
                    onChange={(e) => updateConfig({
                      hero: { ...config.hero, greeting: e.target.value }
                    })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={config.hero.name}
                    onChange={(e) => updateConfig({
                      hero: { ...config.hero, name: e.target.value }
                    })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="surname">Surname</Label>
                  <Input
                    id="surname"
                    value={config.hero.surname}
                    onChange={(e) => updateConfig({
                      hero: { ...config.hero, surname: e.target.value }
                    })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="primaryCta">Primary CTA</Label>
                  <Input
                    id="primaryCta"
                    value={config.hero.ctaButtons.primary}
                    onChange={(e) => updateConfig({
                      hero: { 
                        ...config.hero, 
                        ctaButtons: { ...config.hero.ctaButtons, primary: e.target.value }
                      }
                    })}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Textarea
                    id="tagline"
                    value={config.hero.tagline}
                    onChange={(e) => updateConfig({
                      hero: { ...config.hero, tagline: e.target.value }
                    })}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Header Section */}
          <TabsContent value="header" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4">Header Settings</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="logo">Logo Text</Label>
                  <Input
                    id="logo"
                    value={config.header.logo}
                    onChange={(e) => updateConfig({
                      header: { ...config.header, logo: e.target.value }
                    })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="logoText">Logo Full Text</Label>
                  <Input
                    id="logoText"
                    value={config.header.logoText}
                    onChange={(e) => updateConfig({
                      header: { ...config.header, logoText: e.target.value }
                    })}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <Label>Navigation Items</Label>
                  <Button
                    size="sm"
                    onClick={() => addArrayItem('header', 'navItems', { name: 'New Item', href: '#new' })}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {config.header.navItems.map((item, index) => (
                    <div key={index} className="flex gap-3 items-end">
                      <div className="flex-1">
                        <Label>Name</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => updateArrayItem('header', 'navItems', index, { ...item, name: e.target.value })}
                        />
                      </div>
                      <div className="flex-1">
                        <Label>Link</Label>
                        <Input
                          value={item.href}
                          onChange={(e) => updateArrayItem('header', 'navItems', index, { ...item, href: e.target.value })}
                        />
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeArrayItem('header', 'navItems', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* URL Management Section */}
          <TabsContent value="urls" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4">URL Management</h3>
              <p className="text-muted-foreground mb-6">
                Customize your page URLs. Changes will be applied immediately and affect both navigation and direct links.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="homeUrl">Home URL</Label>
                  <Input
                    id="homeUrl"
                    value={config.urls.home}
                    onChange={(e) => updateConfig({
                      urls: { ...config.urls, home: e.target.value }
                    })}
                    placeholder="/"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Main landing page URL</p>
                </div>
                
                <div>
                  <Label htmlFor="aboutUrl">About URL</Label>
                  <Input
                    id="aboutUrl"
                    value={config.urls.about}
                    onChange={(e) => updateConfig({
                      urls: { ...config.urls, about: e.target.value }
                    })}
                    placeholder="/about"
                  />
                  <p className="text-xs text-muted-foreground mt-1">About page URL</p>
                </div>
                
                <div>
                  <Label htmlFor="projectsUrl">Projects URL</Label>
                  <Input
                    id="projectsUrl"
                    value={config.urls.projects}
                    onChange={(e) => updateConfig({
                      urls: { ...config.urls, projects: e.target.value }
                    })}
                    placeholder="/projects"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Projects showcase page URL</p>
                </div>
                
                <div>
                  <Label htmlFor="skillsUrl">Skills URL</Label>
                  <Input
                    id="skillsUrl"
                    value={config.urls.skills}
                    onChange={(e) => updateConfig({
                      urls: { ...config.urls, skills: e.target.value }
                    })}
                    placeholder="/skills"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Skills page URL</p>
                </div>
                
                <div>
                  <Label htmlFor="contactUrl">Contact URL</Label>
                  <Input
                    id="contactUrl"
                    value={config.urls.contact}
                    onChange={(e) => updateConfig({
                      urls: { ...config.urls, contact: e.target.value }
                    })}
                    placeholder="/contact"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Contact page URL</p>
                </div>
                
                <div>
                  <Label htmlFor="adminUrl">Admin URL</Label>
                  <Input
                    id="adminUrl"
                    value={config.urls.admin}
                    onChange={(e) => updateConfig({
                      urls: { ...config.urls, admin: e.target.value }
                    })}
                    placeholder="/hey-admin"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Admin panel URL</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2 text-accent">URL Examples:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <code>/about</code> → <code>/about-us</code></li>
                  <li>• <code>/projects</code> → <code>/portfolio</code></li>
                  <li>• <code>/skills</code> → <code>/expertise</code></li>
                  <li>• <code>/contact</code> → <code>/get-in-touch</code></li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2">
                  <strong>Note:</strong> URLs should start with "/" and avoid spaces or special characters.
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* About Section */}
          <TabsContent value="about" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4">About Section</h3>
              
              <div className="space-y-6">
                {/* Profile Picture Upload */}
                <div>
                  <ImageUpload
                    currentImageUrl={config.about.profilePicture}
                    onImageChange={(url) => updateConfig({
                      about: { ...config.about, profilePicture: url }
                    })}
                    label="Profile Picture"
                    description="Upload your profile picture or enter an image URL"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="aboutTitle">Title</Label>
                    <Input
                      id="aboutTitle"
                      value={config.about.title}
                      onChange={(e) => updateConfig({
                        about: { ...config.about, title: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="aboutName">Name</Label>
                    <Input
                      id="aboutName"
                      value={config.about.name}
                      onChange={(e) => updateConfig({
                        about: { ...config.about, name: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="aboutSubtitle">Subtitle</Label>
                    <Textarea
                      id="aboutSubtitle"
                      value={config.about.subtitle}
                      onChange={(e) => updateConfig({
                        about: { ...config.about, subtitle: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="aboutRole">Role</Label>
                    <Input
                      id="aboutRole"
                      value={config.about.role}
                      onChange={(e) => updateConfig({
                        about: { ...config.about, role: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="story1">Story Paragraph 1</Label>
                  <Textarea
                    id="story1"
                    value={config.about.story.paragraph1}
                    onChange={(e) => updateConfig({
                      about: { 
                        ...config.about, 
                        story: { ...config.about.story, paragraph1: e.target.value }
                      }
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="story2">Story Paragraph 2</Label>
                  <Textarea
                    id="story2"
                    value={config.about.story.paragraph2}
                    onChange={(e) => updateConfig({
                      about: { 
                        ...config.about, 
                        story: { ...config.about.story, paragraph2: e.target.value }
                      }
                    })}
                  />
                </div>

                {/* Tools */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label>Tools & Technologies</Label>
                    <Button
                      size="sm"
                      onClick={() => addArrayItem('about', 'tools', 'New Tool')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Tool
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {config.about.tools.map((tool, index) => (
                      <Badge key={index} variant="secondary" className="gap-2">
                        <Input
                          value={tool}
                          onChange={(e) => updateArrayItem('about', 'tools', index, e.target.value)}
                          className="h-6 text-xs border-0 bg-transparent p-1"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-4 w-4 p-0"
                          onClick={() => removeArrayItem('about', 'tools', index)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Projects Section */}
          <TabsContent value="projects" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4">Projects Section</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="projectsTitle">Title</Label>
                  <Input
                    id="projectsTitle"
                    value={config.projects.title}
                    onChange={(e) => updateConfig({
                      projects: { ...config.projects, title: e.target.value }
                    })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="projectsSubtitle">Subtitle</Label>
                  <Textarea
                    id="projectsSubtitle"
                    value={config.projects.subtitle}
                    onChange={(e) => updateConfig({
                      projects: { ...config.projects, subtitle: e.target.value }
                    })}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <Label>Projects</Label>
                  <Button
                    size="sm"
                    onClick={() => addArrayItem('projects', 'projects', {
                      id: Date.now(),
                      title: 'New Project',
                      description: 'Project description',
                      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
                      tags: ['New Tag'],
                      liveUrl: '#',
                      caseStudyUrl: '#'
                    })}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {config.projects.projects.map((project, index) => (
                    <Card key={project.id} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-semibold">Project {index + 1}</h4>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeArrayItem('projects', 'projects', index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Title</Label>
                          <Input
                            value={project.title}
                            onChange={(e) => updateArrayItem('projects', 'projects', index, { ...project, title: e.target.value })}
                          />
                        </div>
                        
                        <div>
                          <Label>Image URL</Label>
                          <Input
                            value={project.image}
                            onChange={(e) => updateArrayItem('projects', 'projects', index, { ...project, image: e.target.value })}
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <Label>Description</Label>
                          <Textarea
                            value={project.description}
                            onChange={(e) => updateArrayItem('projects', 'projects', index, { ...project, description: e.target.value })}
                          />
                        </div>
                        
                        <div>
                          <Label>Live URL</Label>
                          <Input
                            value={project.liveUrl}
                            onChange={(e) => updateArrayItem('projects', 'projects', index, { ...project, liveUrl: e.target.value })}
                          />
                        </div>
                        
                        <div>
                          <Label>Case Study URL</Label>
                          <Input
                            value={project.caseStudyUrl}
                            onChange={(e) => updateArrayItem('projects', 'projects', index, { ...project, caseStudyUrl: e.target.value })}
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <Label>Tags (comma separated)</Label>
                          <Input
                            value={project.tags.join(', ')}
                            onChange={(e) => updateArrayItem('projects', 'projects', index, { 
                              ...project, 
                              tags: e.target.value.split(',').map(tag => tag.trim()) 
                            })}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Skills Section */}
          <TabsContent value="skills" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4">Skills Section</h3>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label htmlFor="skillsTitle">Title</Label>
                  <Input
                    id="skillsTitle"
                    value={config.skills.title}
                    onChange={(e) => updateConfig({
                      skills: { ...config.skills, title: e.target.value }
                    })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="skillsSubtitle">Subtitle</Label>
                  <Textarea
                    id="skillsSubtitle"
                    value={config.skills.subtitle}
                    onChange={(e) => updateConfig({
                      skills: { ...config.skills, subtitle: e.target.value }
                    })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="offerTitle">Offer Section Title</Label>
                  <Input
                    id="offerTitle"
                    value={config.skills.offerTitle}
                    onChange={(e) => updateConfig({
                      skills: { ...config.skills, offerTitle: e.target.value }
                    })}
                  />
                </div>
              </div>

              {/* Skill Categories */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <Label>Skill Categories</Label>
                  <Button
                    size="sm"
                    onClick={() => addArrayItem('skills', 'skillCategories', {
                      title: 'New Category',
                      skills: [{ name: 'New Skill', level: 80 }]
                    })}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {config.skills.skillCategories.map((category, categoryIndex) => (
                    <Card key={categoryIndex} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <Input
                          value={category.title}
                          onChange={(e) => updateArrayItem('skills', 'skillCategories', categoryIndex, { 
                            ...category, 
                            title: e.target.value 
                          })}
                          className="font-semibold"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeArrayItem('skills', 'skillCategories', categoryIndex)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        {category.skills.map((skill, skillIndex) => (
                          <div key={skillIndex} className="flex gap-3 items-center">
                            <Input
                              value={skill.name}
                              onChange={(e) => {
                                const newSkills = [...category.skills];
                                newSkills[skillIndex] = { ...skill, name: e.target.value };
                                updateArrayItem('skills', 'skillCategories', categoryIndex, { 
                                  ...category, 
                                  skills: newSkills 
                                });
                              }}
                              className="flex-1"
                            />
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={skill.level}
                              onChange={(e) => {
                                const newSkills = [...category.skills];
                                newSkills[skillIndex] = { ...skill, level: parseInt(e.target.value) || 0 };
                                updateArrayItem('skills', 'skillCategories', categoryIndex, { 
                                  ...category, 
                                  skills: newSkills 
                                });
                              }}
                              className="w-20"
                            />
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                const newSkills = category.skills.filter((_, i) => i !== skillIndex);
                                updateArrayItem('skills', 'skillCategories', categoryIndex, { 
                                  ...category, 
                                  skills: newSkills 
                                });
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const newSkills = [...category.skills, { name: 'New Skill', level: 80 }];
                            updateArrayItem('skills', 'skillCategories', categoryIndex, { 
                              ...category, 
                              skills: newSkills 
                            });
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Skill
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Contact Section */}
          <TabsContent value="contact" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4">Contact Section</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactTitle">Title</Label>
                  <Input
                    id="contactTitle"
                    value={config.contact.title}
                    onChange={(e) => updateConfig({
                      contact: { ...config.contact, title: e.target.value }
                    })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="contactSubtitle">Subtitle</Label>
                  <Textarea
                    id="contactSubtitle"
                    value={config.contact.subtitle}
                    onChange={(e) => updateConfig({
                      contact: { ...config.contact, subtitle: e.target.value }
                    })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={config.contact.email}
                    onChange={(e) => updateConfig({
                      contact: { ...config.contact, email: e.target.value }
                    })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="contactPhone">Phone</Label>
                  <Input
                    id="contactPhone"
                    value={config.contact.phone}
                    onChange={(e) => updateConfig({
                      contact: { ...config.contact, phone: e.target.value }
                    })}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="contactLocation">Location</Label>
                  <Input
                    id="contactLocation"
                    value={config.contact.location}
                    onChange={(e) => updateConfig({
                      contact: { ...config.contact, location: e.target.value }
                    })}
                  />
                </div>
              </div>
            </Card>

            {/* Follow Me Section Configuration */}
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4">Follow Me Section</h3>
              <p className="text-muted-foreground mb-6">
                Configure which social platforms appear in the "Follow Me" section on the Contact page.
                The section will only show if at least one platform is configured.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-accent">Select Platforms to Show</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Choose which social platforms appear in the "Follow Me" section. Only platforms with configured URLs can be selected.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Github className="w-5 h-5" />
                        <span>GitHub</span>
                        {config.socialMedia.github && <Check className="w-4 h-4 text-green-500" />}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-muted-foreground">
                          {config.socialMedia.github ? 'Configured' : 'Not configured'}
                        </div>
                        <Checkbox
                          checked={config.socialMedia.followMePlatforms.includes('github')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateConfig({
                                socialMedia: {
                                  ...config.socialMedia,
                                  followMePlatforms: [...config.socialMedia.followMePlatforms, 'github']
                                }
                              });
                            } else {
                              updateConfig({
                                socialMedia: {
                                  ...config.socialMedia,
                                  followMePlatforms: config.socialMedia.followMePlatforms.filter(p => p !== 'github')
                                }
                              });
                            }
                          }}
                          disabled={!config.socialMedia.github}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Linkedin className="w-5 h-5" />
                        <span>LinkedIn</span>
                        {config.socialMedia.linkedin && <Check className="w-4 h-4 text-green-500" />}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-muted-foreground">
                          {config.socialMedia.linkedin ? 'Configured' : 'Not configured'}
                        </div>
                        <Checkbox
                          checked={config.socialMedia.followMePlatforms.includes('linkedin')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateConfig({
                                socialMedia: {
                                  ...config.socialMedia,
                                  followMePlatforms: [...config.socialMedia.followMePlatforms, 'linkedin']
                                }
                              });
                            } else {
                              updateConfig({
                                socialMedia: {
                                  ...config.socialMedia,
                                  followMePlatforms: config.socialMedia.followMePlatforms.filter(p => p !== 'linkedin')
                                }
                              });
                            }
                          }}
                          disabled={!config.socialMedia.linkedin}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Twitter className="w-5 h-5" />
                        <span>Twitter</span>
                        {config.socialMedia.twitter && <Check className="w-4 h-4 text-green-500" />}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-muted-foreground">
                          {config.socialMedia.twitter ? 'Configured' : 'Not configured'}
                        </div>
                        <Checkbox
                          checked={config.socialMedia.followMePlatforms.includes('twitter')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateConfig({
                                socialMedia: {
                                  ...config.socialMedia,
                                  followMePlatforms: [...config.socialMedia.followMePlatforms, 'twitter']
                                }
                              });
                            } else {
                              updateConfig({
                                socialMedia: {
                                  ...config.socialMedia,
                                  followMePlatforms: config.socialMedia.followMePlatforms.filter(p => p !== 'twitter')
                                }
                              });
                            }
                          }}
                          disabled={!config.socialMedia.twitter}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5" />
                        <span>Email</span>
                        {config.socialMedia.email && <Check className="w-4 h-4 text-green-500" />}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-muted-foreground">
                          {config.socialMedia.email ? 'Configured' : 'Not configured'}
                        </div>
                        <Checkbox
                          checked={config.socialMedia.followMePlatforms.includes('email')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateConfig({
                                socialMedia: {
                                  ...config.socialMedia,
                                  followMePlatforms: [...config.socialMedia.followMePlatforms, 'email']
                                }
                              });
                            } else {
                              updateConfig({
                                socialMedia: {
                                  ...config.socialMedia,
                                  followMePlatforms: config.socialMedia.followMePlatforms.filter(p => p !== 'email')
                                }
                              });
                            }
                          }}
                          disabled={!config.socialMedia.email}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Platforms Section */}
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-accent mb-4">Additional Platforms</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select additional social platforms to include in the Follow Me section.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Instagram className="w-5 h-5" />
                          <span>Instagram</span>
                          {config.socialMedia.instagram && <Check className="w-4 h-4 text-green-500" />}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-sm text-muted-foreground">
                            {config.socialMedia.instagram ? 'Configured' : 'Not configured'}
                          </div>
                          <Checkbox
                            checked={config.socialMedia.followMePlatforms.includes('instagram')}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateConfig({
                                  socialMedia: {
                                    ...config.socialMedia,
                                    followMePlatforms: [...config.socialMedia.followMePlatforms, 'instagram']
                                  }
                                });
                              } else {
                                updateConfig({
                                  socialMedia: {
                                    ...config.socialMedia,
                                    followMePlatforms: config.socialMedia.followMePlatforms.filter(p => p !== 'instagram')
                                  }
                                });
                              }
                            }}
                            disabled={!config.socialMedia.instagram}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Palette className="w-5 h-5" />
                          <span>Behance</span>
                          {config.socialMedia.behance && <Check className="w-4 h-4 text-green-500" />}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-sm text-muted-foreground">
                            {config.socialMedia.behance ? 'Configured' : 'Not configured'}
                          </div>
                          <Checkbox
                            checked={config.socialMedia.followMePlatforms.includes('behance')}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateConfig({
                                  socialMedia: {
                                    ...config.socialMedia,
                                    followMePlatforms: [...config.socialMedia.followMePlatforms, 'behance']
                                  }
                                });
                              } else {
                                updateConfig({
                                  socialMedia: {
                                    ...config.socialMedia,
                                    followMePlatforms: config.socialMedia.followMePlatforms.filter(p => p !== 'behance')
                                  }
                                });
                              }
                            }}
                            disabled={!config.socialMedia.behance}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Circle className="w-5 h-5" />
                          <span>Dribbble</span>
                          {config.socialMedia.dribbble && <Check className="w-4 h-4 text-green-500" />}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-sm text-muted-foreground">
                            {config.socialMedia.dribbble ? 'Configured' : 'Not configured'}
                          </div>
                          <Checkbox
                            checked={config.socialMedia.followMePlatforms.includes('dribbble')}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateConfig({
                                  socialMedia: {
                                    ...config.socialMedia,
                                    followMePlatforms: [...config.socialMedia.followMePlatforms, 'dribbble']
                                  }
                                });
                              } else {
                                updateConfig({
                                  socialMedia: {
                                    ...config.socialMedia,
                                    followMePlatforms: config.socialMedia.followMePlatforms.filter(p => p !== 'dribbble')
                                  }
                                });
                              }
                            }}
                            disabled={!config.socialMedia.dribbble}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-accent">Preview</h4>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-medium mb-3">Follow Me</h5>
                    <div className="flex flex-wrap gap-3">
                      {config.socialMedia.followMePlatforms.includes('github') && config.socialMedia.github && (
                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                          <Github className="w-5 h-5" />
                        </div>
                      )}
                      {config.socialMedia.followMePlatforms.includes('linkedin') && config.socialMedia.linkedin && (
                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                          <Linkedin className="w-5 h-5" />
                        </div>
                      )}
                      {config.socialMedia.followMePlatforms.includes('twitter') && config.socialMedia.twitter && (
                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                          <Twitter className="w-5 h-5" />
                        </div>
                      )}
                      {config.socialMedia.followMePlatforms.includes('email') && config.socialMedia.email && (
                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                          <Mail className="w-5 h-5" />
                        </div>
                      )}
                      {config.socialMedia.followMePlatforms.includes('instagram') && config.socialMedia.instagram && (
                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                          <Instagram className="w-5 h-5" />
                        </div>
                      )}
                      {config.socialMedia.followMePlatforms.includes('behance') && config.socialMedia.behance && (
                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                          <Palette className="w-5 h-5" />
                        </div>
                      )}
                      {config.socialMedia.followMePlatforms.includes('dribbble') && config.socialMedia.dribbble && (
                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                          <Circle className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      {config.socialMedia.followMePlatforms.filter(platform => {
                        const platformUrls = {
                          github: config.socialMedia.github,
                          linkedin: config.socialMedia.linkedin,
                          twitter: config.socialMedia.twitter,
                          email: config.socialMedia.email,
                          instagram: config.socialMedia.instagram,
                          behance: config.socialMedia.behance,
                          dribbble: config.socialMedia.dribbble
                        };
                        return platformUrls[platform as keyof typeof platformUrls];
                      }).length === 0 
                        ? 'No selected platforms with URLs - Follow Me section will be hidden'
                        : `${config.socialMedia.followMePlatforms.filter(platform => {
                            const platformUrls = {
                              github: config.socialMedia.github,
                              linkedin: config.socialMedia.linkedin,
                              twitter: config.socialMedia.twitter,
                              email: config.socialMedia.email,
                              instagram: config.socialMedia.instagram,
                              behance: config.socialMedia.behance,
                              dribbble: config.socialMedia.dribbble
                            };
                            return platformUrls[platform as keyof typeof platformUrls];
                          }).length} selected platform(s) will be shown`
                      }
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Note:</strong> To configure social media URLs, go to the "Social" tab in the admin panel.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Social Media Section */}
          <TabsContent value="social" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4">Social Media Links</h3>
              <p className="text-muted-foreground mb-6">
                Configure your social media profiles and custom links. Leave empty to hide from display.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Main Social Platforms */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-accent">Main Platforms</h4>
                  
                  <div>
                    <Label htmlFor="githubUrl">GitHub</Label>
                    <Input
                      id="githubUrl"
                      type="url"
                      placeholder="https://github.com/yourusername"
                      value={config.socialMedia.github}
                      onChange={(e) => updateConfig({
                        socialMedia: { ...config.socialMedia, github: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="linkedinUrl">LinkedIn</Label>
                    <Input
                      id="linkedinUrl"
                      type="url"
                      placeholder="https://linkedin.com/in/yourusername"
                      value={config.socialMedia.linkedin}
                      onChange={(e) => updateConfig({
                        socialMedia: { ...config.socialMedia, linkedin: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="twitterUrl">Twitter</Label>
                    <Input
                      id="twitterUrl"
                      type="url"
                      placeholder="https://twitter.com/yourusername"
                      value={config.socialMedia.twitter}
                      onChange={(e) => updateConfig({
                        socialMedia: { ...config.socialMedia, twitter: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="emailUrl">Email</Label>
                    <Input
                      id="emailUrl"
                      type="email"
                      placeholder="mailto:your@email.com"
                      value={config.socialMedia.email}
                      onChange={(e) => updateConfig({
                        socialMedia: { ...config.socialMedia, email: e.target.value }
                      })}
                    />
                  </div>
                </div>

                {/* Additional Platforms */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-accent">Additional Platforms</h4>
                  
                  <div>
                    <Label htmlFor="instagramUrl">Instagram</Label>
                    <Input
                      id="instagramUrl"
                      type="url"
                      placeholder="https://instagram.com/yourusername"
                      value={config.socialMedia.instagram || ''}
                      onChange={(e) => updateConfig({
                        socialMedia: { ...config.socialMedia, instagram: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="behanceUrl">Behance</Label>
                    <Input
                      id="behanceUrl"
                      type="url"
                      placeholder="https://behance.net/yourusername"
                      value={config.socialMedia.behance || ''}
                      onChange={(e) => updateConfig({
                        socialMedia: { ...config.socialMedia, behance: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="dribbbleUrl">Dribbble</Label>
                    <Input
                      id="dribbbleUrl"
                      type="url"
                      placeholder="https://dribbble.com/yourusername"
                      value={config.socialMedia.dribbble || ''}
                      onChange={(e) => updateConfig({
                        socialMedia: { ...config.socialMedia, dribbble: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* Custom Links */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold text-accent">Custom Links</h4>
                  <Button
                    size="sm"
                    onClick={() => addArrayItem('socialMedia', 'customLinks', {
                      name: 'New Link',
                      url: 'https://example.com',
                      icon: 'globe'
                    })}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Link
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {config.socialMedia.customLinks.map((link, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-medium">Custom Link {index + 1}</h5>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeArrayItem('socialMedia', 'customLinks', index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-3">
                        <div>
                          <Label>Name</Label>
                          <Input
                            value={link.name}
                            onChange={(e) => updateArrayItem('socialMedia', 'customLinks', index, { 
                              ...link, 
                              name: e.target.value 
                            })}
                            placeholder="Link Name"
                          />
                        </div>
                        
                        <div>
                          <Label>URL</Label>
                          <Input
                            value={link.url}
                            onChange={(e) => updateArrayItem('socialMedia', 'customLinks', index, { 
                              ...link, 
                              url: e.target.value 
                            })}
                            placeholder="https://example.com"
                          />
                        </div>
                        
                        <div>
                          <Label>Icon (Lucide icon name)</Label>
                          <Input
                            value={link.icon}
                            onChange={(e) => updateArrayItem('socialMedia', 'customLinks', index, { 
                              ...link, 
                              icon: e.target.value 
                            })}
                            placeholder="globe, external-link, etc."
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-3 text-accent">Preview</h4>
                <div className="flex space-x-4">
                  {config.socialMedia.github && (
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      <Github className="w-5 h-5" />
                    </div>
                  )}
                  {config.socialMedia.linkedin && (
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      <Linkedin className="w-5 h-5" />
                    </div>
                  )}
                  {config.socialMedia.twitter && (
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      <Twitter className="w-5 h-5" />
                    </div>
                  )}
                  {config.socialMedia.email && (
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Only configured links will appear in the preview and on your site.
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* Messages Section */}
          <TabsContent value="messages" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Message Box</h3>
                  <p className="text-muted-foreground">
                    Contact form submissions from your website visitors
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="text-sm">
                    Total: {messageStats.total || 0}
                  </Badge>
                  <Badge variant="destructive" className="text-sm">
                    Unread: {messageStats.unread || 0}
                  </Badge>
                </div>
              </div>

              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <MailIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2">No Messages Yet</h4>
                  <p className="text-muted-foreground">
                    Messages from your contact form will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <Card 
                      key={message.id} 
                      className={`p-6 transition-all duration-200 ${
                        !message.read 
                          ? 'border-l-4 border-l-accent bg-accent/5' 
                          : 'border-l-4 border-l-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{message.name}</h4>
                            <p className="text-sm text-muted-foreground">{message.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>
                              {new Date(message.timestamp).toLocaleDateString()} at{' '}
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          
                          {!message.read && (
                            <Badge variant="destructive" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h5 className="font-medium text-accent mb-2">Subject:</h5>
                        <p className="text-sm bg-muted/50 p-3 rounded-lg">
                          {message.subject}
                        </p>
                      </div>

                      <div className="mb-4">
                        <h5 className="font-medium text-accent mb-2">Message:</h5>
                        <p className="text-sm bg-muted/50 p-3 rounded-lg whitespace-pre-wrap">
                          {message.message}
                        </p>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`mailto:${message.email}`, '_blank')}
                          >
                            <MailIcon className="w-4 h-4 mr-2" />
                            Reply
                          </Button>
                          
                          {!message.read && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => markMessageAsRead(message.id)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Mark as Read
                            </Button>
                          )}
                        </div>
                        
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            deleteMessage(message.id);
                            toast({
                              title: "Message Deleted",
                              description: "The message has been removed.",
                              variant: "destructive"
                            });
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;