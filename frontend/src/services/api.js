// API service for communicating with the backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.token = localStorage.getItem('authToken');
    }

    // Set authentication token
    setToken(token) {
        this.token = token;
        if (token) {
            localStorage.setItem('authToken', token);
        } else {
            localStorage.removeItem('authToken');
        }
    }

    // Get authentication headers
    getAuthHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };
        
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        
        return headers;
    }

    // Generic request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: this.getAuthHeaders(),
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Authentication methods
    async login(username, password) {
        const response = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
        
        if (response.success && response.token) {
            this.setToken(response.token);
        }
        
        return response;
    }

    async logout() {
        const response = await this.request('/auth/logout', {
            method: 'POST',
        });
        
        this.setToken(null);
        return response;
    }

    async verifyToken() {
        return await this.request('/auth/verify');
    }

    // Portfolio configuration methods
    async getPortfolioConfig() {
        const response = await this.request('/portfolio/config');
        return response.data;
    }

    async updatePortfolioConfig(configs) {
        return await this.request('/portfolio/config', {
            method: 'PUT',
            body: JSON.stringify({ configs }),
        });
    }

    // Projects methods
    async getProjects() {
        const response = await this.request('/portfolio/projects');
        return response.data;
    }

    async createProject(projectData) {
        return await this.request('/portfolio/projects', {
            method: 'POST',
            body: JSON.stringify(projectData),
        });
    }

    async updateProject(id, projectData) {
        return await this.request(`/portfolio/projects/${id}`, {
            method: 'PUT',
            body: JSON.stringify(projectData),
        });
    }

    async deleteProject(id) {
        return await this.request(`/portfolio/projects/${id}`, {
            method: 'DELETE',
        });
    }

    // Skills methods
    async getSkills() {
        const response = await this.request('/portfolio/skills');
        return response.data;
    }

    async createSkill(skillData) {
        return await this.request('/portfolio/skills', {
            method: 'POST',
            body: JSON.stringify(skillData),
        });
    }

    async updateSkill(id, skillData) {
        return await this.request(`/portfolio/skills/${id}`, {
            method: 'PUT',
            body: JSON.stringify(skillData),
        });
    }

    async deleteSkill(id) {
        return await this.request(`/portfolio/skills/${id}`, {
            method: 'DELETE',
        });
    }

    // Social links methods
    async getSocialLinks() {
        const response = await this.request('/portfolio/social-links');
        return response.data;
    }

    async updateSocialLinks(socialLinks) {
        return await this.request('/portfolio/social-links', {
            method: 'PUT',
            body: JSON.stringify({ socialLinks }),
        });
    }

    // Messages methods
    async getMessages(page = 1, limit = 10, unreadOnly = false) {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            unread_only: unreadOnly.toString(),
        });
        
        const response = await this.request(`/messages?${params}`);
        return response.data;
    }

    async getMessage(id) {
        const response = await this.request(`/messages/${id}`);
        return response.data;
    }

    async createMessage(messageData) {
        return await this.request('/messages', {
            method: 'POST',
            body: JSON.stringify(messageData),
        });
    }

    async markMessageAsRead(id) {
        return await this.request(`/messages/${id}/read`, {
            method: 'PUT',
        });
    }

    async markMessageAsUnread(id) {
        return await this.request(`/messages/${id}/unread`, {
            method: 'PUT',
        });
    }

    async deleteMessage(id) {
        return await this.request(`/messages/${id}`, {
            method: 'DELETE',
        });
    }

    async getMessageStats() {
        const response = await this.request('/messages/stats/summary');
        return response.data;
    }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
