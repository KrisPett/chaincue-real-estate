import React from 'react';
import {Metadata} from "next";
import House from "@/components/house/House";
import {HousePageDTO} from "@/components/house/HousePageDTO";
import {housePageDTO} from "@/components/house/HousePageDTOMock";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
}

const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN

const getData = async (houseId: string): Promise<HousePageDTO> => {
  return fetch(`${CLIENT_DOMAIN}/api/house/${houseId}`, {
    method: "GET",
    cache: "no-store",
    next: {tags: ["house"]},
  }).then(res => {
    if (res.ok) return res.json();
    return Promise.reject(res)
  }).catch(reason => {
    console.error(reason)
  });
};

export default async function Page({params}: { params: { id: string } }) {
  const data = await getData(params.id)
  return (
      <>
        <House data={data ? data : housePageDTO}/>
      </>
  )
}
