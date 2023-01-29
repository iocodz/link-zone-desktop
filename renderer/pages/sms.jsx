import CloseSmsView from "../components/Sms/CloseSmsView";
import ContactList from "../components/Sms/ContactList";
import SmsForm from "../components/Sms/SmsForm";
import SmsList from "../components/Sms/SmsList";

export default function SmsPage() {
  return (
    <>
      <div className="bg-white container mx-auto" style={{ height: "100vh" }}>
        <div className="min-w-full h-full overflow-hidden border rounded lg:grid lg:grid-cols-3">
          <ContactList />
          <div className="hidden lg:col-span-2 lg:block">
            <div className="h-full w-full flex flex-col justify-between">
              <CloseSmsView />
              <SmsList />
              <SmsForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
