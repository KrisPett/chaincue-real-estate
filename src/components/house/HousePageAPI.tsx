"use server"

import {HousePageDTO} from "@/components/house/HousePageDTO";

const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN

export const getData = async (houseId: string): Promise<HousePageDTO> => {
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
