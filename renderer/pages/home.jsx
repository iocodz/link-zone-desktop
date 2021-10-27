import React, {useEffect} from 'react';
import Head from 'next/head';

const proxyURL = "/api/test";

function Home() {

  useEffect(() => {
    fetch(proxyURL).then(res => console.log(res))
  }, [])

  async function linkZoneRequest(payload) {

    const headers = payload.params
    const body = payload.toString()

    await fetch(proxyURL, {
      method: 'POST',
      body: body,
      headers: headers
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return res
      })
      .catch(err => {
        console.log(err)
        return err
      })
    return {}
  }

  function getSystemStatus () {

    const data = {
      jsonrpc: "2.0",
      method: "GetSystemStatus",
      id: "13.4"
    }

    const res = linkZoneRequest(data)

    const networkName = res.result['NetworkName']
    // const networkType = NETWORKS_TYPES[res['result']['NetworkType']];

    return networkName
  }

  function setNetworkSettings(networkMode) {

    const data = {
      jsonrpc:"2.0",
      method:"SetNetworkSettings",
      params: {
        NetworkMode: networkMode.value,
        NetselectionMode: 0
      },
      id:"4.7"
    }

    const res = linkZoneRequest(data)
    const status = res.ok ? "OK" : "ERROR"

    return status
  }

  function connect(){

    const data = {
      jsonrpc:"2.0",
      method:"Connect",
      id:"3.2"
    }
    return linkZoneRequest(data)
  }

  function disconnect(){

    const data = {
      jsonrpc:"2.0",
      method:"DisConnect",
      id:"3.2"
    }
    return linkZoneRequest(data)
  }

  function sendUSSD(code){
    const data = {
      jsonrpc: "2.0",
      method: "SendUSSD",
      params: {
        UssdContent: code,
        UssdType: 1
      },
      id: "8.1"
    }
    return linkZoneRequest(data)
  }

  function setNetwork(networkMode) {
    disconnect()
    setNetworkSettings(networkMode)
    connect()
  }

  function getUSSDSendResult() {

    const data = {
      jsonrpc: "2.0",
      method: "GetUSSDSendResult",
      id: "8.2"
    }
    const res = self.linkZoneRequest(data)
    if (!res.ok)
      return null

    if (res.result['SendState'] === 1)
      return getUSSDSendResult()

    if (res.result['SendState'] === 2)
      return res.result['UssdContent']

    return null
  }

  function sendUssdCode(code) {

    sendUSSD(code)
    const message = getUSSDSendResult()

    const status = message ? "OK" : "ERROR"

    return status
  }

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript-tailwindcss)</title>
      </Head>
      <div>
          <h1 className="text-center text-4xl">Hello Electron + Next</h1>
      </div>
    </React.Fragment>
  );
}

export default Home;
