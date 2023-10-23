import React from "react";
import Settings from "@/components/settings/Settings";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
}

export default function Page() {
  return (
      <main className="flex">
        <Settings/>
      </main>
  )
}
