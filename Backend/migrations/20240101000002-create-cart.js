async function up(db) {
  await db.runSql(`
    CREATE TABLE IF NOT EXISTS cart (
      id          SERIAL PRIMARY KEY,
      user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
      product_id  INTEGER REFERENCES products(id) ON DELETE CASCADE,
      quantity    INTEGER DEFAULT 1,
      created_at  TIMESTAMP DEFAULT NOW()
    );
  `);
}

async function down(db) {
  await db.runSql(`DROP TABLE IF EXISTS cart;`);
}

module.exports = { up, down };