import React, { useEffect, useRef } from "react";
import { useSms } from "../../hooks/useSms";

export default function SmsList() {
  const [sms, fetchSmsNextPage] = useSms();

  const smsRef = useRef();

  const onScrollMessages = () => {
    if (smsRef.current) {
      const { scrollTop } = smsRef.current;
      if (scrollTop <= 1) {
        fetchSmsNextPage();
      }
    }
  };

  useEffect(() => {
    if (smsRef.current)
      smsRef.current.scrollTo(0, smsRef.current.scrollHeight, "auto");
  }, [sms]);

  return (
    <div
      className="relative w-full p-6 overflow-y-scroll h-[40rem]"
      ref={smsRef}
      onScroll={() => onScrollMessages()}
      style={{ height: "70vh" }}
    >
      {sms && (
        <ul className="space-y-2">
          {sms?.SmsList?.map(({ SmsId, SmsContent, SmsDate, SmsType }) => (
            <li
              key={SmsId}
              className={
                SmsType === "1" ? "flex justify-start" : "flex justify-end"
              }
            >
              <div
                className={`bg-${
                  SmsType === "1" ? "gray" : "green"
                }-100 relative max-w-xl px-4 py-2 text-gray-700 rounded shadow`}
              >
                <span className="block">{SmsContent}</span>
                <span className="text-sm text-gray-400">{SmsDate}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
