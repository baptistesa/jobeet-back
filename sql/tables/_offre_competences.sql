DROP TABLE IF EXISTS jobeet.offre_competences;

CREATE TABLE IF NOT EXISTS jobeet.offre_competences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_offre INT NOT NULL,
  id_competence INT NOT NULL
)