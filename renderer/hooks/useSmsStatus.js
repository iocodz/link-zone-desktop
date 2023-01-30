import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import LinkZone from "../LinkZone";

const Context = createContext();

export function SmsStatusProvider({ children }) {
  const linkZoneController = new LinkZone();
  const [runningCronJob, setRunningCronJob] = useState(true);
  const [unread, setUnread] = useState(null);
  const [notificationClicked, setNotificationClicked] = useState(false);
  const router = useRouter();

  const refreshData = async () => {
    const { UnreadSMSCount } = await linkZoneController.getSmsStorageState();
    setUnread(UnreadSMSCount);
    localStorage.setItem("unreadSms", UnreadSMSCount);

    if (UnreadSMSCount > unread) {
      let myNotification = new Notification("Tiene mensajes nuevos", {
        body: "Haga click para verlos.",
      });

      myNotification.onclick = () => {
        setNotificationClicked(true);
      };
    }
  };

  const handleFirstRender = () => {
    try {
      const unreadSms = localStorage.getItem("unreadSms");
      if (unread && unread >= 0) {
        setUnread(unreadSms);
      }
    } catch (e) {
      localStorage.setItem("unreadSms", 0);
    }
  };

  useEffect(() => {
    if (notificationClicked) {
      router.push("/sms");
      setNotificationClicked(false);
    }
  }, [notificationClicked]);

  useEffect(() => {
    handleFirstRender();

    refreshData();
    const timer = setInterval(() => {
      if (runningCronJob) refreshData();
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Context.Provider
      value={[unread, notificationClicked, setNotificationClicked]}
    >
      {children}
    </Context.Provider>
  );
}

export function useSmsStatus() {
  return useContext(Context);
}
