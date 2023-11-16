"use client"

import React, {useEffect, useState} from 'react';
import {HousePageDTO} from "@/components/house/HousePageDTO";
import Button from "@/lib/Button";
import {useRouter} from "next/navigation";
import Image from "next/image";
import Divider from "@/lib/Divider";
import ImageModal from "@/components/house/components/ImageModal";

interface HouseProps {
  data: HousePageDTO
}

const House = (props: HouseProps) => {
  const [housePageDTO, setHousePageDTO] = useState<HousePageDTO>(props.data);
  const router = useRouter();

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setHousePageDTO(props.data)
  }, [props.data]);

  const renderDescriptionWithLineBreaks = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br/>
        </React.Fragment>
    ));
  };
  console.log(props.data)
  return (
      <main className={"flex flex-col items-center"}>
        <div className={"flex flex-col gap-5 mt-5 p-5 bg-zinc-400 bg-opacity-10 rounded"}>

          <section className={"w-32"}>
            <Button onClick={() => router.back()} title={"Back"}/>
          </section>

          <section className={"max-w-6xl"}>
            <button className={"h-full flex p-0 btn border-none hover:bg-transparent bg-transparent"}
                    onClick={() => setOpen(true)}>
              <Image
                  className={"shadow-md rounded"}
                  src={housePageDTO.images[0].url}
                  alt=""
                  width={10000}
                  height={100}
                  priority={true}
              />
            </button>
          </section>

          <section className={"flex gap-1 justify-between"}>
            <div>
              <Button onClick={() => {
              }} title={"Save"}/>
            </div>
            <div className={"flex gap-1"}>
              <div>
                <Button onClick={() => setOpen(true)} title={"Images"}/>
                <ImageModal open={open} setOpen={setOpen} images={housePageDTO.images}/>
              </div>
            </div>
          </section>

          <section className={"flex flex-col max-w-lg"}>
            <p className={"font-bold"}>{housePageDTO.title}</p>
            <p className={""}>Type: {housePageDTO.type}</p>
            <p>Location: {housePageDTO.location}</p>
            <p>Number of Rooms: {housePageDTO.numberOfRooms}</p>
            <p>Beds: {housePageDTO.beds}</p>
            <p className={"font-normal"}>
              Price: <span className={"text-green-600 font-bold"}>{housePageDTO.dollarPrice} / <span
                className={"text-amber-600 font-bold"}>{housePageDTO.cryptoPrice}</span>
          </span>
            </p>
          </section>

          <section>
            <Divider/>
          </section>

          <section className={"flex max-w-lg"}>
            <div>
              {renderDescriptionWithLineBreaks(housePageDTO.description)}
            </div>
          </section>

          <section className={"flex max-w-lg"}>
            <div>
              <p className={"font-bold"}>Contact Broker: </p>
              <p>{housePageDTO.broker && housePageDTO.broker.name}</p>
              <p>{housePageDTO.broker && housePageDTO.broker.phoneNumber}</p>
              <p>{housePageDTO.broker && housePageDTO.broker.email}</p>
            </div>
          </section>

        </div>
      </main>
  );
};

export default House;
