DROP TABLE IF EXISTS jobeet.messages;

CREATE TABLE IF NOT EXISTS jobeet.messages (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_exp INT NOT NULL,
    id_offre INT NOT NULL,
    message TEXT NOT NULL,
    id_dest INT NOT NULL,
    id_room INT NOT NULL
)