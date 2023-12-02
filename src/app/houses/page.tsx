import React from 'react';
import Houses from "@/components/houses/Houses";
import {Metadata} from "next";
import {housesPageDTO} from "@/components/houses/HousesPageDTOMock";
import {getData} from "@/components/houses/HousesPageAPI";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
  description: ""
}


export default async function Page() {
  console.log("Page")
  // const data = getData()
  return (
      <>
        <Houses/>
      </>
  )
}
