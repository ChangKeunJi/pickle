import Head from "next/head";

import "../style/taillwind.css";
import wrapper from "../store/configureStore";

function App({ Component }) {
  return (
    <>
      <Head>
        <title>Pickle</title>
      </Head>
      <Component />
    </>
  );
}

export default wrapper.withRedux(App);
