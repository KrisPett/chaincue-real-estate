"use server"
import {HousesPageDTO} from "@/components/houses/HousesPageDTO";

const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN

export const getData = async (): Promise<HousesPageDTO> => {
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
