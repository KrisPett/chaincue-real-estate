import {ReactNode} from "react";
import {getServerSession} from "next-auth";
import SessionProvider from "./SessionProvider"
import QueryClientWrapper from "@/utilities/QueryClientWrapper";

export default async function Providers({children}: { children: ReactNode }) {
  const session = await getServerSession();
  return (
      <SessionProvider session={session} refetchInterval={300}>
        <QueryClientWrapper>
          {children}
        </QueryClientWrapper>
      </SessionProvider>
  );
}
