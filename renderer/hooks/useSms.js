import { useEffect, useState } from "react";

const def = {
  Page: 0,
  TotalPageCount: 1,
  PhoneNumber: "LinkZone SMS",
  SmsList: [
    {
      SmsId: 1,
      SmsContent: "Selecciona un chat para empezar...",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    }
  ]
}

export function useSms(linkZoneController) {
  const [sms, setSms] = useState(def)
  const [page, setPage] = useState(0)
  const [contact, setContact] = useState(null)

  async function getSms(changedContact = false) {
    if(!contact) return;
    const data = await linkZoneController.getSmsContentList(page, contact);
    if(sms === def) setSms(data)
    else {
      let newData = data;
      newData.SmsList = changedContact ? data.SmsList : [...sms.SmsList, ...data.SmsList];
      setSms(newData)
    }
  }

  async function changeContact(contactId) {
    setPage(0)
    setContact(null)
    setContact(contactId)
  }

  async function fetchSmsNextPage() {
    if (page + 1 >= sms.TotalPageCount) return;
    setPage(page + 1)
  }

  useEffect(() => {
    getSms()
  }, [page])

  useEffect(() => {
    setPage(0);
    getSms(true);
  }, [contact])

  return [sms, changeContact, fetchSmsNextPage];
}