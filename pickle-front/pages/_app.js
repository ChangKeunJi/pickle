import '../style/taillwind.css'
import Head from 'next/head';

function MyApp({ Component }) {
  return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <title>Pickle</title>
        </Head>
        <Component />
      </>
  )
}

export default MyApp
