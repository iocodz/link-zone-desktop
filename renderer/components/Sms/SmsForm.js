import { useState } from "react";
import { useContact } from "../../hooks/useContact";
import { useSms } from "../../hooks/useSms";
import LinkZone from "../../LinkZone";

export default function SmsForm() {
  const [contact, changeContact] = useSms();
  const [contacts] = useContact();
  const [text, setText] = useState("");

  const handleSubmitSms = async () => {
    if(!text) return;
    
    const linkZone = new LinkZone();
    const phone = contacts.SmsList.find(
      (item) => item.ContactId === contact
    ).PhoneNumber;
    
    await linkZone.sendSms(text, phone);
    
    changeContact(contact);
    setText("");
  };

  return (
    <form className="flex items-center justify-between w-full p-3 border-t border-gray-300">
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Message"
        className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
        name="message"
        required
      />
      <button type="submit" onClick={handleSubmitSms}>
        <svg
          className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </form>
  );
}
