import { useState } from "react";
import { useContact } from "../../hooks/useContact";
import { useSms } from "../../hooks/useSms";
import LinkZone from "../../LinkZone";
import SendIcon from "../UI/SendIcon";
import Spinner from "../UI/Spinner";

export default function SmsForm() {
  const [contact, changeContact] = useSms();
  const [contacts] = useContact();
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmitSms = async (e) => {
    e.preventDefault();
    if(!text) return;

    setSending(true);
    
    const linkZone = new LinkZone();
    const phone = contacts.SmsList.find(
      (item) => item.ContactId === contact
    ).PhoneNumber;
    
    await linkZone.sendSms(text, phone);

    setSending(false);
    
    changeContact(contact);
    setText("");
  };

  return (
    <form onSubmit={handleSubmitSms} className="flex items-center justify-between w-full p-3 border-t border-gray-300">
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Message"
        className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
        name="message"
        required
      />
      <button type="submit">
        {sending ? <Spinner /> : <SendIcon />}
      </button>
    </form>
  );
}
