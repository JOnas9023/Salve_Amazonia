-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS pet_rescue_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pet_rescue_db;

-- Tabela de usuários
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('user', 'admin', 'volunteer') DEFAULT 'user',
    profile_image VARCHAR(255),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    zip_code VARCHAR(10),
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Tabela de animais
CREATE TABLE animals (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    species ENUM('dog', 'cat', 'other') NOT NULL,
    breed VARCHAR(100),
    age_estimate VARCHAR(20),
    size ENUM('small', 'medium', 'large') NOT NULL,
    gender ENUM('male', 'female', 'unknown') NOT NULL,
    color VARCHAR(50),
    description TEXT,
    health_status TEXT,
    personality TEXT,
    special_needs TEXT,
    status ENUM('available', 'adopted', 'in_process', 'unavailable') DEFAULT 'available',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    location_description TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    rescue_date DATE,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_species (species),
    INDEX idx_status (status),
    INDEX idx_location (latitude, longitude),
    INDEX idx_city (city),
    INDEX idx_created_by (created_by)
);

-- Tabela de imagens dos animais
CREATE TABLE animal_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    animal_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE,
    INDEX idx_animal_id (animal_id)
);

-- Tabela de adoções
CREATE TABLE adoptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    animal_id INT NOT NULL,
    adopter_id INT NOT NULL,
    status ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approval_date TIMESTAMP NULL,
    completion_date TIMESTAMP NULL,
    notes TEXT,
    home_check_status ENUM('pending', 'scheduled', 'completed', 'failed') DEFAULT 'pending',
    home_check_date TIMESTAMP NULL,
    adoption_fee DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (animal_id) REFERENCES animals(id),
    FOREIGN KEY (adopter_id) REFERENCES users(id),
    INDEX idx_animal_id (animal_id),
    INDEX idx_adopter_id (adopter_id),
    INDEX idx_status (status)
);

-- Tabela de formulário de adoção
CREATE TABLE adoption_forms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    adoption_id INT NOT NULL,
    has_experience BOOLEAN,
    has_other_pets BOOLEAN,
    other_pets_description TEXT,
    living_situation TEXT,
    yard_type ENUM('none', 'small', 'medium', 'large'),
    hours_alone INT,
    activity_level ENUM('low', 'medium', 'high'),
    budget_monthly DECIMAL(8, 2),
    references TEXT,
    additional_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (adoption_id) REFERENCES adoptions(id) ON DELETE CASCADE
);

-- Tabela de denúncias/relatórios
CREATE TABLE reports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    reporter_id INT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    animal_condition TEXT,
    urgency ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    contact_phone VARCHAR(20),
    contact_email VARCHAR(100),
    follow_up_allowed BOOLEAN DEFAULT TRUE,
    assigned_to INT,
    resolution_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (reporter_id) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id),
    INDEX idx_reporter_id (reporter_id),
    INDEX idx_status (status),
    INDEX idx_urgency (urgency),
    INDEX idx_location (latitude, longitude),
    INDEX idx_city (city)
);

-- Tabela de imagens dos relatórios
CREATE TABLE report_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    report_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE,
    INDEX idx_report_id (report_id)
);

-- Tabela de doações
CREATE TABLE donations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    donor_id INT,
    donor_name VARCHAR(100),
    donor_email VARCHAR(100),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'BRL',
    type ENUM('one_time', 'monthly', 'campaign') DEFAULT 'one_time',
    campaign_id INT,
    payment_method VARCHAR(50),
    payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    transaction_id VARCHAR(100),
    message TEXT,
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (donor_id) REFERENCES users(id),
    INDEX idx_donor_id (donor_id),
    INDEX idx_payment_status (payment_status),
    INDEX idx_type (type),
    INDEX idx_campaign_id (campaign_id)
);

-- Tabela de campanhas
CREATE TABLE campaigns (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    goal_amount DECIMAL(12, 2) NOT NULL,
    current_amount DECIMAL(12, 2) DEFAULT 0,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('draft', 'active', 'completed', 'cancelled') DEFAULT 'draft',
    image_url VARCHAR(255),
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_status (status),
    INDEX idx_dates (start_date, end_date)
);

-- Tabela do blog
CREATE TABLE blog_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image VARCHAR(255),
    category ENUM('news', 'care', 'laws', 'stories', 'tips') NOT NULL,
    tags JSON,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    author_id INT NOT NULL,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id),
    INDEX idx_slug (slug),
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_published_at (published_at)
);

-- Tabela de depoimentos
CREATE TABLE testimonials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(100),
    animal_name VARCHAR(100),
    content TEXT NOT NULL,
    rating INT DEFAULT 5,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    adoption_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (adoption_id) REFERENCES adoptions(id),
    INDEX idx_status (status),
    INDEX idx_rating (rating)
);

-- Tabela de voluntários
CREATE TABLE volunteers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    skills TEXT,
    availability TEXT,
    experience TEXT,
    background_check BOOLEAN DEFAULT FALSE,
    status ENUM('pending', 'active', 'inactive', 'suspended') DEFAULT 'pending',
    joined_date DATE,
    hours_contributed INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status)
);

-- Tabela de estatísticas diárias
CREATE TABLE daily_stats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL UNIQUE,
    animals_rescued INT DEFAULT 0,
    animals_adopted INT DEFAULT 0,
    reports_received INT DEFAULT 0,
    donations_amount DECIMAL(10, 2) DEFAULT 0,
    new_users INT DEFAULT 0,
    active_volunteers INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_date (date)
);

-- Tabela de notificações
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('adoption', 'donation', 'report', 'general', 'system') DEFAULT 'general',
    is_read BOOLEAN DEFAULT FALSE,
    related_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_type (type)
);

-- Tabela de configurações do sistema
CREATE TABLE system_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- Inserção de dados iniciais
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('site_name', 'Pet Rescue Platform', 'Nome do site'),
('contact_email', 'contato@petrescue.com', 'Email de contato principal'),
('contact_phone', '(11) 99999-9999', 'Telefone de contato'),
('adoption_fee_dog', '50.00', 'Taxa de adoção padrão para cães'),
('adoption_fee_cat', '30.00', 'Taxa de adoção padrão para gatos'),
('max_adoption_applications', '3', 'Máximo de aplicações de adoção simultâneas por usuário');

-- Criação de índices adicionais para performance
CREATE INDEX idx_animals_search ON animals(name, breed, city);
CREATE INDEX idx_reports_location_status ON reports(latitude, longitude, status);
CREATE INDEX idx_donations_date ON donations(created_at);
CREATE INDEX idx_blog_published ON blog_posts(published_at, status);
