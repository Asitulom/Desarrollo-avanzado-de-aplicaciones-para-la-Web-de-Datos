CREATE DATABASE IF NOT EXISTS deustoscooters;

USE deustoscooters;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,          
    username VARCHAR(255) NOT NULL UNIQUE,      
    email VARCHAR(255) NOT NULL UNIQUE,         
    password VARCHAR(255) NOT NULL              
);

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,         
    name VARCHAR(255) NOT NULL,                
    description TEXT,                           
    price DECIMAL(10, 2) NOT NULL,              
    available BOOLEAN NOT NULL                
);


CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,          
    user_id INT NOT NULL,                      
    product_id INT NOT NULL,                  
    quantity INT NOT NULL,                       
    status VARCHAR(50) NOT NULL,               
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuarios(id),    
    FOREIGN KEY (product_id) REFERENCES productos(id) 
);


