import React, {useEffect} from "react";
import ConnectionCard from "../components/ConnectionCard";
import NetworkCard from "../components/NetworkCard";
import UssdCard from "../components/UssdCard";
import LinkZone from "../types/LinkZone";

const data = {
  title: "Conexión",
  status: "Conectado",
  timing: "29:12:10",
  traffic: "1.94GB",
  network_type: "4G",
  battery: "100%",
  users_connected: "1 usuario"
}

export default function CardsSection() {

  const linkZone = new LinkZone()

  useEffect(() => {
    linkZone.getSystemStatus()
  }, [])

  return (
    <div className="w-full flex flex-wrap justify-center mt-10">
      <ConnectionCard {...data} linkZoneController={linkZone} />
      {/*<NetworkCard linkZoneController={linkZone} />*/}
      <UssdCard linkZoneController={linkZone} />
    </div>
  )
}