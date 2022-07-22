import { useState } from "react";
import Modal from "../Modal";

export default function AboutAndDonations() {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  }

  return (
    <>
      <Modal open={open} onCancel={toggleModal}>
        <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
            Acerca de
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-1">
              📡 App de escritorio para manejar fácilmente el Alcatel Link Zone de la infame Etecsa.
            </p>
            <p className="text-sm text-gray-500 mb-1">
              💻 Este programa es completamente open source, revisa el repo:
              <a
                className="text-blue-600 font-bold ml-1 cursor-pointer underline"
                onClick={() => require('electron').shell.openExternal("https://github.com/raulcr98/link-zone-desktop")}
              >GitHub</a>
            </p>
          </div>
        </div>
      </Modal>
      <button className="absolute top-5 right-12" onClick={toggleModal}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>
    </>
  )
}