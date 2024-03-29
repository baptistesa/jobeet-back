CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  last_name VARCHAR(150) NOT NULL,
  mail VARCHAR(255) UNIQUE,
  phone VARCHAR(255) UNIQUE,
  password VARCHAR(75),
  role INT,
  code INTEGER,
  is_verified BOOLEAN,
  picture_path VARCHAR(50),
  id_entreprise INT
)