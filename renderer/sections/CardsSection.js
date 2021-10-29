import React, {useEffect, useState} from "react";
import ConnectionCard from "../components/ConnectionCard";
import NetworkCard from "../components/NetworkCard";
import UssdCard from "../components/UssdCard";
import LinkZone from "../types/LinkZone";

export default function CardsSection() {

  const linkZone = new LinkZone()
  const [systemStatus, setSystemStatus] = useState({})

  useEffect(() => {
    linkZone.getSystemStatus().then(data => {
      setSystemStatus(data)
    });
  }, [])

  return (
    <div className="w-full flex flex-wrap justify-center mt-10">
      <ConnectionCard data={systemStatus} linkZoneController={linkZone} />
      {/* <NetworkCard linkZoneController={linkZone} /> */}
      <UssdCard linkZoneController={linkZone} />
    </div>
  )
}