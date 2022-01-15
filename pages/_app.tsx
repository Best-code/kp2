import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Foot from '../components/footer'
import Header from '../components/header'

function MyApp({ Component, pageProps }: AppProps) {
  return <div>
    <Head>
      <title>Mrs. Kilpatricks Awesome Website</title>
      <meta name="description" content="Created by Colin Maloney" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header/>
    <Component {...pageProps} />
    <Foot/>
  </div>
}

export default MyApp
