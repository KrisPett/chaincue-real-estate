import React from "react";
import {Metadata} from "next";
import Account from "@/components/account/Account";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {HomePageDTO} from "@/components/home/HomePageDTO";
import {AccountPageDTO} from "@/components/account/AccountPageDTO";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
}

const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN

const getData = async (token: string): Promise<AccountPageDTO> => {
  return fetch(`${CLIENT_DOMAIN}/api/account`, {
    method: "GET",
    cache: "no-store",
    next: {tags: ["account"]},
    headers: {Authorization: "Bearer " + token},
  }).then(res => {
    if (res.ok) return res.json();
    return Promise.reject(res)
  }).catch(reason => {
    console.error(reason)
  });
};

export default async function Page() {
  const session = await getServerSession(authOptions)
  const data = await getData(session?.access_token ? session.access_token : "")

  return (
      <main>
        <Account data={data}/>
      </main>
  )
}
