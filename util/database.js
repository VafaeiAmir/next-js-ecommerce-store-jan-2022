// import { config } from 'dotenv-safe';
// import postgres from 'postgres';
import img1 from '../public/product-pic/1.jpg';
import img2 from '../public/product-pic/2.jpg';
import img3 from '../public/product-pic/3.jpg';
import img4 from '../public/product-pic/4.jpg';

// Read the environment variables from the .env
// file, which will then be available for all
// following code
// config();

// const sql = postgres();

// const products = await sql`
// SELECT * FROM products
// `;

// console.log('products', products);

const productsDatabase = [
  {
    id: '1',
    name: 'Atari',
    img: img1,
    text: 'Find more information about ATARI features',
    price: 150,
  },
  {
    id: '2',
    name: 'Nintendo',
    img: img2,
    text: 'Check out the RETRO Nintendo Console',
    price: 125,
  },
  {
    id: '3',
    name: 'Sega',
    img: img3,
    text: 'MEGA fun by MEGA DRIVE',
    price: 100,
  },

  {
    id: '4',
    name: 'PlayStation I',
    img: img4,
    text: 'The worlds first CD-DRIVE CONSOLE!',
    price: 200,
  },
];
export default productsDatabase;
