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
    <div>
      <div className="w-full flex flex-wrap justify-center mt-10">
        <ConnectionCard linkZoneController={linkZone} />
        <NetworkCard linkZoneController={linkZone} />
        <UssdCard linkZoneController={linkZone} />
      </div>
      <h2 className="mt-2 text-center w-full text-gray-800">Considera hacer una <a onClick={() => require('electron').shell.openExternal("https://qvapay.com/payme/linkzone")} className="cursor-pointer font-bold underline text-blue-600">donación 💰</a> </h2>
    </div>
  )
}