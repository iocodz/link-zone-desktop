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

  async function getSms(changedContact = false) {
    if(!contact) return;
    let data = await linkZoneController.getSmsContentList(page, contact);
    if(sms === def) {
      data.SmsList = data.SmsList.sort((a, b) => {
        return new Date(a.SmdId) - new Date(b.SmdId);
      })
      setSms(data)
    }
    else {
      let newData = data;
      newData.SmsList = changedContact ? data.SmsList : [...sms.SmsList, ...data.SmsList];
      newData.SmsList = newData.SmsList.sort((a, b) => {
        return new Date(a.SmdId) - new Date(b.SmdId);
      })
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