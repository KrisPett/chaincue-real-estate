import React from 'react';
import Houses from "@/components/houses/Houses";
import {Metadata} from "next";
import {housesPageDTO} from "@/components/houses/HousesPageDTOMock";
import {HousesPageDTO} from "@/components/houses/HousesPageDTO";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
  description: ""
}

const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN

const getData = async (): Promise<HousesPageDTO> => {
  return fetch(`${CLIENT_DOMAIN}/api/houses`, {
    method: "GET",
    cache: "no-store",
    next: {tags: ["houses"]},
    // headers: {Authorization: "Bearer " + token},
  }).then(res => {
    if (res.ok) return res.json();
    return Promise.reject(res)
  }).catch(reason => {
    console.error(reason)
  });
};

export default async function Page() {
  const data = await getData()

  return (
      <>
        <Houses data={data ? data : housesPageDTO}/>
      </>
  )
}
