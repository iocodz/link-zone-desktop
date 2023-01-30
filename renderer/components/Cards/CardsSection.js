import ConnectionCard from "./ConnectionCard";
import UssdCard from "./UssdCard";
import { useRouter } from "next/router";
import { useSmsStatus } from "../../hooks/useSmsStatus";

export default function CardsSection({ linkZone }) {
  const router = new useRouter();
  const [unread] = useSmsStatus();

  return (
    <div className="w-full flex flex-wrap justify-center items-center min-h-screen">
      <ConnectionCard linkZoneController={linkZone} />
      <UssdCard linkZoneController={linkZone} />
      <button
        className="absolute top-5 right-20"
        onClick={() => router.push("/sms")}
      >
        {unread && (
          <span className="absolute -top-2 inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {unread}
          </span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-800 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
          />
        </svg>
      </button>
    </div>
  );
}
