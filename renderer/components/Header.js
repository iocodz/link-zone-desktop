import NetworkSettings from "./Settings/NetworkSettings";

export default function Header({ linkZoneController }) {
  return (
      <>
        <NetworkSettings linkZoneController={linkZoneController} />
        {/* <AboutAndDonations /> */}
      </>
    )
}