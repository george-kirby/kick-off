import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import pitchesData from '../data/pitchesData'
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

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
      <h1 className={styles.title}>
        Welcome to Kick-off!
      </h1>

      <section className={utilStyles.section}>
        <p>
          Looking for a football pitch in London?
        </p>
        
        <p>Check out our favourite pitch this month: <Link href="/pitches/hackney-marshes">Hackney Marshes</Link>.</p>
        
        <p>
          Or you can browse <Link href="/pitches">the whole list</Link>.
        </p>
      </section>
    </Layout>
  )
}
