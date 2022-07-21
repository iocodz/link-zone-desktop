import { useState } from "react";
import Modal from "../Modal";

export default function AboutAndDonations() {
    const [open, setOpen] = useState(false);
  
    const toggleModal = () => {
      setOpen(!open);
    }
  
    return (
      <>
        <Modal open={open} onCancel={toggleModal} onSave={() => handleSave()}>
          Hola Mundo
        </Modal>
        <button className="absolute top-5 right-12" onClick={toggleModal}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
      </>
    )
  }