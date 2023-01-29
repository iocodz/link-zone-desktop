import React, { useState } from "react";
import Autocomplete from "../Autocomplete";
import Spinner from "../UI/Spinner";

const USSD_AUTOCOMPLETE_PLACEHOLDER = 'Ingrese su código USSD';
const DEFAULT_USSD = {value: '', label: USSD_AUTOCOMPLETE_PLACEHOLDER}

export default function UssdCard({ linkZoneController }) {

  const [ussdSelectedValue, setUssdSelectedValue] = useState("")
  const [ussdValue, setUssdValue] = useState(DEFAULT_USSD)
  const [responseDetails, setResponseDetails] = useState("")
  const [loading, setLoading] = useState(false)
  const [ussdType, setUssdType] = useState(1)
  const [loadingCancel, setloadingCancel] = useState(false)
  
  function onChangeUssdValue(newValue) {

    const mappedValue = linkZoneController.UssdCodes.filter(({value, label}) => value === newValue)
    
    if(mappedValue.length === 0)
      return setUssdValue({
        value: newValue,
        label: newValue ? 'Código USSD desconocido' : USSD_AUTOCOMPLETE_PLACEHOLDER
      })
    
    setUssdValue(mappedValue[0])
  }

  async function handleUSSD() {
    setLoading(true)
    setResponseDetails("")
    const codeValue = ussdValue.value ? ussdValue.value : ussdSelectedValue
    const res = await linkZoneController.sendUssdCode(codeValue, ussdType)
    if (res.SendState === 2)
      setResponseDetails(res.UssdContent)
    else if (res.SendState === 3)
      setResponseDetails("Ha ocurrido un error, intente cambiando Modo de Red (3G o Auto) en las configuraciones.")
    else
      setResponseDetails("Ha ocurrido un error, intente otra vez.")

    setUssdValue(DEFAULT_USSD)
    setLoading(false)
    setUssdType(res.UssdType)
  }

  async function cancelUSSD() {
    setloadingCancel(true)
    const res = await linkZoneController.setUSSDEnd()
    setloadingCancel(false)
    setResponseDetails("")
    setUssdValue(DEFAULT_USSD)
  }

  return (
    <div className="rounded-lg w-72 p-4 bg-white shadow-lg dark:bg-gray-800 max-w-xs m-5">
      <p className="text-2xl leading-normal flex items-center justify-between font-bold text-black dark:text-white pt-4">
        USSD
        {(loading || loadingCancel) && <Spinner />}
      </p>
      <ul>
        <li
          className="text-xs font-inter leading-normal font-medium text-black dark:text-white py-4 border-t border-gray-300">
          <label className="text-gray-700" htmlFor="name">
            <textarea
              placeholder="La respuesta a su código USSD aparecerá aquí."
              className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              id="comment" name="comment" rows="5" cols="40" disabled value={responseDetails}>
            </textarea>
          </label>
          <div className=" w-full">
            <div className="mt-3"></div>
            <Autocomplete options={linkZoneController.UssdCodes} 
              value={ussdValue?.value || ""}
              placeholder={USSD_AUTOCOMPLETE_PLACEHOLDER}
              onChange={onChangeUssdValue}
            />
            <p className="text-xs text-gray-500 mt-3">
              {ussdValue?.label}
            </p>
            <div className="flex w-full">
              <button type="button"
                className={(loading ? "animate-pulse" : "") + " py-2 px-4 mt-3 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "}
                onClick={() => handleUSSD()}
                disabled={loadingCancel || loading}
              >
                Ejecutar
              </button>
              <button type="button"
                className={(loadingCancel ? "animate-pulse" : "") + "ml-1 py-2 px-4 mt-3 bg-transparent hover:bg-red-600 text-red-400 hover:text-white hover:border-red-600 border-red-400 border-2  focus:ring-red-500 focus:ring-offset-red-200 text-gray-800 border-red-200 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "}
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