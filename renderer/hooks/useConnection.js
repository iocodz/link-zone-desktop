import { createContext, useContext, useEffect, useState } from "react";
import LinkZone from "../LinkZone";

const Context = createContext();

export function ConectionProvider({ children }) {
  const linkZoneController = new LinkZone();
  const [toggleConnection, setToggleConnection] = useState(false);
  const [systemStatus, setSystemStatus] = useState({});
  const [networkData, setSetNetworkData] = useState({});
  const [runningCronJob, setRunningCronJob] = useState(true);
  const [loadingNetwork, setLoadingNetwork] = useState(false);
  const [networkSelectDisabled, setNetworkSelectDisabled] = useState(true);

  const refreshData = () => {
    linkZoneController.getSmsStorageState();

    setLoadingNetwork(true);
    linkZoneController.getNetworkSettings().then((netData) => {
      linkZoneController.getSystemStatus().then((data) => {
        if (data === systemStatus) return;

        setLoadingNetwork(false);
        setSystemStatus(data);
        setSetNetworkData(netData);
        setToggleConnection(data?.Connected);
        setNetworkSelectDisabled(netData.NetworkStatus);
      });
    });
  }

  const handleToggleConnection = () => {
    setLoadingNetwork(true);
    if (!toggleConnection)
      linkZoneController.connect().then(() => {
        refreshData();
        setToggleConnection(true);
        setLoadingNetwork(false);
      });
    else
      linkZoneController.disconnect().then(() => {
        refreshData();
        setToggleConnection(false);
        setLoadingNetwork(false);
      });
  }

  useEffect(() => {
    refreshData();
    const timer = setInterval(() => {
      if (runningCronJob) refreshData();
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  function handleNetworkType() {
    setLoadingNetwork(true);
    linkZoneController.setNetwork(network.current.value).then((res) => {
      refreshData();
    });
  }

  return (
    <Context.Provider value={[
      toggleConnection, setToggleConnection,
      systemStatus, setSystemStatus,
      networkData, setSetNetworkData,
      runningCronJob, setRunningCronJob,
      loadingNetwork, setLoadingNetwork,
      networkSelectDisabled, setNetworkSelectDisabled,
      refreshData,
      handleToggleConnection,
      handleNetworkType
    ]}>
      {children}
    </Context.Provider>
  );
}

export function useConnection() {
  return useContext(Context);
}