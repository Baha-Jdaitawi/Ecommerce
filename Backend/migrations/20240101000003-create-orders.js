async function up(db) {
  await db.runSql(`
    CREATE TABLE IF NOT EXISTS orders (
      id                SERIAL PRIMARY KEY,
      user_id           INTEGER REFERENCES users(id) ON DELETE CASCADE,
      total_amount      DECIMAL(10,2) NOT NULL,
      status            VARCHAR(50) DEFAULT 'pending',
      stripe_session_id VARCHAR(255),
      shipping_address  TEXT,
      created_at        TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id          SERIAL PRIMARY KEY,
      order_id    INTEGER REFERENCES orders(id) ON DELETE CASCADE,
      product_id  INTEGER REFERENCES products(id) ON DELETE SET NULL,
      quantity    INTEGER NOT NULL,
      price       DECIMAL(10,2) NOT NULL
    );
  `);
}

async function down(db) {
  await db.runSql(`
    DROP TABLE IF EXISTS order_items;
    DROP TABLE IF EXISTS orders;
  `);
}

module.exports = { up, down };