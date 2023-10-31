import React, {Fragment, useRef} from 'react';
import {Dialog, Transition} from '@headlessui/react'
import {HouseImage} from "@/components/house/HousePageDTO";
import Image from "next/image";
import Button3 from "@/lib/Button3";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  images: HouseImage[];
}

const ImageModal = ({open, setOpen, images}: ModalProps) => {
  const cancelButtonRef = useRef(null)

  return (
      <div>
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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

              <div className="flex justify-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-100"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="relative">
                    <div className="fixed">
                      <div className="w-20">
                        <Button3 title="Close" onClick={() => setOpen(false)}/>
                      </div>
                    </div>
                    <Dialog.Panel
                        className="overflow-y-auto max-h-screen rounded transition-all xxs:max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl">
                      <div className="">
                        {images.map(value => (
                            <div key={value.id}>
                              <Image src={value.url} alt="user_icon" width={1000} height={1000}/>
                            </div>
                        ))}
                      </div>
                    </Dialog.Panel>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
  );
};

export default ImageModal;
