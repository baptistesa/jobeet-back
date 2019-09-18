CREATE TABLE IF NOT EXISTS experience (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_user : INT,
  company : VARCHAR,
  description : TEXT,
  start_date : VARCHAR,
  end_date : VARCHAR
)