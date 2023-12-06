import React from 'react';
import Houses from "@/components/houses/Houses";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
  description: ""
}

export default async function Page() {

  return (
      <>
        <Houses/>
      </>
  )
}
