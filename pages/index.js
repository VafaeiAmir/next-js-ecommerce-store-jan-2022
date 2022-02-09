import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Home</title>
          <meta name="description" content="Welcome to the Home Page" />
        </Head>
      </Layout>
      <div className={styles.freepik}>
        <a href="http://www.freepik.com">Designed by Freepik</a>
      </div>
      <div className={styles.img}>
        <img src="/HomeDesign.jpg" alt="HomeDesign" width={350} height={140} />
        <img
          src="/HomeDesign2.jpg"
          alt="HomeDesign2"
          width={350}
          height={140}
        />
        <img src="/Players.jpg" alt="Players" width={350} height={140} />
      </div>
      <main className={styles.main}>
        <h1 className={styles.title}>Still love it?</h1>

        <p className={styles.description}>
          You can have it by just one click! 😎
        </p>

        <div className={styles.grid}>
          <Link href="./atari">
            <a className={styles.card}>
              <h2>ATARI</h2>
              <p>Find in-depth information about ATARI features.</p>
            </a>
          </Link>
          <Link href="./nintendo">
            <a className={styles.card}>
              <h2>NINTENDO</h2>
              <p>Check out the RETRO Nintendo Console.</p>
            </a>
          </Link>
          <Link href="./playStation">
            <a className={styles.card}>
              <h2>PLAY STATION I</h2>
              <p>The worlds first CD-DRIVE CONSOLE. discover it now!</p>
            </a>
          </Link>
          <Link href="./sega">
            <a className={styles.card}>
              <h2>SEGA MEGA-DRIVE</h2>
              <p>Like it says, MEGA fun by MEGA DRIVE.</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
