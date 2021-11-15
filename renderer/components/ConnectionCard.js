import React, {useState, useEffect, useRef} from "react";
import Spinner from "./Spinner";

export default function ConnectionCard({
  data,
  linkZoneController
}) {

  const [toggleEnabled, setToggleEnabled] = useState(true)
  const [toggleConnection, setToggleConnection] = useState(false)
  const [systemStatus, setSystemStatus] = useState({})
  const [networkData, setSetNetworkData] = useState({})
  const [runningCronJob, setRunningCronJob] = useState(true)
  const [loadingNetwork, setLoadingNetwork] = useState(false)
  const [networkSelectDisabled, setNetworkSelectDisabled] = useState(true)

  // const [networkType, setNetworkType] = useState("")
  const network = useRef()

  function handleToggleConnection () {
    setLoadingNetwork(true)
    if (!toggleConnection)
      linkZoneController.connect().then(data => {
        cronJob()
        setToggleConnection(true)
        setLoadingNetwork(false)
      })
    else
      linkZoneController.disconnect().then(data => {
        cronJob()
        setToggleConnection(false)
        setLoadingNetwork(false)
      })
  }

  function cronJob () {
    setLoadingNetwork(true)
    linkZoneController.getNetworkSettings().then(netData => {
      linkZoneController.getSystemStatus().then(data => {
        if(data === systemStatus)
          return

        setLoadingNetwork(false)
        setSystemStatus(data)
        setSetNetworkData(netData)
        setToggleConnection(data?.Connected)
        setNetworkSelectDisabled(netData.NetworkStatus)
        // console.log('toggleEnabled', toggleEnabled)
        // console.log(netData)
      })
    })
  }

  useEffect(() => {
    cronJob();
    const timer = setInterval(() => {
      if(runningCronJob)
        cronJob();
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  function handleNetworkType() {
    setLoadingNetwork(true)
    linkZoneController.setNetwork(network.current.value).then(res => {
      cronJob()
    })
      // .finally();
  }

  return (
    <div className="rounded-lg w-72 p-4 bg-white shadow-lg dark:bg-gray-800 max-w-xs m-5">
      <div className="text-2xl leading-normal flex items-center justify-between font-bold text-black dark:text-white pt-4">
        <div className="mb-2">
          <div
            className="
            relative
            inline-block
            w-10
            mr-3
            align-middle
            select-none
            transition
            duration-200
            ease-in
          "
          >
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              disabled={loadingNetwork}
              checked={toggleConnection}
              onChange={() => handleToggleConnection()}
              className="
              toggle-checkbox
              absolute
              block
              w-6
              h-6
              rounded-full
              bg-white
              border-4
              appearance-none
              cursor-pointer
            "
            />
            <label
              htmlFor="toggle"
              className="
              toggle-label
              block
              overflow-hidden
              h-6
              rounded-full
              bg-gray-300
              cursor-pointer
            "
            > </label>
          </div>
          { (networkData?.NetworkStatus) ? ((systemStatus?.Connected) ? "Conectado" : "Desconectado") : "No WiFi" }
        </div>
        { loadingNetwork && <Spinner />}
      </div>

      <ul>
        <li
          className="text-xs font-inter leading-normal flex items-center font-medium text-black dark:text-white py-4 border-t border-gray-300">
          <span className="text-gray-600 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </span>
          <span>{ (networkData?.NetworkStatus) ? systemStatus?.NetworkName : "-" }</span>
        </li>
        <li
          className="text-xs font-inter leading-normal flex items-center font-medium text-black dark:text-white py-4 border-t border-gray-300">
          <span className="text-gray-600 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </span>
          {(networkData?.NetworkStatus) ? systemStatus?.NetworkType : "-"}
        </li>
        <li
          className="text-xs font-inter leading-normal flex items-center font-medium text-black dark:text-white py-4 border-t border-gray-300">
          <span className="text-gray-600 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          </span>
          {/* {(networkData?.NetworkStatus) ? (systemStatus?.BatCap + "%" + (systemStatus?.ChargeState) == 0) ? "(cargando)" : "" : "-"} */}
          { (networkData?.NetworkStatus) ? systemStatus?.BatCap + "%" + (systemStatus?.ChargeState == 0 ? " (cargando)" : "") : "-"}
        </li>
        <li
          className="text-xs font-inter leading-normal flex items-center font-medium text-black dark:text-white py-4 border-t border-gray-300">
          <span className="text-gray-600 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
          {(networkData?.NetworkStatus) ? systemStatus?.TotalConnNum + " usuario(s)" : "-" }
        </li>
        <li
          className="text-xs font-inter leading-normal flex items-center font-medium text-black dark:text-white py-4 border-t border-gray-300">
          <label className="block text-left w-full">
            <select
              className="form-select rounded-md border border-gray-300 outline-none block w-full mt-1 p-2 focus:outline-none focus:ring"
              onChange={() => handleNetworkType()}
              ref={network}
              value={networkData?.NetworkMode}
              defaultValue={networkData?.NetworkMode}
              disabled={loadingNetwork || !networkSelectDisabled}
            >
              <option disabled value="">Selecciona modo de red</option>
              <option value="0">Modo red: Auto</option>
              <option value="1">Modo red: 2G</option>
              <option value="2">Modo red: 3G</option>
              <option value="3">Modo red: 4G</option>
            </select>
          </label>
        </li>
      </ul>
    </div>
  )
}