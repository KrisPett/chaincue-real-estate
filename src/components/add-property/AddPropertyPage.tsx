"use client"

import React, {useEffect, useState} from 'react';
import Button from "@/lib/Button";
import {useRouter} from "next/navigation";
import Textfield from "@/lib/Textfield";
import TextfieldMulti from "@/lib/TextfieldMulti";
import Dropzone from "react-dropzone";
import {useSession} from "next-auth/react";

import MintModal from "@/components/add-property/components/MintModal";
import {CreatePropertyReqBody} from "@/components/add-property/AddPropertyPageDTO";
import {fetchCreateProperty} from "@/components/add-property/AddPropertyPageAPI";
import {decreaseValue, increaseValue, readIntegerValue} from "@/utilities/EthContract";

const AddPropertyPage = () => {
  const {data: session} = useSession();
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [supply, setSupply] = useState<string>("1");
  const [description, setDescription] = useState<string>("");
  const [open, setOpen] = useState(false)
  const [isConnectedToDecentralizedNetwork, setIsConnectedToDecentralizedNetwork] = useState<boolean>(false);
  const [isTransactionApprovedFromWallet, setIsTransactionApprovedFromWallet] = useState<boolean>(false);
  const [isUploadedToDecentralizedNetwork, setIsUploadedToDecentralizedNetwork] = useState<boolean>(false);

  const onBtnCreate = () => {
    setOpen(true)
    const reqBody: CreatePropertyReqBody = {
      title: title,
      description: description,
      supply: supply
    }

    if (session?.access_token) {
      increaseValue(20).then(res => {
        setIsUploadedToDecentralizedNetwork(true)
        fetchCreateProperty(session.access_token, reqBody)
            .then(res => {
              router.push("/add-property/confirmation")
            })
            .catch(error => {
              console.error('Error creating property:', error);
            });
      })
    } else {
      console.log("no session")
    }
  }

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  };

  const onChangeSupply = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSupply(event.target.value)
  };

  const onChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  };

  /*TEST*/
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsConnectedToDecentralizedNetwork(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [open]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsTransactionApprovedFromWallet(true);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [open]);
  /*TEST*/

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
              <Button onClick={() => onBtnCreate()} title={"Create"}/>
            </section>
          </div>

        </div>

        <section aria-label={"mint-modal"} className={""}>
          <MintModal open={open}
                     setOpen={setOpen}
                     isConnectedToDecentralizedNetwork={isConnectedToDecentralizedNetwork}
                     isTransactionApprovedFromWallet={isTransactionApprovedFromWallet}
                     isUploadedToDecentralizedNetwork={isUploadedToDecentralizedNetwork}
          />
        </section>

      </main>
  );
};

export default AddPropertyPage;
