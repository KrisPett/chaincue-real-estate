import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react'
import LoadingSpinner from "@/lib/LoadingSpinner";
import CheckedSvg from "@/lib/CheckedSVG";

const isMetamaskInstalled = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isConnectedToDecentralizedNetwork: boolean
  isTransactionApprovedFromWallet: boolean
  isUploadedToDecentralizedNetwork: boolean
}

const MintModal = (props: ModalProps) => {
  const [isMetamaskConnected, setIsMetamaskConnected] = useState<boolean>(false);
  const [ethAddress, setEthAddress] = useState<string>("");

  const cancelButtonRef = useRef(null)

  useEffect(() => {
    if (isMetamaskInstalled) {
      if (window.ethereum.selectedAddress !== null && window.ethereum.selectedAddress !== undefined && window.ethereum.selectedAddress !== "") {
        setIsMetamaskConnected(true)
        setEthAddress(window.ethereum.selectedAddress)
      }
    }
  }, []);

  return (
      <div>
        <Transition.Root show={props.open} as={Fragment}>
          <Dialog as="div" className="relative" initialFocus={cancelButtonRef} onClose={() => {
          }}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-100"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel
                      className="relative transform overflow-hidden rounded-lg text-left transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className={"flex justify-center"}>
                      <div className="px-4 py-3 flex flex-col gap-5 rounded
                    bg-gradient-to-br from-gray-200 to-gray-300 w-11/12 xxs:space-y-1 sm:space-y-0">
                        <p className={"text-amber-700 text-2xl"}>Creating your NFT property</p>
                        <div className={"flex items-center"}>
                          <div className={"mr-2 w-10"}>
                            {props.isConnectedToDecentralizedNetwork ? <CheckedSvg/> : <LoadingSpinner size={"w-10"}/>}
                          </div>
                          <div>
                            <p className={"text-amber-700"}>Connecting to decentralized server</p>
                            <p className={"text-gray-500 text-sm"}>This may take a few minutes</p>
                          </div>
                        </div>

                        <div className={"flex items-center"}>
                          <div className={"mr-2 w-10"}>
                            {props.isTransactionApprovedFromWallet ? <CheckedSvg/> : <LoadingSpinner size={"w-10"}/>}
                          </div>
                          <div>
                            <div>
                              <p className={"text-amber-700"}>Go to your wallet to approve this transaction</p>
                              <p className={"text-gray-500 text-sm"}>
                                A blockchain transaction is required to mint NFT property
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className={"flex items-center"}>
                          <div className={"mr-2 w-10"}>
                            {props.isUploadedToDecentralizedNetwork ? <CheckedSvg/> : <LoadingSpinner size={"w-10"}/>}
                          </div>
                          <div>
                            <p className={"text-amber-700"}>Uploading to decentralized server</p>
                            <p className={"text-gray-500 text-sm"}>
                              Please stay on this page and keep this browser tab open
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
  )
}

export default MintModal;
