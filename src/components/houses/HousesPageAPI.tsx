"use server"
import {FilterSearchReqBody, House, HousesPageDTO} from "@/components/houses/HousesPageDTO";

const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN
const BACKEND_URL_ENDPOINT = process.env.BACKEND_URL_ENDPOINT

export const getData = async (): Promise<HousesPageDTO> => {
  return fetch(`${CLIENT_DOMAIN}/api/houses`, {
    method: "GET",
    cache: "no-store",
    next: {tags: ["houses"]},
  }).then(res => {
    if (res.ok) return res.json();
    return Promise.reject(res)
  }).catch(reason => {
    console.error(reason)
  });
};

export const fetchSearchHouses = async (reqBody: FilterSearchReqBody): Promise<House[]> => {
  return fetch(`${BACKEND_URL_ENDPOINT}/houses`, {
    method: "PUT",
    cache: "no-store",
    next: {tags: ["search-houses"]},
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(reqBody)
  }).then(res => {
    if (res.ok) return res.json();
    return Promise.reject(res)
  }).catch(reason => {
    console.error(reason)
  });
};
