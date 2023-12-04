"use server"
import {AccountPageDTO} from "@/components/account/AccountPageDTO";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN

export const getData = async (): Promise<AccountPageDTO> => {
  const session = await getServerSession(authOptions)
  const token = session?.access_token ? session.access_token : undefined;
  if (!token) {
    console.error("No access token found")
    return Promise.reject("No access token found")
  }
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
