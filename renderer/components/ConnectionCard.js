import React, {useState, useEffect, useRef} from "react";

export default function ConnectionCard({
  data,
  linkZoneController
}) {

  const [toggleEnabled, setToggleEnabled] = useState(true)
  const [toggleConnection, setToggleConnection] = useState(false)
  const [systemStatus, setSystemStatus] = useState({})
  const [runningCronJob, setRunningCronJob] = useState(true)
  // const [networkType, setNetworkType] = useState("")
  const network = useRef()

  function handleToggleConnection () {
    
    setToggleEnabled(false)
    console.log('togle', toggleConnection)
    if (!toggleConnection)
      linkZoneController.connect().then(data => {
        linkZoneController.sleep(3000).then(data => {
          linkZoneController.getSystemStatus().then(data => {
            setSystemStatus(data)
            setToggleConnection(data?.Connected)
            setToggleEnabled(true)
          });
        })
      })
    else
      linkZoneController.disconnect().then(data => {
        linkZoneController.sleep(3000).then(data => {
          linkZoneController.getSystemStatus().then(data => {
            setSystemStatus(data)
            setToggleConnection(data?.Connected)
            setToggleEnabled(true)
          });
        })
      })
  }

  function cronJob () {
    linkZoneController.getSystemStatus().then(data => {
      if(data === systemStatus)
        return
      setSystemStatus(data)
      setToggleConnection(data?.Connected)
    });
  }

  function stopCronJob () {
    setRunningCronJob(false)
  }

  function startCronJob () {
    setRunningCronJob(true)
  }

  useEffect(() => {
    cronJob();
    const timer = setInterval(() => {
      if(runningCronJob)
        cronJob();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  function handleNetworkType() {
    linkZoneController.setNetwork(network.current.value);
  }

  return (
    <div className="rounded-lg w-72 p-4 bg-white shadow-lg dark:bg-gray-800 max-w-xs m-5">
      <p className="text-2xl leading-normal justify-center font-bold text-black dark:text-white pt-4">
        Conexión
        <div
          className="
            relative
            inline-block
            w-10
            ml-2
            mb-1
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
            disabled={!toggleEnabled}
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
      </p>

      <ul>
        <li
          className="text-xs font-inter leading-normal flex items-center font-medium text-black dark:text-white py-4 border-t border-gray-300">
          <span className="text-gray-600 mr-2">
            <svg hidden={!systemStatus?.Connected} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z" clipRule="evenodd" />
            </svg>

            <svg hidden={systemStatus?.Connected} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3.707 2.293a1 1 0 00-1.414 1.414l6.921 6.922c.05.062.105.118.168.167l6.91 6.911a1 1 0 001.415-1.414l-.675-.675a9.001 9.001 0 00-.668-11.982A1 1 0 1014.95 5.05a7.002 7.002 0 01.657 9.143l-1.435-1.435a5.002 5.002 0 00-.636-6.294A1 1 0 0012.12 7.88c.924.923 1.12 2.3.587 3.415l-1.992-1.992a.922.922 0 00-.018-.018l-6.99-6.991zM3.238 8.187a1 1 0 00-1.933-.516c-.8 3-.025 6.336 2.331 8.693a1 1 0 001.414-1.415 6.997 6.997 0 01-1.812-6.762zM7.4 11.5a1 1 0 10-1.73 1c.214.371.48.72.795 1.035a1 1 0 001.414-1.414c-.191-.191-.35-.4-.478-.622z" />
            </svg>
          </span>
          <span>{ (systemStatus?.Connected) ? systemStatus?.NetworkName : "Desconectado" }</span>
        </li>
        <li
          className="text-xs font-inter leading-normal flex items-center font-medium text-black dark:text-white py-4 border-t border-gray-300">
          <span className="text-gray-600 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </span>
          {systemStatus?.NetworkType}
        </li>
        <li
          className="text-xs font-inter leading-normal flex items-center font-medium text-black dark:text-white py-4 border-t border-gray-300">
          <span className="text-gray-600 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          </span>
          {systemStatus?.BatCap}%
        </li>
        <li
          className="text-xs font-inter leading-normal flex items-center font-medium text-black dark:text-white py-4 border-t border-gray-300">
          <span className="text-gray-600 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
          {systemStatus?.TotalConnNum} usuario(s)
        </li>
        <li
          className="text-xs font-inter leading-normal flex items-center font-medium text-black dark:text-white py-4 border-t border-gray-300">
          <label className="block text-left w-full">
            <select
              className="form-select rounded-md border border-gray-300 outline-none block w-full mt-1 p-2 focus:outline-none focus:ring"
              onChange={() => handleNetworkType()}
              ref={network}
              defaultValue=""
            >
              <option selected disabled value="">Selecciona modo de red</option>
              <option value="auto">Auto</option>
              <option value="2g">2G</option>
              <option value="3g">3G</option>
              <option value="4g">4G</option>
            </select>
          </label>
        </li>
      </ul>
    </div>
  )
}