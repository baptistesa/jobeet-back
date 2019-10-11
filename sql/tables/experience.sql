DROP TABLE IF EXISTS jobeet.experience;

CREATE TABLE IF NOT EXISTS jobeet.experience (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_cv INT NOT NULL,
  company VARCHAR (150) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  CONSTRAINT exp_id_cv FOREIGN KEY (id_cv) REFERENCES cv(id)
)