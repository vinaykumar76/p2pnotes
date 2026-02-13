
-- OOSE Project: Peer-to-Peer Notes Sharing System
-- Database Schema (MySQL)

CREATE DATABASE IF NOT EXISTS noteshare_db;
USE noteshare_db;

-- 1. Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Stored as hashed string
    branch VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Notes Table
CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    description TEXT,
    branch VARCHAR(50) NOT NULL,
    semester VARCHAR(50) NOT NULL,
    uploader_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL, -- Path to server storage
    file_size INT NOT NULL,
    download_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploader_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Downloads Tracking Table
CREATE TABLE downloads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    note_id INT NOT NULL,
    user_id INT NOT NULL,
    downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Sample Data Inserts
INSERT INTO users (name, email, password, branch, year) 
VALUES ('Test Student', 'student@example.com', 'password_hash_here', 'Computer Science', 3);

INSERT INTO notes (title, subject, description, branch, semester, uploader_id, file_name, file_path, file_size) 
VALUES ('Java Programming Basics', 'OOPS', 'Full course notes for OOPS with Java', 'Computer Science', 'Semester 4', 1, 'oops_java.pdf', '/uploads/oops_java.pdf', 102456);
