import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface ApiContextType {
    // Authentication
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    verifyAuth: () => Promise<boolean>;
    
    // Portfolio data
    portfolioConfig: any;
    projects: any[];
    skills: any[];
    socialLinks: any[];
    messages: any[];
    messageStats: any;
    
    // Loading states
    isLoading: boolean;
    isConfigLoading: boolean;
    isProjectsLoading: boolean;
    isSkillsLoading: boolean;
    isMessagesLoading: boolean;
    
    // CRUD operations
    updatePortfolioConfig: (configs: any) => Promise<boolean>;
    createProject: (projectData: any) => Promise<boolean>;
    updateProject: (id: string, projectData: any) => Promise<boolean>;
    deleteProject: (id: string) => Promise<boolean>;
    createSkill: (skillData: any) => Promise<boolean>;
    updateSkill: (id: string, skillData: any) => Promise<boolean>;
    deleteSkill: (id: string) => Promise<boolean>;
    updateSocialLinks: (socialLinks: any[]) => Promise<boolean>;
    createMessage: (messageData: any) => Promise<boolean>;
    markMessageAsRead: (id: string) => Promise<boolean>;
    markMessageAsUnread: (id: string) => Promise<boolean>;
    deleteMessage: (id: string) => Promise<boolean>;
    
    // Data refresh
    refreshData: () => Promise<void>;
    refreshConfig: () => Promise<void>;
    refreshProjects: () => Promise<void>;
    refreshSkills: () => Promise<void>;
    refreshMessages: () => Promise<void>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [portfolioConfig, setPortfolioConfig] = useState<any>({});
    const [projects, setProjects] = useState<any[]>([]);
    const [skills, setSkills] = useState<any[]>([]);
    const [socialLinks, setSocialLinks] = useState<any[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [messageStats, setMessageStats] = useState<any>({});
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isConfigLoading, setIsConfigLoading] = useState<boolean>(false);
    const [isProjectsLoading, setIsProjectsLoading] = useState<boolean>(false);
    const [isSkillsLoading, setIsSkillsLoading] = useState<boolean>(false);
    const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(false);
    
    const { toast } = useToast();

    // Check authentication on mount
    useEffect(() => {
        verifyAuth();
    }, []);

    // Authentication methods
    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            setIsLoading(true);
            const response = await apiService.login(username, password);
            
            if (response.success) {
                setIsAuthenticated(true);
                toast({
                    title: "Login Successful",
                    description: "Welcome back to the admin panel!",
                });
                return true;
            } else {
                toast({
                    title: "Login Failed",
                    description: response.message || "Invalid credentials",
                    variant: "destructive",
                });
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
            toast({
                title: "Login Failed",
                description: "An error occurred during login",
                variant: "destructive",
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        apiService.logout();
        setIsAuthenticated(false);
        setPortfolioConfig({});
        setProjects([]);
        setSkills([]);
        setSocialLinks([]);
        setMessages([]);
        setMessageStats({});
        toast({
            title: "Logged Out",
            description: "You have been successfully logged out.",
        });
    };

    const verifyAuth = async (): Promise<boolean> => {
        try {
            const response = await apiService.verifyToken();
            if (response.success) {
                setIsAuthenticated(true);
                return true;
            } else {
                setIsAuthenticated(false);
                return false;
            }
        } catch (error) {
            setIsAuthenticated(false);
            return false;
        }
    };

    // Data fetching methods
    const refreshConfig = async () => {
        try {
            setIsConfigLoading(true);
            const config = await apiService.getPortfolioConfig();
            setPortfolioConfig(config);
        } catch (error) {
            console.error('Error fetching config:', error);
            toast({
                title: "Error",
                description: "Failed to fetch portfolio configuration",
                variant: "destructive",
            });
        } finally {
            setIsConfigLoading(false);
        }
    };

    const refreshProjects = async () => {
        try {
            setIsProjectsLoading(true);
            const projectsData = await apiService.getProjects();
            setProjects(projectsData);
        } catch (error) {
            console.error('Error fetching projects:', error);
            toast({
                title: "Error",
                description: "Failed to fetch projects",
                variant: "destructive",
            });
        } finally {
            setIsProjectsLoading(false);
        }
    };

    const refreshSkills = async () => {
        try {
            setIsSkillsLoading(true);
            const skillsData = await apiService.getSkills();
            setSkills(skillsData);
        } catch (error) {
            console.error('Error fetching skills:', error);
            toast({
                title: "Error",
                description: "Failed to fetch skills",
                variant: "destructive",
            });
        } finally {
            setIsSkillsLoading(false);
        }
    };

    const refreshMessages = async () => {
        try {
            setIsMessagesLoading(true);
            const [messagesData, statsData] = await Promise.all([
                apiService.getMessages(),
                apiService.getMessageStats()
            ]);
            setMessages(messagesData.messages);
            setMessageStats(statsData);
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast({
                title: "Error",
                description: "Failed to fetch messages",
                variant: "destructive",
            });
        } finally {
            setIsMessagesLoading(false);
        }
    };

    const refreshData = async () => {
        await Promise.all([
            refreshConfig(),
            refreshProjects(),
            refreshSkills(),
            refreshMessages()
        ]);
    };

    // CRUD operations
    const updatePortfolioConfig = async (configs: any): Promise<boolean> => {
        try {
            await apiService.updatePortfolioConfig(configs);
            await refreshConfig();
            toast({
                title: "Success",
                description: "Portfolio configuration updated successfully",
            });
            return true;
        } catch (error) {
            console.error('Error updating config:', error);
            toast({
                title: "Error",
                description: "Failed to update portfolio configuration",
                variant: "destructive",
            });
            return false;
        }
    };

    const createProject = async (projectData: any): Promise<boolean> => {
        try {
            await apiService.createProject(projectData);
            await refreshProjects();
            toast({
                title: "Success",
                description: "Project created successfully",
            });
            return true;
        } catch (error) {
            console.error('Error creating project:', error);
            toast({
                title: "Error",
                description: "Failed to create project",
                variant: "destructive",
            });
            return false;
        }
    };

    const updateProject = async (id: string, projectData: any): Promise<boolean> => {
        try {
            await apiService.updateProject(id, projectData);
            await refreshProjects();
            toast({
                title: "Success",
                description: "Project updated successfully",
            });
            return true;
        } catch (error) {
            console.error('Error updating project:', error);
            toast({
                title: "Error",
                description: "Failed to update project",
                variant: "destructive",
            });
            return false;
        }
    };

    const deleteProject = async (id: string): Promise<boolean> => {
        try {
            await apiService.deleteProject(id);
            await refreshProjects();
            toast({
                title: "Success",
                description: "Project deleted successfully",
            });
            return true;
        } catch (error) {
            console.error('Error deleting project:', error);
            toast({
                title: "Error",
                description: "Failed to delete project",
                variant: "destructive",
            });
            return false;
        }
    };

    const createSkill = async (skillData: any): Promise<boolean> => {
        try {
            await apiService.createSkill(skillData);
            await refreshSkills();
            toast({
                title: "Success",
                description: "Skill created successfully",
            });
            return true;
        } catch (error) {
            console.error('Error creating skill:', error);
            toast({
                title: "Error",
                description: "Failed to create skill",
                variant: "destructive",
            });
            return false;
        }
    };

    const updateSkill = async (id: string, skillData: any): Promise<boolean> => {
        try {
            await apiService.updateSkill(id, skillData);
            await refreshSkills();
            toast({
                title: "Success",
                description: "Skill updated successfully",
            });
            return true;
        } catch (error) {
            console.error('Error updating skill:', error);
            toast({
                title: "Error",
                description: "Failed to update skill",
                variant: "destructive",
            });
            return false;
        }
    };

    const deleteSkill = async (id: string): Promise<boolean> => {
        try {
            await apiService.deleteSkill(id);
            await refreshSkills();
            toast({
                title: "Success",
                description: "Skill deleted successfully",
            });
            return true;
        } catch (error) {
            console.error('Error deleting skill:', error);
            toast({
                title: "Error",
                description: "Failed to delete skill",
                variant: "destructive",
            });
            return false;
        }
    };

    const updateSocialLinks = async (socialLinks: any[]): Promise<boolean> => {
        try {
            await apiService.updateSocialLinks(socialLinks);
            await refreshConfig();
            toast({
                title: "Success",
                description: "Social links updated successfully",
            });
            return true;
        } catch (error) {
            console.error('Error updating social links:', error);
            toast({
                title: "Error",
                description: "Failed to update social links",
                variant: "destructive",
            });
            return false;
        }
    };

    const createMessage = async (messageData: any): Promise<boolean> => {
        try {
            await apiService.createMessage(messageData);
            toast({
                title: "Success",
                description: "Message sent successfully",
            });
            return true;
        } catch (error) {
            console.error('Error creating message:', error);
            toast({
                title: "Error",
                description: "Failed to send message",
                variant: "destructive",
            });
            return false;
        }
    };

    const markMessageAsRead = async (id: string): Promise<boolean> => {
        try {
            await apiService.markMessageAsRead(id);
            await refreshMessages();
            return true;
        } catch (error) {
            console.error('Error marking message as read:', error);
            return false;
        }
    };

    const markMessageAsUnread = async (id: string): Promise<boolean> => {
        try {
            await apiService.markMessageAsUnread(id);
            await refreshMessages();
            return true;
        } catch (error) {
            console.error('Error marking message as unread:', error);
            return false;
        }
    };

    const deleteMessage = async (id: string): Promise<boolean> => {
        try {
            await apiService.deleteMessage(id);
            await refreshMessages();
            toast({
                title: "Success",
                description: "Message deleted successfully",
            });
            return true;
        } catch (error) {
            console.error('Error deleting message:', error);
            toast({
                title: "Error",
                description: "Failed to delete message",
                variant: "destructive",
            });
            return false;
        }
    };

    const value: ApiContextType = {
        // Authentication
        isAuthenticated,
        login,
        logout,
        verifyAuth,
        
        // Portfolio data
        portfolioConfig,
        projects,
        skills,
        socialLinks,
        messages,
        messageStats,
        
        // Loading states
        isLoading,
        isConfigLoading,
        isProjectsLoading,
        isSkillsLoading,
        isMessagesLoading,
        
        // CRUD operations
        updatePortfolioConfig,
        createProject,
        updateProject,
        deleteProject,
        createSkill,
        updateSkill,
        deleteSkill,
        updateSocialLinks,
        createMessage,
        markMessageAsRead,
        markMessageAsUnread,
        deleteMessage,
        
        // Data refresh
        refreshData,
        refreshConfig,
        refreshProjects,
        refreshSkills,
        refreshMessages,
    };

    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => {
    const context = useContext(ApiContext);
    if (context === undefined) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
};
