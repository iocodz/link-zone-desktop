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

const example = {
  Page: 0,
  TotalPageCount: 1,
  PhoneNumber: "+5353600325",
  SmsList: [
    {
      SmsId: 1,
      SmsContent: "Hola como estas, esto es una prueba, gracias...",
      SmsDate: "21-07-2021 10:00:00",
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    },
    {
      SmsId: 1,
      SmsContent: "Gracias por usar la aplicación.",
      SmsDate: new Date().toLocaleString(),
    }
  ]
};

export function useSms(linkZoneController) {
  const [sms, setSms] = useState(def)
  const [page, setPage] = useState(0)
  const [contact, setContact] = useState(null)

  async function getSms() {
    if(!contact) return;
    const data = await linkZoneController.getSmsContentList(page, contact);
    setSms(data)
  }

  async function changeContact(contactId) {
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