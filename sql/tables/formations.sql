DROP TABLE IF EXISTS jobeet.formations;

CREATE TABLE IF NOT EXISTS jobeet.formations (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    school VARCHAR(150) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    description VARCHAR(255),
    id_cv INT NOT NULL,
    CONSTRAINT fk_id_cv FOREIGN KEY (id_cv) REFERENCES cv (id)
)