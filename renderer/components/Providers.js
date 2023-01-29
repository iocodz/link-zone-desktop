import { ContactProvider } from "../hooks/useContact";
import { SmsProvider } from "../hooks/useSms";

export default function Providers({ children }) {
  return (
    <ContactProvider>
      <SmsProvider>{children}</SmsProvider>
    </ContactProvider>
  );
}
