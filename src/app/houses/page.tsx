import React from 'react';
import HousesView from "@/components/houses/HousesView";
import {Metadata} from "next";
import {HomeViewModelMock} from "@/components/houses/HousesViewModelMock";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
  description: ""
}

const getData = async () => {
  return HomeViewModelMock
};

export default async function Page() {
  const data = await getData()

  return (
      <>
        <HousesView data={data}/>
      </>
  )
}
