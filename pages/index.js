import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import pitchesData from '../data/pitchesData'
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

import PitchCardsList from '../components/PitchCardsList';

const ParrotImage = () => (
  <Image
    src="/images/Football.svg"
    height={350}
    width={700}
    alt="football soccer ball"
  />
);

export async function getStaticProps() {
  return {
    props: {
      pitchesData      
    },
  };
}

export default function Home({ pitchesData }) {
  return (
    <Layout home>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Kick-off!
        </h1>

        <ParrotImage />

        <p>Jump right in by searching for treasure on <Link href="/loots/emerald-isle">Emerald Isle</Link></p>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Known loots</h2>
        <PitchCardsList pitches={pitchesData} />
      </section>
      </main>
    </Layout>
  )
}
