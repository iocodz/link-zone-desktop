import React, {useEffect, useState} from "react";
import ConnectionCard from "../components/ConnectionCard";
import NetworkCard from "../components/NetworkCard";
import UssdCard from "../components/UssdCard";
import LinkZone from "../types/LinkZone";

export default function CardsSection() {

  const linkZone = new LinkZone()

  useEffect(() => {
  }, [])

  return (
    <div className="w-full flex flex-wrap justify-center mt-10">
      <ConnectionCard linkZoneController={linkZone} />
      {/* <NetworkCard linkZoneController={linkZone} /> */}
      <UssdCard linkZoneController={linkZone} />
    </div>
  )
}