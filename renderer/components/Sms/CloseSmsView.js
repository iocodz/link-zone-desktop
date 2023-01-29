import React, { useRouter } from "next/router";
import CloseIcon from "../UI/CloseIcon";

export default function CloseSmsView() {
  const router = useRouter();
  return (
    <div className="relative flex justify-between items-center p-3 border-b border-gray-300 text-gray-800">
      <div></div>
      <button onClick={() => router.push("/home")}>
        <CloseIcon />
      </button>
    </div>
  );
}
