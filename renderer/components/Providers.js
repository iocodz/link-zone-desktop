import { ConectionProvider } from "../hooks/useConnection";
import { ContactProvider } from "../hooks/useContact";
import { SmsProvider } from "../hooks/useSms";

export default function Providers({ children }) {
  return (
    <ConectionProvider>
      <ContactProvider>
        <SmsProvider>{children}</SmsProvider>
      </ContactProvider>
    </ConectionProvider>
  );
}
