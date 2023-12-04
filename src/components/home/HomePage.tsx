"use client"

import React, {Suspense, useEffect, useState} from 'react';
import {FilterSearchReqBody, HomePageDTO} from "@/components/home/HomePageDTO";
import Divider from "@/lib/Divider";
import {HouseItem} from "@/lib/HouseItem";
import {SearchArea} from "@/lib/SearchArea";
import {getData} from "@/components/home/HomePageAPI";
import LoadingSpinner from "@/lib/LoadingSpinner";

const awsImagesLinks = [
  {name: "https://images.chaincuet.com/logos/ancient-rome.jpeg"},
  {name: "https://images.chaincuet.com/logos/ancient-rome2.jpg"},
  {name: "https://images.chaincuet.com/logos/ancient-rome3.webp"},
  {name: "https://images.chaincuet.com/logos/roman-empire1.jpeg"},
  {name: "https://images.chaincuet.com/logos/roman-empire2.webp"},
  {name: "https://images.chaincuet.com/logos/roman-empire3.jpg"},
  {name: "https://images.chaincuet.com/logos/roman-empire4.jpg"},
  {name: "https://images.chaincuet.com/logos/mansion1.jpeg"},
  {name: "https://images.chaincuet.com/logos/mansion2.jpg"},
  {name: "https://images.chaincuet.com/logos/mansion3.jpg"},
  {name: "https://images.chaincuet.com/logos/mansion4.jpg"},
  {name: "https://images.chaincuet.com/logos/mansion5.jpg"},
  {name: "https://images.chaincuet.com/logos/mansion7.jpeg"},
]

interface HomeViewProps {
}

const HomePage = (props: HomeViewProps) => {
  const [homeViewModel, setHomeViewModel] = useState<HomePageDTO | undefined>();

  const [filterSearchContext, setFilterSearchContext] = useState<FilterSearchReqBody>({
    country: "ANY",
    textAreaSearchValue: "",
    houseTypes: [],
    sort: ""
  });

  useEffect(() => {
    getData().then(setHomeViewModel)
  }, [])

  return (
      <main className={"flex"}>
        <div className={"w-full"}>
          <div className={"flex flex-col"}>
            <section aria-label={"filter_search"}
                     className="flex flex-col items-center bg-local h-full xs:p-2 sm:p-2 md:p-2 lg:p-10 xl:p-20 shadow-xl"
                     style={{
                       backgroundImage: `url(${awsImagesLinks[10].name})`,
                       backgroundSize: "cover",
                       backgroundRepeat: "no-repeat",
                     }}>
              <SearchArea filterSearchContext={filterSearchContext} setFilterSearchContext={setFilterSearchContext}
                          isShadow={true}/>
            </section>

            <section aria-label={"recently_added_houses_text"} className={"flex justify-center p-2"}>
              <div className={"xxs:w-full md:w-10/12 xl:w-10/12 2xl:w-6/12"}>
                <div className={""}>
                  <section className={"flex flex-col items-center mt-8"}>
                    <p className={"xxs:text-sm xs:text-xl md:text-3xl text-amber-700"}>Invest In Real Estate, Pay With
                      Crypto</p>
                  </section>
                  <section aria-label={"divider"} className={"mt-8"}>
                    <Divider/>
                  </section>
                  <section className={"flex flex-col items-center mt-8"}>
                    <p className={"xxs:text-lg xs:text-xl md:text-3xl text-amber-700"}>Recently added</p>
                  </section>
                </div>
              </div>
            </section>
            <section aria-label={"recently_added_houses"} className={"flex justify-center mt-10 p-2"}>
              <div className={"xxs:w-full md:w-10/12 xl:w-10/12 2xl:w-6/12 grid xxs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                {homeViewModel && homeViewModel.recentlyAddedHouses && homeViewModel.recentlyAddedHouses
                    .map(house => <div key={house.id}><HouseItem house={house}/></div>)}
              </div>
            </section>
            {!homeViewModel && <div className={`${!homeViewModel ? "pb-96" : ""}`}><LoadingSpinner/></div>}
          </div>
        </div>
      </main>
  )
}

export default HomePage
