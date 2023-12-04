"use client"
import React, {Suspense, useEffect, useState} from 'react';
import {SearchArea} from "@/lib/SearchArea";
import {HousesPageDTO} from "@/components/houses/HousesPageDTO";
import {HouseItem} from "@/lib/HouseItem";
import {useRouter, useSearchParams} from "next/navigation";
import {FilterSearchReqBody} from "@/components/home/HomePageDTO";
import LoadingSpinner from "@/lib/LoadingSpinner";
import {getData} from "@/components/houses/HousesPageAPI";

interface HousesViewProps {
}

const Houses = (props: HousesViewProps) => {
  const searchParams = useSearchParams()
  const router = useRouter();
  const [housesPageDTO, setHousesPageDTO] = useState<HousesPageDTO>()

  useEffect(() => {
    getData().then(setHousesPageDTO)
  }, [])

  const [defaultSort] = useState(searchParams.get('sort') || "featured");

  const [filterSearchContext, setFilterSearchContext] = useState<FilterSearchReqBody>({
    country: searchParams.get('country') || "ANY",
    textAreaSearchValue: searchParams.get('location_area') || "",
    houseTypes: searchParams.getAll('estate_types') || [],
    sort: searchParams.get('sort') || "featured",
  });

  const onChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;
    setFilterSearchContext(prevState => ({
      ...prevState,
      sort: value
    }));

    const selectedSortOption = event.currentTarget.value
    const currentParams = new URLSearchParams(window.location.search)
    const country = currentParams.get('country')
    const locationArea = currentParams.get('location_area') || ""
    const estateTypes = currentParams.getAll('estate_types')
    const sortQuery = `&sort=${selectedSortOption}`
    const updatedUrl = `/houses?country=${country}&location_area=${locationArea}${estateTypes.map(type => `&estate_types=${type}`).join('')}${sortQuery}`
    router.push(updatedUrl);
  }

  return (
      <div className={`flex flex-col ${!housesPageDTO ? "h-screen" : ""}`}>
        <section className={"flex flex-col items-center xxs:p-2 xs:p-2 sm:p-2 md:p-2"}>
          <SearchArea filterSearchContext={filterSearchContext} setFilterSearchContext={setFilterSearchContext}
                      isShadow={false}/>
        </section>

        <section aria-label={"select-country"} className={"flex flex-col items-center xxs:p-2 xs:p-2 sm:p-2 md:p-2"}>
          <div className={"flex border-amber-600 xxs:w-full md:w-10/12 xl:w-10/12 2xl:w-6/12"}>
            <select id="sort"
                    className="bg-gray-50 border border-amber-600 text-amber-700 text-sm rounded focus:ring-amber-600 focus:border-amber-600 block p-2.5 hover:border-amber-400
                    xxs:w-7/12 xs:w-6/12 sm:w-4/12 md:w-3/12 lg:w-3/12 xl:w-3/12 2xl:w-3/12
                    "
                    defaultValue={defaultSort}
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
            {housesPageDTO && housesPageDTO.houses.map(house => <div key={house.id}><HouseItem house={house}/></div>)}
          </div>
        </section>
        {housesPageDTO == undefined && <LoadingSpinner/>}
      </div>
  )
}

export default Houses;
