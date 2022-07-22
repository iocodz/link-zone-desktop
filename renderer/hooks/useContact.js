import { useEffect, useState } from "react";

const example = {
  Page: 0,
  TotalPageCount: 1,
  SmsList: [
    {
      ContactId: 1,
      PhoneNumber: "+5353600325",
      LastSmsDate: "21-07-2021 10:00:00",
      LastSmsPreview: "Hola como estas, esto es una prueba, gracias...",
      TotalCount: 10,
      UnreadCount: 0
    }
  ]
};

export function useContact(linkZoneController) {
  const [contact, setContact] = useState([])
  const [page, setPage] = useState(0)

  async function getContact() {
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
    if (page + 1 === contact.TotalPageCount) return;
    setPage(page + 1)
  }

  useEffect(async () => {
    getContact()
  }, []);

  useEffect(async () => {
    getContact()
  }, [page]);

  return [contact, fetchContactNextPage];
}