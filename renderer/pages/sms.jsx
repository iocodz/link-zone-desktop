import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useContact } from "../hooks/useContact"
import { useSms } from "../hooks/useSms"
import LinkZone from "../types/LinkZone"

export default function SmsRead() {
  const linkZone = new LinkZone()

  const router = useRouter()
  const [contacts, fetchContactNextPage] = useContact(linkZone)
  const [sms, changeContact, fetchSmsNextPage] = useSms(linkZone)

  const [contactId, setContactId] = useState(null);

  const handleContactChange = (i) => {
    setContactId(i)
    changeContact(i)
  }

  const contactsRef = useRef();

  const onScrollContacts = () => {
    if (contactsRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contactsRef.current;
      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        fetchContactNextPage()
      }
    }
  };

  const smsRef = useRef();

  const onScrollMessages = () => {
    if (smsRef.current) {
      const { scrollTop } = smsRef.current;
      if (scrollTop <=1) {
        fetchSmsNextPage()
      }
    }
  };

  useEffect(() => {
    if(smsRef.current)
      smsRef.current.scrollTo(0, smsRef.current.scrollHeight, "auto");
  }, [sms])

  return (
    <>
      <div className="bg-white container mx-auto" style={{ height: '100vh' }}>
        <div className="min-w-full h-full overflow-hidden border rounded lg:grid lg:grid-cols-3">
          <div className="border-r border-gray-300 lg:col-span-1">
            <ul className="overflow-auto h-[32rem]">
              <li className="overflow-y-scroll" ref={contactsRef} onScroll={() => onScrollContacts()} style={{ height: '100vh' }}>
                {contacts?.SmsList?.map(({ContactId, LastSmsDate, LastSmsPreview, PhoneNumber, TotalCount, UnreadCount}, i) => 
                  <a 
                    onClick={() => handleContactChange(ContactId)} 
                    className={`flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none ${contactId == ContactId ? 'bg-gray-100' : ''}`}
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
                      <span className="block ml-2 text-sm text-gray-600">{LastSmsPreview}</span>
                    </div>
                  </a>
                )}
              </li>
            </ul>
          </div>
          <div className="hidden lg:col-span-2 lg:block">
            <div className="h-full w-full flex flex-col justify-between">
              <div className="relative flex justify-between items-center p-3 border-b border-gray-300 text-gray-800">
                <div></div>
                <svg onClick={() => router.push('/home')} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer rounded-full hover:bg-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="relative w-full p-6 overflow-y-scroll h-[40rem]" ref={smsRef} onScroll={() => onScrollMessages()} style={{ height: '70vh' }}>
                {sms && <ul className="space-y-2">                  
                  {sms?.SmsList?.map(({SmsId, SmsContent, SmsDate, SmsType}) => <li className={SmsType === 1 ? "flex justify-start" : "flex justify-end"}>
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow bg-gray-100">
                        <span className="block">
                          {SmsContent}
                        </span>
                        <span className="text-sm text-gray-400">{SmsDate}</span>
                      </div>
                    </li>
                  )}
                </ul>}
              </div>
              <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <input
                  type="text"
                  placeholder="Message"
                  className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  name="message"
                  required=""
                />
                <button type="submit">
                  <svg
                    className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}