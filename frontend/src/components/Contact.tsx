import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Send,
  MessageCircle,
  Instagram,
  Palette,
  Circle
} from 'lucide-react';
import { useApi } from '@/contexts/ApiContext';

const Contact = () => {
  const { portfolioConfig, createMessage } = useApi();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: portfolioConfig.contact?.email || 'hello@example.com',
      link: `mailto:${portfolioConfig.contact?.email || 'hello@example.com'}`
    },
    {
      icon: Phone,
      title: 'Phone',
      value: portfolioConfig.contact?.phone || '+1234567890',
      link: `tel:${portfolioConfig.contact?.phone || '+1234567890'}`
    },
    {
      icon: MapPin,
      title: 'Location',
      value: portfolioConfig.contact?.location || 'Your City, Country',
      link: '#'
    }
  ];

  const allSocialLinks = [
    { icon: Github, url: portfolioConfig.socialMedia?.github, name: 'GitHub', key: 'github' },
    { icon: Linkedin, url: portfolioConfig.socialMedia?.linkedin, name: 'LinkedIn', key: 'linkedin' },
    { icon: Twitter, url: portfolioConfig.socialMedia?.twitter, name: 'Twitter', key: 'twitter' },
    { icon: Mail, url: portfolioConfig.socialMedia?.email, name: 'Email', key: 'email' },
    { icon: Instagram, url: portfolioConfig.socialMedia?.instagram, name: 'Instagram', key: 'instagram' },
    { icon: Palette, url: portfolioConfig.socialMedia?.behance, name: 'Behance', key: 'behance' },
    { icon: Circle, url: portfolioConfig.socialMedia?.dribbble, name: 'Dribbble', key: 'dribbble' }
  ];

  // Filter to only show selected platforms that have URLs
  const socialLinks = allSocialLinks.filter(link => 
    (portfolioConfig.socialMedia?.followMePlatforms || []).includes(link.key) && link.url
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Save message to backend
    const success = await createMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'No Subject',
      message: formData.message
    });
    
    if (success) {
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {(portfolioConfig.contact?.title || 'Get In Touch').split(' ').map((word, index) => 
                word === 'Touch' || word === 'In' ? (
                  <span key={index} className="gradient-text">{word} </span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {portfolioConfig.contact?.subtitle || 'Ready to start your next project? Let\'s talk!'}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8 animate-slide-in-left">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-glow">Let's Connect</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  I'm always excited to work on new projects and collaborate with creative minds. 
                  Whether you have a project in mind, need design consultation, or just want to say hello, 
                  I'd love to hear from you!
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <Card key={info.title} className="card-hover p-4">
                    <a 
                      href={info.link}
                      className="flex items-center space-x-4 group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                        <info.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold group-hover:text-accent transition-colors">
                          {info.title}
                        </h4>
                        <p className="text-muted-foreground">{info.value}</p>
                      </div>
                    </a>
                  </Card>
                ))}
              </div>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-accent">Follow Me</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target={social.name === 'Email' ? '_self' : '_blank'}
                        rel={social.name === 'Email' ? '' : 'noopener noreferrer'}
                        className="w-12 h-12 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-lg flex items-center justify-center transition-colors duration-300 group"
                        title={social.name}
                      >
                        <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <Card className="card-hover p-8 animate-fade-in">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="bg-background border-border focus:border-accent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="bg-background border-border focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project discussion, collaboration, etc."
                    className="bg-background border-border focus:border-accent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or how I can help you..."
                    rows={6}
                    className="bg-background border-border focus:border-accent resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full btn-hero"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;