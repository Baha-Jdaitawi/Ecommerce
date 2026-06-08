import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const migrate = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id          SERIAL PRIMARY KEY,
        name        VARCHAR(100)  NOT NULL,
        email       VARCHAR(150)  UNIQUE NOT NULL,
        password    VARCHAR(255)  NOT NULL,
        role        VARCHAR(20)   DEFAULT 'customer',
        created_at  TIMESTAMP     DEFAULT NOW()
      );

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

      CREATE TABLE IF NOT EXISTS cart (
        id          SERIAL PRIMARY KEY,
        user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id  INTEGER REFERENCES products(id) ON DELETE CASCADE,
        quantity    INTEGER DEFAULT 1,
        created_at  TIMESTAMP DEFAULT NOW()
      );

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

      CREATE TABLE IF NOT EXISTS reviews (
        id          SERIAL PRIMARY KEY,
        user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id  INTEGER REFERENCES products(id) ON DELETE CASCADE,
        rating      INTEGER CHECK (rating >= 1 AND rating <= 5),
        comment     TEXT,
        created_at  TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log(' All tables created successfully');
  } catch (error) {
    console.error(' Migration failed:', error);
  } finally {
    client.release();
    await pool.end();
  }
};

migrate();