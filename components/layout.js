import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import homeStyles from '../styles/Home.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

export const siteTitle = 'Kick-off';

export default function Layout({ children, home, pitches, about }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{ siteTitle }</title>
        <link rel="icon" href="/images/Football.svg" />
        <meta
          name="description"
          content="Find a football pitch near you"
        />
        {/* <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        /> */}
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={home && styles.homeHeader}>
        {/* TODO extract football images into function with size parameter(s) */}
        {home ? (
          <Image
            priority
            src="/images\Football.svg"
            height={144}
            width={144}
            alt="soccer ball"
          />
        ) : (
          <Link href="/">
            <Image
              priority
              src="/images\Football.svg"
              height={80}
              width={80}
              alt="soccer ball"
            />
          </Link>
        )}
      </header>
      <main className={home && homeStyles.main}>{children}</main>
      <footer className={styles.footer}>
        {!home && (
            <Link href="/">
              Home
            </Link>
        )}
        {!pitches && (
            <Link href="/pitches">
              Pitches
            </Link>
        )}
        {!about && (
            <Link href="/about">
              About
            </Link>
        )}
      </footer>
    </div>
  );
}