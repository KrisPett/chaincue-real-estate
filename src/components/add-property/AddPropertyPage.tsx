"use client"

import React, {useState} from 'react';
import Button from "@/lib/Button";
import {useRouter} from "next/navigation";
import Textfield from "@/lib/Textfield";
import TextfieldMulti from "@/lib/TextfieldMulti";
import Dropzone from "react-dropzone";
import {signIn, useSession} from "next-auth/react";
import MintModal from "@/components/add-property/components/MintModal";
import {CreatePropertyReqBody} from "@/components/add-property/AddPropertyPageDTO";
import {fetchCreateProperty} from "@/components/add-property/AddPropertyPageAPI";
import {ethers} from "ethers";
import {useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider} from '@web3modal/ethers/react'
import Button5 from "@/lib/Button5";

const NEXT_PUBLIC_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
const NEXT_PUBLIC_ABI = process.env.NEXT_PUBLIC_ABI

const AddPropertyPage = () => {
  const {data: session} = useSession();
  const router = useRouter();
  const {open} = useWeb3Modal()
  const {address, chainId, isConnected} = useWeb3ModalAccount()
  const {walletProvider} = useWeb3ModalProvider()

  const [title, setTitle] = useState<string>("");
  const [supply, setSupply] = useState<string>("1");
  const [description, setDescription] = useState<string>("");
  const [openOnCreateModal, setOpenOnCreateModal] = useState(false)
  const [isConnectedToDecentralizedNetwork, setIsConnectedToDecentralizedNetwork] = useState<boolean>(false);
  const [isTransactionApprovedFromWallet, setIsTransactionApprovedFromWallet] = useState<boolean>(false);
  const [isTransactionError, setIsTransactionError] = useState<boolean>(false);

  const [isUploadedToDecentralizedNetwork, setIsUploadedToDecentralizedNetwork] = useState<boolean>(false);

  const onBtnCreate = () => {
    setOpenOnCreateModal(true)
    setIsConnectedToDecentralizedNetwork(false)
    setIsTransactionApprovedFromWallet(false)
    setIsTransactionError(false)
    setIsUploadedToDecentralizedNetwork(false)

    increaseValue(20).then(res => {
    })
  }

  const increaseValue = async (amount: number) => {
    if (!isConnected) throw Error("User disconnected")

    if (walletProvider && session) {
      const ethersProvider = new ethers.BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()
      const contract = new ethers.Contract(NEXT_PUBLIC_CONTRACT_ADDRESS, NEXT_PUBLIC_ABI, signer)
      setIsConnectedToDecentralizedNetwork(true);

      try {
        const tx = await contract.increaseValue(amount)
            .then(tx => {
              setIsTransactionApprovedFromWallet(true);
              return tx
            })
            .catch(reason => {
              setIsTransactionApprovedFromWallet(false)
              console.log(reason)
            });
        await tx.wait();

        const reqBody: CreatePropertyReqBody = {
          title: title,
          description: description,
          supply: supply
        }
        fetchCreateProperty(session.access_token, reqBody)
            .then(res => {
              setTimeout(() => {
                setIsUploadedToDecentralizedNetwork(true)
                router.push("/add-property/confirmation");
              }, 2000);
            })
            .catch(error => {
              console.error('Error creating property:', error);
            });

      } catch (error) {
        console.error('Error increasing integer value:', error);
        setIsUploadedToDecentralizedNetwork(false)
        setIsTransactionError(true)
      }
    }
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  };

  const onChangeSupply = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSupply(event.target.value)
  };

  const onChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  };

  return (
      <main className={`flex flex-col`}>

        <div className={"flex justify-center w-full"}>

          <div className={"w-96 p-5 flex flex-col gap-1"}>

            <section className={"w-32"}>
              <Button onClick={() => router.back()} title={"Back"}/>
            </section>

            <section className={"mt-4"}>
              <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                    <section {...getRootProps()} className="
                    flex items-center justify-center h-64 border-dotted border-2 border-amber-700 rounded-md bg-zinc-50
                    hover:bg-gray-100 hover:border-amber-600 hover:text-amber-700 hover:border
                    transition-colors duration-200 cursor-pointer">
                      <div className="text-center">
                        <input {...getInputProps()} />
                        <p className="text-amber-700">Drag and drop media</p>
                      </div>
                    </section>
                )}
              </Dropzone>

            </section>

            <section>
              <Textfield title={"Name"} onChange={event => onChangeTitle(event)}/>
            </section>

            <section>
              <Textfield defaultValue={supply} title={"Supply"} onChange={event => onChangeSupply(event)}/>
            </section>

            <section>
              <TextfieldMulti onChange={event => onChangeDescription(event)} title={"Description"}
                              placeholder={"Description"}/>
            </section>

            <section className={"w-32 mt-4"}>
              {!session ? <>
                <Button5 onClick={() => signIn('keycloak')} title={"Sign in to Unlock NFT Creation"}/>
              </> : <>
                <Button onClick={() => onBtnCreate()} title={"Create"}/>
              </>}
            </section>
          </div>
        </div>

        <section aria-label={"mint-modal"} className={""}>
          <MintModal open={openOnCreateModal}
                     setOpen={setOpenOnCreateModal}
                     isConnectedToDecentralizedNetwork={isConnectedToDecentralizedNetwork}
                     isTransactionApprovedFromWallet={isTransactionApprovedFromWallet}
                     isUploadedToDecentralizedNetwork={isUploadedToDecentralizedNetwork}
                     isTransactionError={isTransactionError}
          />
        </section>

      </main>
  );
};

export default AddPropertyPage;
