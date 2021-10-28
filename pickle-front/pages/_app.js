import Head from "next/head";
import { ThemeProvider } from "next-themes";

import "../style/taillwind.css";
import wrapper from "../store/configureStore";
import React, { useEffect, useState } from "react";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
        />
        <title>Pickle | 심플하게 북마크 관리하세요</title>
      </Head>
      <ThemeProvider
        forcedTheme={Component.theme || undefined}
        attribute="class"
      >
        <Component />
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(App);
