import React from "react";
import {Metadata} from "next";
import Account from "@/components/account/Account";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
}

export default function Page() {
  return (
      <main>
        <Account/>
      </main>
  )
}
