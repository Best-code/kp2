import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/header'
import { SessionProvider } from "next-auth/react"


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return <SessionProvider session={session}>
    <Head>
      <title>Mrs. Kilpatricks Awesome Website</title>
      <meta name="description" content="Created by Colin Maloney" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <Component {...pageProps} />
    </SessionProvider>
}

export default MyApp
