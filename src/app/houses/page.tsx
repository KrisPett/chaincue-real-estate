import React from 'react';
import Houses from "@/components/houses/Houses";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
}

export default function Page() {
  return (
      <>
        <Houses/>
      </>
  )
}
