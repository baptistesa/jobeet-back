CREATE TABLE IF NOT EXISTS offres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  id_author INT,
  date DATE,
  id_entreprise INT NOT NULL
)