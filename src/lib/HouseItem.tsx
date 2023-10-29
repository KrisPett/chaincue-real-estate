import {House} from "@/components/home/HomeViewModel";
import {useRouter} from "next/navigation";
import Image from "next/image";
import React from "react";

interface RecentlyAddedHouseItemProps {
  house: House
}

export const HouseItem = (props: RecentlyAddedHouseItemProps) => {
  const router = useRouter();

  return (
      <div className="h-full flex flex-col items-start border-2 border-amber-600 rounded p-2 btn shadow-md
       hover:border-amber-500 hover:bg-zinc-50 bg-white xxs:w-full normal-case"
           onClick={() => router.push(`/house/${props.house.id}`)}>
        <div className={""}>
          <Image
              className="xxs:h-40 xs:h-72 sm:h-80 md:h-40 lg:h-40 shadow-md"
              src={props.house.src}
              alt=""
              width={1000}
              height={1000}
              priority={true}
          />
        </div>
        <p className={"text-xl text-amber-700"}>{props.house.title}</p>
        <p className={"text-amber-800 font-normal"}>
          Location: <span className={"text-amber-800"}>{props.house.location}</span>
        </p>
        <p className={"text-amber-800 font-normal"}>
          Number of Rooms: <span className={"text-amber-800"}>{props.house.numberRooms}</span>
        </p>
        <p className={"text-amber-800 font-normal"}>
          Beds: <span className={"text-amber-800"}>{props.house.beds}</span>
        </p>
        <p className={"text-amber-800 font-normal"}>
          Price: <span className={"text-green-600 font-bold"}>{props.house.dollarPrice} / <span
            className={"text-amber-600 font-bold"}>{props.house.cryptoPrice}</span>
          </span>
        </p>
      </div>
  )
}
