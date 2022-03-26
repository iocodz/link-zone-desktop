import { getLinkZoneUrl, linkZoneApiUrl } from "../config";

export default class LinkZone {
  proxyURL;
  NETWORKS_TYPES = ['NO_SERVICE', '2G', '2G', '3G', '3G', '3G', '3G+', '3G+', '4G', '4G+']

  UssdCodes = [
    {
      "value": "*222#",
      "label": "Consultar Saldo"
    },
    {
      "value": "*133*5*1#",
      "label": "Plan Combinado 600 MB + 800 MB - $110"
    },
    {
      "value": "*133*5*2#",
      "label": "Plan Combinado 1.5 GB + 2 GB - $250"
    },
    {
      "value": "*133*5*3#",
      "label": "Plan Combinado 3.5 GB + 4.5 GB - $500"
    },
    {
      "value": "*133*1*4*1#",
      "label": "Plan LTE 1 GB - $100"
    },
    {
      "value": "*133*1*4*2#",
      "label": "Plan LTE 2.5 GB - $200"
    },
    {
      "value": "*133*1*4*3#",
      "label": "Plan LTE 4 GB + 12 GB - $950"
    },
  ]
  
  constructor(proxyURL = linkZoneApiUrl) {
    this.proxyURL = proxyURL;
   }

  setLinkZoneUrl(url){
    this.proxyURL = getLinkZoneUrl(url);
  }

  getLinkZoneUrl(){
    return this.proxyURL;
  }

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  linkZoneRequest(payload) {

    return fetch(this.proxyURL, {
      // mode: "no-cors",
      method: 'POST',
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        return data
      })
      .catch(err => {
        return err
      })
  }

  getSystemStatus () {

    const data = {
      jsonrpc: "2.0",
      method: "GetSystemStatus",
      id: "13.4"
    }

    return this.linkZoneRequest(data).then(res => {
      const result = {
        "Connected": res?.result?.ConnectionStatus == 2,
        "NetworkName": res?.result?.NetworkName,
        "NetworkType": this.NETWORKS_TYPES[res?.result?.NetworkType],
        "SignalStrength": res?.result?.SignalStrength,
        "TotalConnNum": res?.result?.TotalConnNum,
        "BatCap": res?.result?.bat_cap,
        "ChargeState": res?.result?.chg_state,
      }
      console.log('getSystemStatus', result)
      return result
    })
  }

  getNetworkSettings () {

    const data = {
      jsonrpc: "2.0",
      method: "GetNetworkSettings",
      id: "4.6"
    }

    return this.linkZoneRequest(data).then(res => {
      let hasNetwork = true
      if(res?.result == null || res?.code == "EHOSTUNREACH" || res?.code == "EACCES")
        hasNetwork = false
        
      let result = {
        "NetworkMode": res?.result?.NetworkMode,
        "NetSelectionMode": res?.result?.NetselectionMode,
        "NetworkStatus": hasNetwork
      }
      
      if(result.NetworkMode != null)
        result.NetworkMode = (result.NetworkMode == 255) ? 0 : res.result.NetworkMode

      console.log('getNetworkSettings', result)
      return result
    })
  }

  login(pass) {

    const data = {
      jsonrpc:"2.0",
      method:"Login",
      params: {
        UserName: "admin",
        Password: pass
      },
      id:"1.1"
    }

    return this.linkZoneRequest(data).then(res => {
      let result = {
        Token: null,
        Message: null
      }
      if(res.error)
        result.Message = res.error.message
      else
        result.Token = res.result.token

      console.log('login', result)
      return result
    })
  }

  setNetworkSettings(networkMode) {

    const data = {
      jsonrpc:"2.0",
      method:"SetNetworkSettings",
      params: {
        NetworkMode: +networkMode,
        NetselectionMode: 0
      },
      id:"4.7"
    }

    return this.linkZoneRequest(data).then(res => {
      console.log('setNetworkSettings', JSON.stringify(res))
    })
  }

  connect(){

    const data = {
      jsonrpc:"2.0",
      method:"Connect",
      id:"3.2"
    }

    return this.linkZoneRequest(data).then(res => {
      // if(res.error)
      //   return newError(res.error.message, "500")
      
      return this.sleep(5000).then(r => {
        console.log('finish connect', res)
        return res
      })

    }, err => {
      console.log('error connect', err)
    });
  }

  disconnect(){

    const data = {
      jsonrpc:"2.0",
      method:"DisConnect",
      id:"3.2"
    }

    return this.linkZoneRequest(data).then(res => {
      return this.sleep(5000).then(r => {
        console.log('finish disconnect', res)
        return res
      })
    })
  }

  getConnectionState(){

    const data = {
      jsonrpc:"2.0",
      method:"GetConnectionState",
      id:"3.1"
    }
    return this.linkZoneRequest(data).then(res => {
      const state = {
        ConnectionStatus: res?.result?.ConnectionStatus
      }
      console.log('getConnectionState', state)
      return state
    });
  }

  async setNetwork(networkMode) {
    
    return this.getConnectionState().then(res => {
      if(res.ConnectionStatus == 2){ // si esta conectado
        return this.disconnect().then(res => {
          this.setNetworkSettings(networkMode).then(res => {
              this.connect().then(res => {
                console.log('finish setNetwork')
              })
          })
        });
      }
      return this.setNetworkSettings(networkMode).then(res => {
        console.log('finish setNetwork')
      });
    })
  }

  sendUSSD(code, ussdType){
    const data = {
      jsonrpc: "2.0",
      method: "SendUSSD",
      params: {
        UssdContent: code,
        UssdType: +ussdType
      },
      id: "8.1"
    }
    return this.linkZoneRequest(data).then(res => {
      console.log('sendUSSD', res)
      return res;
    });
  }

  setUSSDEnd(code, ussdType){
    const data = {
      jsonrpc: "2.0",
      method: "SetUSSDEnd",
      id: "8.3"
    }
    return this.linkZoneRequest(data).then(res => {
      console.log('setUSSDEnd', res)
      return res;
    });
  }

  getUSSDSendResult() {

    const data = {
      jsonrpc: "2.0",
      method: "GetUSSDSendResult",
      id: "8.2"
    }

    return this.linkZoneRequest(data).then(res => {
      const result = {
        "UssdType": res?.result?.UssdType,
        "SendState": res?.result?.SendState,
        "UssdContent": res?.result?.UssdContent
      }
      console.log('getUSSDSendResult', result)
      return result
    })
  }

  sendUssdCode(code, ussdType) {
    
    return this.sendUSSD(code, ussdType).then(res => {
      return this.sleep(5000).then(res => {
        return this.getUSSDSendResult().then(res => {
          console.log('sendUssdCode', res)
          return res
        })
      })
    })
  }
}