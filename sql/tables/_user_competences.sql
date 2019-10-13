DROP TABLE IF EXISTS jobeet.user_competences;

CREATE TABLE IF NOT EXISTS jobeet.user_competences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT NOT NULL,
  id_competence INT NOT NULL
)