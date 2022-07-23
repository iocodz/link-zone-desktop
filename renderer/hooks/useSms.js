import { useEffect, useState } from "react";

const def = {
  Page: 0,
  TotalPageCount: 1,
  PhoneNumber: "LinkZone SMS",
  SmsList: [
    {
      SmsId: 1,
      SmsContent: "Selecciona un chat para empezar...",
      SmsDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    }
  ]
}

export function useSms(linkZoneController) {
  const [sms, setSms] = useState(def)
  const [page, setPage] = useState(0)
  const [contact, setContact] = useState(null)

  async function getSms() {
    if(!contact) return;
    const data = await linkZoneController.getSmsContentList(page, contact);
    if(sms === def) setSms(data)
    else {
      const newData = data;
      newData.SmsList.push(sms.SmsList)
      setSms(newData)
    }
  }

  async function changeContact(contactId) {
    setPage(0)
    setContact(null)
    setContact(contactId)
  }

  async function fetchSmsNextPage() {
    if (page + 1 === contact.TotalPageCount) return;
    setPage(page + 1)
  }

  useEffect(() => {
    getSms()
  }, [contact, page])

  return [sms, changeContact, fetchSmsNextPage];
}