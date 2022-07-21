import { useState } from "react";
import { DEFAULT_LINKZONE_URL } from "../../config";
import Modal from "../Modal";

export default function NetworkSettings() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(DEFAULT_LINKZONE_URL);

  const toggleModal = () => {
    setOpen(!open);
  }

  const handleSave = () => {
    linkZoneController.setLinkZoneUrl(url);
    setOpen(false);
  }

  return (
    <>
      <Modal open={open} onCancel={toggleModal} onSave={() => handleSave()}>
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
            Configura tu conexión
          </h3>
          <div className="mt-2">
            <label className="text-sm text-gray-500 flex">
              Dirección IP
            </label>
            <input type="text" className="p-2 mt-3 rounded border-2 border-gray-400 text-gray-800" placeholder="Dirección IP" value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
        </div>
      </Modal>
      <button className="absolute top-5 right-5" onClick={toggleModal}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </>
  )
}