-- Portfolio Database Schema
-- This file contains the SQL schema for the portfolio database

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio configuration table
CREATE TABLE IF NOT EXISTS portfolio_config (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    config_key TEXT UNIQUE NOT NULL,
    config_value TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Messages table for contact form submissions
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    read_status BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Social media links table
CREATE TABLE IF NOT EXISTS social_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    live_url TEXT,
    github_url TEXT,
    technologies TEXT, -- JSON array of technologies
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    level INTEGER NOT NULL CHECK (level >= 1 AND level <= 100),
    category TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: '404 not found shuvo is no more')
INSERT OR IGNORE INTO users (username, password_hash) VALUES 
('shuvo', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insert default portfolio configuration
INSERT OR IGNORE INTO portfolio_config (config_key, config_value) VALUES 
('hero_title', 'Welcome to My Portfolio'),
('hero_subtitle', 'I am a passionate developer'),
('hero_description', 'Creating amazing digital experiences'),
('about_name', 'Your Name'),
('about_title', 'Full Stack Developer'),
('about_description', 'Passionate about creating innovative solutions'),
('contact_email', 'hello@example.com'),
('contact_phone', '+1234567890'),
('contact_location', 'Your City, Country');

-- Insert default social links
INSERT OR IGNORE INTO social_links (platform, url, display_order) VALUES 
('github', 'https://github.com/yourusername', 1),
('linkedin', 'https://linkedin.com/in/yourusername', 2),
('twitter', 'https://twitter.com/yourusername', 3),
('email', 'mailto:hello@example.com', 4);

-- Insert default projects
INSERT OR IGNORE INTO projects (title, description, technologies, display_order) VALUES 
('Project 1', 'A amazing project description', '["React", "Node.js", "SQLite"]', 1),
('Project 2', 'Another great project', '["Vue.js", "Express", "MongoDB"]', 2),
('Project 3', 'Third project showcase', '["Angular", "Python", "PostgreSQL"]', 3);

-- Insert default skills
INSERT OR IGNORE INTO skills (name, level, category, display_order) VALUES 
('JavaScript', 90, 'Programming Languages', 1),
('React', 85, 'Frontend', 2),
('Node.js', 80, 'Backend', 3),
('SQLite', 75, 'Database', 4),
('CSS', 85, 'Frontend', 5),
('HTML', 90, 'Frontend', 6);
