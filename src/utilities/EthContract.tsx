"use server"

import {ethers} from "ethers";
import process from "process";

const ABI = "[{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"int256\",\"name\":\"oldValue\",\"type\":\"int256\"},{\"indexed\":false,\"internalType\":\"int256\",\"name\":\"newValue\",\"type\":\"int256\"}],\"name\":\"ValueChanged\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"int256\",\"name\":\"_amount\",\"type\":\"int256\"}],\"name\":\"decreaseValue\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getIntegerValue\",\"outputs\":[{\"internalType\":\"int256\",\"name\":\"\",\"type\":\"int256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"int256\",\"name\":\"_amount\",\"type\":\"int256\"}],\"name\":\"increaseValue\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"integerValue\",\"outputs\":[{\"internalType\":\"int256\",\"name\":\"\",\"type\":\"int256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]"

const CONTRACT_ADDRESS=  process.env.CONTRACT_ADDRESS
const NETWORK=  process.env.NETWORK
const INFURA_API_KEY=  process.env.INFURA_API_KEY
const WALLET_PRIVATE_KEY=  process.env.WALLET_PRIVATE_KEY

export const readIntegerValue = async  (): Promise<any> => {
  const provider = new ethers.InfuraProvider(NETWORK, INFURA_API_KEY);
  try {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    return await contract.getIntegerValue().then(value => value.toString());
  } catch (error) {
    console.error('Error reading integer value:', error);
  }
};

export const increaseValue = async (amount: number) => {
  const provider = new ethers.InfuraProvider(NETWORK, INFURA_API_KEY);
  const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
  try {
    const tx = await contract.increaseValue(amount);
    await tx.wait();
    console.log('Transaction successful:', tx);
  } catch (error) {
    console.error('Error increasing integer value:', error);
  }
};

export const decreaseValue = async (amount: number) => {
  const provider = new ethers.InfuraProvider(NETWORK, INFURA_API_KEY);
  const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
  try {
    const tx = await contract.decreaseValue(amount);
    await tx.wait();
    console.log('Transaction successful:', tx);
  } catch (error) {
    console.error('Error increasing integer value:', error);
  }
};
