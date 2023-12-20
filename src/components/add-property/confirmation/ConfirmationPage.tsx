"use client"

import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import {ConfirmationPage, mockConfirmationPage} from "@/components/add-property/confirmation/ConfirmationPageDTO";
import Button4 from "@/lib/Button4";
import {useRouter} from "next/navigation";
import {readIntegerValue} from "@/utilities/EthContract";

const ConfirmationPage = () => {
  const [confirmationPage, setConfirmationPage] = useState<ConfirmationPage>(mockConfirmationPage)
  const router = useRouter();
  const [integerValue, setIntegerValue] = useState(null);

  useEffect(() => {
    readIntegerValue().then(value => {
      setIntegerValue(value)
    });
  }, []);

  console.log(integerValue)
  return (
      <main className={`flex flex-col`}>
        <div className={"flex justify-center w-full p-1"}>

          <div className={"flex items-center flex-col gap-10 mt-10"}>

            <section className={"sm:w-96"}>
              <div
                  className="flex border-2 border-amber-600 rounded p-2 shadow-md bg-white">
                <div className={""}>
                  <Image
                      className=""
                      src={confirmationPage.url}
                      alt=""
                      width={1000}
                      height={1000}
                      priority={true}
                  />
                </div>
              </div>
            </section>

            <section>
              <p className={"xxs:text-xl xs:text-2xl sm:text-4xl text-amber-600 font-medium"}>Your item has been minted</p>
            </section>

            <section className={"flex flex-col w-72 items-center gap-1"}>
              <Button4 title={"View Item"} onClick={() => router.push("/")}/>
              <Link href={"https://etherscan.io/"} target={"_blank"} className={"link link-hover flex gap-1"}>
                <p>View on Etherscan</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                </svg>
              </Link>
            </section>

          </div>
        </div>

      </main>
  );
};

export default ConfirmationPage;
