import React from 'react';
import { useState, useEffect } from "react";
import Header from '../components/Header';
import Loading from "../components/Loading";

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(!loading)
    }, 1500);
  }, []);

  return (
    <React.Fragment>
      <Loading loading={loading} />
      <Component loading={loading} {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
