import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/layout';
import pitches from '../../data/pitchesData'
import styles from './Pitch.module.css'
import PitchFacilities from '../../components/PitchFacilities';

export async function getStaticPaths() {
    // Return a list of possible value for id
    const paths = pitches.map(pitch => {
        return { params: { slug: pitch.slug } }
    })
    return {
        paths,
        fallback: false,
      };
  }

export async function getStaticProps({ params }) {
    const pitch = pitches.find(pitch => {
        return pitch.slug === params.slug
    })
    return {
      props: pitch,
    };
  }

export default function Pitch( { title, facilities, distance, price, description, image } ) {
    const pitchImage = image || { src: `/images/Football.svg`, alt: "football soccer ball" }
    
    return (
        <Layout>
            <Head>
                <title>{ title + " | Find Treasure" }</title>
            </Head>
            <main>
                <div className={styles.imageContainer}>
                    <Image
                      className={styles.pitchImage}
                      priority
                      src={pitchImage.src}
                      fill
                      alt={pitchImage.alt}
                    />
                </div>
                <h1>{ title }</h1>
                <ul>
                    <li>{distance} miles away</li>
                    <li>£{price} per hour</li>
                </ul>
                <p>{ description }</p>
                <PitchFacilities facilities={facilities} />
                <p>Not right for you? <Link href="/pitches">Check out other pitches</Link>.</p>
            </main>
        </Layout>
    )
}