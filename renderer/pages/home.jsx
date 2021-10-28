import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import CardsSection from "../sections/CardsSection";

function Home() {

  return (
    <React.Fragment>
      <Head>
        <title>Home - Link Zone Manager</title>
      </Head>
      <CardsSection />
    </React.Fragment>
  );
}

export default Home;
