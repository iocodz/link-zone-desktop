import { createContext, useContext, useEffect, useState } from "react";
import LinkZone from "../LinkZone";

const Context = createContext();

export function ContactProvider({ children }) {
  const linkZoneController = new LinkZone()
  const [contact, setContact] = useState([])
  const [page, setPage] = useState(0)

  async function getContact() {
    
    if (!linkZoneController) return;

    const data = await linkZoneController.getSmsList(page);
    if (contact.TotalPageCount) {
      const newContacts = data;
      newContacts.SmsList = [...contact.SmsList, ...data.SmsList]
      console.log(newContacts.SmsList.length)
      setContact(newContacts)
    } else {
      setContact(data)
    }
  }

  async function fetchContactNextPage() {
    if (page + 1 >= contact.TotalPageCount) return;
    setPage(page + 1)
  }

  async function getUnread() {
    const unreadMessages = contact.SmsList.reduce((acc, obj) => acc + obj.UnreadCount, 0)
    return unreadMessages
  }

  useEffect(async () => {
    getContact()
  }, []);

  useEffect(async () => {
    getContact()
  }, [page]);

  return <Context.Provider value={[contact, fetchContactNextPage, getUnread]}>{children}</Context.Provider>;
}

export function useContact() {
  return useContext(Context);
}