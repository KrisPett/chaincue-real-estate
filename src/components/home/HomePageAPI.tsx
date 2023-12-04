"use server"

import {HomePageDTO} from "@/components/home/HomePageDTO";

const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN

export const getData = async (): Promise<HomePageDTO> => {
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
