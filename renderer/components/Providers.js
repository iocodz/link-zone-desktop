import { ConectionProvider } from "../hooks/useConnection";
import { ContactProvider } from "../hooks/useContact";
import { SmsProvider } from "../hooks/useSms";
import { SmsStatusProvider, useSmsStatus } from "../hooks/useSmsStatus";

export default function Providers({ children }) {
  return (
    <SmsStatusProvider>
      <ConectionProvider>
        <ContactProvider>
          <SmsProvider>{children}</SmsProvider>
        </ContactProvider>
      </ConectionProvider>
    </SmsStatusProvider>
  );
}
