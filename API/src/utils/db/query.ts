export const CREATE_TABLES_IF_NOT_EXIST = `--sql
CREATE TABLE IF NOT EXISTS domain_info (
    id SERIAL PRIMARY KEY,
    domain_name VARCHAR(255) NOT NULL,
    whois_data JSON,
    virustotal_data JSON,
    created_at TIMESTAMP DEFAULT NOW()
  );
  CREATE TABLE IF NOT EXISTS domain_info_history (
    id SERIAL PRIMARY KEY,
    domain_id INT NOT NULL,
    whois_data JSON,
    virustotal_data JSON,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (domain_id) REFERENCES domain_info (id)
  );
`
