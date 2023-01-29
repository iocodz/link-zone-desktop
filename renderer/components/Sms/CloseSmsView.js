import React, { useRouter } from "next/router";

export default function CloseSmsView() {
  const router = useRouter();
  return (
    <div className="relative flex justify-between items-center p-3 border-b border-gray-300 text-gray-800">
      <div></div>
      <svg
        onClick={() => router.push("/home")}
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 cursor-pointer rounded-full hover:bg-gray-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
}
