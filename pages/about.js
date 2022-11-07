// import styles from '../styles/About.module.css'
import Head from 'next/head'
import Link from 'next/link';
import pitchesData from '../data/pitchesData'
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function About() {

    const newTabLink = (link, text) => {
        return <a href={link} target="_blank" rel="noreferrer">{text}</a>
    }

  return (
    <Layout about>
        <Head>
            <title>About | Kick-off</title>
        </Head>
      <main className={utilStyles.main}>
        <h1>
          About
        </h1>

        <section className={utilStyles.section}>
          <p>
            I built <b>Kick-off</b> as a mini-project to help me learn {newTabLink("https://nextjs.org/", "NextJS")} (a framework for {newTabLink("https://reactjs.org/", "React")}). It also uses {newTabLink("https://mui.com/", "Material UI")} for styling.
          </p>
          
          <p>You can view the source code {newTabLink("https://github.com/george-kirby/kick-off", "here")}.</p>
          
          <p>
            Check out the rest of my {newTabLink("https://github.com/george-kirby/", "Github")} for more code, or my {newTabLink("https://www.linkedin.com/in/georgeskirby/", "LinkedIn")} page for my wider experience.
          </p>
      </section>
      </main>
    </Layout>
  )
}
