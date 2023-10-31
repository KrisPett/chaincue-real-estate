import React from 'react';
import {Metadata} from "next";
import House from "@/components/house/House";
import {housePageDTO} from "@/components/house/HousePageDTOMock";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
}

const getData = async () => {
  return housePageDTO
};

export default async function Page() {
  const data = await getData()
  return (
      <>
        <House data={data}/>
      </>
  )
}
