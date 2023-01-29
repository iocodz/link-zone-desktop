import React, { useRef } from "react";
import { useContact } from "../../hooks/useContact";
import { useSms } from "../../hooks/useSms";

export default function ContactList() {
  const [contacts, fetchContactNextPage, contact] = useContact();
  const [changeContact] = useSms();
  
  const contactsRef = useRef();

  const handleContactChange = (i) => {
    changeContact(i);
  };

  const onScrollContacts = () => {
    if (contactsRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contactsRef.current;
      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        fetchContactNextPage();
      }
    }
  };

  return (
    <div className="border-r border-gray-300 lg:col-span-1">
      <ul className="overflow-auto h-[32rem]">
        <li
          className="overflow-y-scroll"
          ref={contactsRef}
          onScroll={() => onScrollContacts()}
          style={{ height: "100vh" }}
        >
          {contacts?.SmsList?.map(
            ({ ContactId, LastSmsDate, LastSmsPreview, PhoneNumber }, i) => (
              <a
                onClick={() => handleContactChange(ContactId)}
                className={`flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none ${
                  contact == ContactId ? "bg-gray-100" : ""
                }`}
              >
                <div className="w-full pb-2 pt-2">
                  <div className="flex justify-between">
                    <span className="block ml-2 font-semibold text-gray-600">
                      {PhoneNumber}
                    </span>
                    <span className="block ml-2 text-sm text-gray-600">
                      {LastSmsDate}
                    </span>
                  </div>
                  <span className="block ml-2 text-sm text-gray-600">
                    {LastSmsPreview}
                  </span>
                </div>
              </a>
            )
          )}
        </li>
      </ul>
    </div>
  );
}
