"use client"
import React, {useState} from 'react';
import {SearchArea} from "@/lib/SearchArea";
import {HousesViewModel} from "@/components/houses/HousesViewModel";
import {HouseItem} from "@/lib/HouseItem";
import {useRouter, useSearchParams} from "next/navigation";
import {FilterSearchReqBody} from "@/components/home/HomeViewModel";

interface HousesViewProps {
  data: HousesViewModel
}

const HousesView = (props: HousesViewProps) => {
  const [defaultSort, setDefaultSort] = useState();
  const router = useRouter();
  const searchParams = useSearchParams()

  const [filterSearchContext, setFilterSearchContext] = useState<FilterSearchReqBody>({
    country: searchParams.get('country') || "ANY",
    textAreaSearchValue: searchParams.get('location_area') || "",
    houseTypes: searchParams.getAll('estate_types') || [],
    sort: ""
  });
  console.log(filterSearchContext)
  console.log(filterSearchContext)
  const onChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let value = event.currentTarget.value;
    router.push(`&sort=${value}`)
    console.log(event.currentTarget.value);
    // router=dwdawdaw
  };

  return (
      <div className={"flex flex-col"}>
        <section className={"flex flex-col items-center xxs:p-2 xs:p-2 sm:p-2 md:p-2"}>
          <SearchArea filterSearchContext={filterSearchContext} setFilterSearchContext={setFilterSearchContext}
                      isShadow={false}/>
        </section>

        <section aria-label={"select-country"} className={"flex flex-col items-center xxs:p-2 xs:p-2 sm:p-2 md:p-2"}>
          <div className={"flex border-amber-600 xxs:w-full md:w-10/12 xl:w-10/12 2xl:w-6/12"}>
            <select id="sort"
                    className="bg-gray-50 border border-amber-600 text-amber-700 text-sm rounded focus:ring-amber-600 focus:border-amber-600 block p-2.5 hover:border-amber-400
                    xxs:w-7/12 xs:w-6/12 sm:w-4/12 md:w-3/12 lg:w-2/12 xl:w-2/12
                    "
                    defaultValue={"RECENTLY"}
                    onChange={event => onChangeOption(event)}
            >
              <option value={"featured"}>Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </section>

        <section aria-label={"recently_added_houses"} className={"flex justify-center p-2"}>
          <div
              className={"xxs:w-full md:w-10/12 xl:w-10/12 2xl:w-6/12 grid xxs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
            {props.data.houses.map(house => <div key={house.id}><HouseItem house={house}/></div>)}
          </div>
        </section>
      </div>
  )
}

export default HousesView;
