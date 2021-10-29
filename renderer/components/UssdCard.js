import React, {useRef, useState} from "react";

export default function ConectionCard({ linkZoneController }) {

  const ussd = useRef()
  const [responseDetails, setResponseDetails] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleUSSD () {

    setLoading(true)
    const res = await linkZoneController.sendUssdCode(ussd.current.value)
    // const res = await linkZoneController.getUSSDSendResult()
    setResponseDetails(res)
    setLoading(false)
  }

  return (
    <div className="rounded-lg w-72 p-4 bg-white shadow-lg dark:bg-gray-800 max-w-xs m-5">
      <p className="text-2xl leading-normal  font-bold text-black dark:text-white pt-4">
        USSD
      </p>
      <ul>
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
             ref={ussd}/>
            <button type="button"
              className={(loading ? "animate-pulse" : "") + " py-2 px-4 mt-5 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "}
              onClick={() => handleUSSD()}
              disabled={loading}
            >
              Enviar
            </button>
          </div>
        </li>
      </ul>
    </div>
  )
}