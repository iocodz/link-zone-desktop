import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

function Home() {
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
