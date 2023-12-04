import React from 'react';
import {Metadata} from "next";
import House from "@/components/house/House";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
}

export default async function Page({params}: { params: { id: string } }) {
  return (
      <>
        <House id={params.id}/>
      </>
  )
}
