DROP TABLE IF EXISTS jobeet.matchs;

CREATE TABLE IF NOT EXISTS jobeet.matchs (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_user INT NOT NULL,
    id_recruteur INT NOT NULL,
    id_offre INT NOT NULL,
    is_valid BOOLEAN NOT NULL
)