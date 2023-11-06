import React from 'react';
import Houses from "@/components/houses/Houses";
import {Metadata} from "next";
import {housesPageDTO} from "@/components/houses/HousesPageDTOMock";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
  description: ""
}

const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN

const getData = async () => {
  return housesPageDTO
};

export default async function Page() {
  const data = await getData()

  return (
      <>
        <Houses data={data}/>
      </>
  )
}
