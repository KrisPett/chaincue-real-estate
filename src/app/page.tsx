import HomePage from "@/components/home/HomePage";
import {Metadata} from "next";
import {homePageDTOlMock} from "@/components/home/HomePageDTOlMock";
import {HomePageDTO} from "@/components/home/HomePageDTO";
import React, {Suspense, useEffect, useState} from "react";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
  description: ""
}

export default async function Page() {
  return (
      <>
        <HomePage/>
      </>
  )
}
