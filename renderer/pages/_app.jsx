import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import Providers from "../components/Providers";
import Loading from "../components/UI/Loading";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(!loading);
    }, 1500);
  }, []);

  return (
    <Providers>
      <React.Fragment>
        <Loading loading={loading} />
        <Component loading={loading} {...pageProps} />
      </React.Fragment>
    </Providers>
  );
}

export default MyApp;
