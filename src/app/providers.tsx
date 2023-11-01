import {ReactNode} from "react";
import {getServerSession} from "next-auth";
import SessionProvider from "./SessionProvider"

export default async function Providers({children}: { children: ReactNode }) {
  const session = await getServerSession();
  return (
      <SessionProvider session={session} refetchInterval={300}>
        {children}
      </SessionProvider>
  );
}
