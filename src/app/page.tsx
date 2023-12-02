import HomePage from "@/components/home/HomePage";
import {Metadata} from "next";
import {homePageDTOlMock} from "@/components/home/HomePageDTOlMock";
import {HomePageDTO} from "@/components/home/HomePageDTO";
import React, {Suspense, useEffect, useState} from "react";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
  description: ""
}

const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN

const getData = async (): Promise<HomePageDTO> => {
  return fetch(`${CLIENT_DOMAIN}/api/home`, {
    method: "GET",
    cache: "no-store",
    next: {tags: ["home"]},
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
        <HomePage data={data ? data : homePageDTOlMock}/>
      </>
  )
}
