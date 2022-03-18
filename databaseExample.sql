-- Create products table
CTREATE TABLE products(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(30) NOT NULL,
  price integer NOT NULL,
  text varchar(200) NOT NULL
);

-- Insert some products (C in CRUD - Create)
INSERT INTO products
    (name, price, text)
  VALUES
    ('Atari', 150, 'Find more information about ATARI features'),
    ('Nintendo', 125, 'Check out the RETRO Nintendo Console'),
    ('Sega', 100, 'MEGA fun by MEGA DRIVE'),
    ('PlayStation I', 200, 'The worlds first CD-DRIVE CONSOLE!');

    -- Read some products (R in CRUD - Read)
    SELECT * FROM products;
