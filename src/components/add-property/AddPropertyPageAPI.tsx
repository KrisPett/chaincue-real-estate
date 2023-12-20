"use server"


import {CreatePropertyReqBody} from "@/components/add-property/AddPropertyPageDTO";

const BACKEND_URL_ENDPOINT = process.env.BACKEND_URL_ENDPOINT
const requestMapping = "user/add-property"

export const fetchCreateProperty = async (token: string | undefined, reqBody: CreatePropertyReqBody): Promise<string> => {
  if (!token) {
    throw Error("No access token found")
  }
  return fetch(`${BACKEND_URL_ENDPOINT}/${requestMapping}`, {
    method: "POST",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
    body: JSON.stringify(reqBody),
    cache: "no-store",
    next: {tags: ["add-property"]},
  }).then(res => {
    if (res.ok) return res.json();
    return Promise.reject(res)
  }).catch(reason => {
    console.error(reason)
  });
};
