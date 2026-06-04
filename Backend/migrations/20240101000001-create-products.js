async function up(db) {
  await db.runSql(`
    CREATE TABLE IF NOT EXISTS products (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(255)   NOT NULL,
      description TEXT,
      price       DECIMAL(10,2)  NOT NULL,
      stock       INTEGER        DEFAULT 0,
      category    VARCHAR(100),
      image_url   VARCHAR(500),
      created_at  TIMESTAMP      DEFAULT NOW()
    );
  `);
}

async function down(db) {
  await db.runSql(`DROP TABLE IF EXISTS products;`);
}

module.exports = { up, down };