import React from 'react';
import Head from 'next/head';
import CardsSection from "../components/Cards/CardsSection";
import LinkZone from "../LinkZone";
import Header from '../components/Header';

function Home({loading}) {
  const linkZone = new LinkZone()

  return (
    <React.Fragment>
      <Head>
        <title>Home - Link Zone Manager</title>
      </Head>
      {!loading && <Header linkZone={linkZone} />}
      {!loading && <CardsSection linkZone={linkZone} />}
    </React.Fragment>
  );
}

export default Home;
