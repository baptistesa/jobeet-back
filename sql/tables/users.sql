CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  last_name VARCHAR(150) NOT NULL,
  mail VARCHAR(255) ,
  phone VARCHAR(255) ,
  password VARCHAR(75)
)