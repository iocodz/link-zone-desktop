import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import LinkZone from "../types/LinkZone";

function Home() {
  const linkZone = new LinkZone()

  useEffect(() => {
    linkZone.getSystemStatus()
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript-tailwindcss)</title>
      </Head>
      <div>
          <h1 className="text-center text-4xl">Hello Electron + Next</h1>
      </div>
    </React.Fragment>
  );
}

export default Home;
