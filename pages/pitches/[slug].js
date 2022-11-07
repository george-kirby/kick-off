import Head from 'next/head'
import Link from 'next/link';
import Layout from '../../components/layout';
import pitches from '../../data/pitchesData'

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

export default function Pitch( { title, description } ) {
    return (
        <Layout>
            <Head>
                <title>{ title + " | Find Treasure" }</title>
            </Head>
            <main>
                <h1>{ title }</h1>
                <p>{ description }</p>
                <p>Not right for you? <Link href="/pitches">Check out others</Link></p>
            </main>
        </Layout>
    )
}