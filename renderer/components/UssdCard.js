import React, {useRef, useState} from "react";
import Spinner from "./Spinner";

export default function ConectionCard({ linkZoneController }) {

  const [ussdSelectedValue, setUssdSelectedValue] = useState("")
  const [ussdValue, setUssdValue] = useState("")
  const [responseDetails, setResponseDetails] = useState("")
  const [loading, setLoading] = useState(false)
  const [ussdType, setUssdType] = useState(1)
  const [loadingCancel, setloadingCancel] = useState(false)

  function onChangeUssdValue() {
    // console.log('onchangeussd', event.target.value)
    setUssdValue(event.target.value)
  }

  function handleUssdSelect ( event ) {
    setUssdSelectedValue( event.target.value )
    setUssdValue( event.target.value )
  }

  async function handleUSSD () {
    setLoading(true)
    setResponseDetails("")
    const codeValue = ussdValue ? ussdValue : ussdSelectedValue
    const res = await linkZoneController.sendUssdCode(codeValue, ussdType)
    if(res.SendState === 2)
      setResponseDetails(res.UssdContent)
    else if(res.SendState === 3)
      setResponseDetails("Ha ocurrido un error, intente cambiando Modo de Red (3G o Auto) en las configuraciones.")
    else
      setResponseDetails("Ha ocurrido un error, intente otra vez.")
    
    setUssdValue("")
    setLoading(false)
    setUssdType(res.UssdType)
  }

  async function cancelUSSD() {
    setloadingCancel(true)
    const res = await linkZoneController.setUSSDEnd()
    setloadingCancel(false)
    setResponseDetails("")
    setUssdValue("")
  }

  return (
    <div className="rounded-lg w-72 p-4 bg-white shadow-lg dark:bg-gray-800 max-w-xs m-5">
      <p className="text-2xl leading-normal flex items-center justify-between font-bold text-black dark:text-white pt-4">
        USSD
        { (loading || loadingCancel ) && <Spinner />}
      </p>
      <ul>
        <li
          className="text-xs font-inter leading-normal flex items-center font-medium text-black dark:text-white py-4 border-t border-gray-300">
          <label className="block text-left w-full">
            <select
              className="form-select rounded-md border border-gray-300 outline-none block w-full mt-1 p-2 focus:outline-none focus:ring"
              onChange={(e) => handleUssdSelect(e) }
              value={ussdSelectedValue}
              defaultValue=''
              disabled={ loading || loadingCancel }
            >
              <option disabled value="">Seleccione una de las opciones</option>
              { linkZoneController.UssdCodes.map( ({value, label}) => {
                return <option value={value}>{label}</option>
              } ) }
            </select>
          </label>
        </li>
        <li
          className="text-xs font-inter leading-normal font-medium text-black dark:text-white py-4 border-t border-gray-300">
          <label className="text-gray-700" htmlFor="name">
            <textarea
              className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              id="comment" name="comment" rows="5" cols="40" disabled value={responseDetails}>
            </textarea>
          </label>
          <div className=" w-full">
            <input type="text" id="required-email"
             className="mt-4 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
             name="email" placeholder="Ingrese el código USSD"
             value={ussdValue}
             onChange={() => onChangeUssdValue()}
             />
            <div className="flex w-full">
              <button type="button"
                      className={(loading ? "animate-pulse" : "") + " py-2 px-4 mt-5 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "}
                      onClick={() => handleUSSD()}
                      disabled={loadingCancel || loading}
              >
                Enviar
              </button>
              <button type="button"
                      className={(loadingCancel ? "animate-pulse" : "") + "ml-1 py-2 px-4 mt-5 bg-transparent hover:bg-red-600 text-red-400 hover:text-white hover:border-red-600 border-red-400 border-2  focus:ring-red-500 focus:ring-offset-red-200 text-gray-800 border-red-200 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "}
                      onClick={() => cancelUSSD()}
                      disabled={loadingCancel || loading}
              >
                Cancelar
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}