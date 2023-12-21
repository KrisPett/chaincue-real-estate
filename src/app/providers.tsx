import {ReactNode} from "react";
import {getServerSession} from "next-auth";
import SessionProvider from "./SessionProvider"
import QueryClientWrapper from "@/utilities/QueryClientWrapper";
import {Web3ModalProvider} from "@/utilities/Web3Modal";

export default async function Providers({children}: { children: ReactNode }) {
  const session = await getServerSession();
  return (
      <SessionProvider session={session} refetchInterval={300}>
        <QueryClientWrapper>
          <Web3ModalProvider>
            {children}
          </Web3ModalProvider>
        </QueryClientWrapper>
      </SessionProvider>
  );
}
