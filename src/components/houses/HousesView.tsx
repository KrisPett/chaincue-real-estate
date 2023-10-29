"use client"
import React from 'react';
import {SearchArea} from "@/lib/SearchArea";
import {HousesViewModel} from "@/components/houses/HousesViewModel";
import {HouseItem} from "@/lib/HouseItem";

interface HousesViewProps {
  data: HousesViewModel
}

const HousesView = (props: HousesViewProps) => {
  console.log(props.data);
  return (
      <div className={"flex flex-col"}>
        <section className={"flex flex-col items-center xxs:p-2 xs:p-2 sm:p-2 md:p-2"}>
          <SearchArea isShadow={false}/>
        </section>
        <section aria-label={"recently_added_houses"} className={"flex justify-center p-2"}>
          <div
              className={"xxs:w-full md:w-10/12 xl:w-10/12 2xl:w-6/12 grid xxs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 "}>
            {props.data.houses.map(house => <div key={house.id}><HouseItem house={house}/></div>)}
          </div>
        </section>
      </div>
  )
}

export default HousesView;
