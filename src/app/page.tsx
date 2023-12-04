import HomePage from "@/components/home/HomePage";
import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
  description: ""
}

export default async function Page() {
  return (
      <>
        <HomePage/>
      </>
  )
}
