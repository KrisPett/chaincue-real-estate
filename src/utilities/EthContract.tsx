"use server"

import {ethers} from "ethers";
import process from "process";

const ABI = process.env.NEXT_PUBLIC_ABI
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
const NETWORK = process.env.NETWORK
const INFURA_API_KEY = process.env.INFURA_API_KEY

export const readIntegerValue = async (): Promise<any> => {
  const provider = new ethers.InfuraProvider(NETWORK, INFURA_API_KEY);
  try {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    return await contract.getIntegerValue().then(value => value.toString());
  } catch (error) {
    console.error('Error reading integer value:', error);
  }
};
