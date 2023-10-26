import React from 'react';
import {Metadata} from "next";
import HouseView from "@/components/house/HouseView";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
}

export default function Page() {
  return (
      <>
        <HouseView/>
      </>
  )
}
