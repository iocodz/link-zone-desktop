import React, { useEffect } from "react";
import ConnectionCard from "../components/Cards/ConnectionCard";
import UssdCard from "../components/Cards/UssdCard";

export default function CardsSection({ linkZone }) {

  useEffect(() => {
  }, [])

  return (
    <div className="w-full flex flex-wrap justify-center mt-10">
      <ConnectionCard linkZoneController={linkZone} />
      <UssdCard linkZoneController={linkZone} />
    </div>
  )
}