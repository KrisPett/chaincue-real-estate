"use client"
import React, {useState} from 'react';
import {FilterSearchReqBody, HomeViewModel, House, HouseTypes} from "@/components/home/HomeViewModel";
import Button2 from "@/lib/Button2";
import Divider from "@/lib/Divider";
import Image from "next/image";
import {HomeViewModelMock} from "@/components/home/HomeViewModelMock";
import {useRouter} from "next/navigation";

const awsImagesLinks = [
  {name: "https://images.chaincuet.com/logos/ancient-rome.jpeg"},
  {name: "https://images.chaincuet.com/logos/ancient-rome2.jpg"},
  {name: "https://images.chaincuet.com/logos/ancient-rome3.webp"},
  {name: "https://images.chaincuet.com/logos/mansion1.jpeg"},
  {name: "https://images.chaincuet.com/logos/mansion2.jpg"},
  {name: "https://images.chaincuet.com/logos/mansion3.jpg"},
  {name: "https://images.chaincuet.com/logos/mansion4.jpg"},
  {name: "https://images.chaincuet.com/logos/mansion5.jpg"},
  {name: "https://images.chaincuet.com/logos/mansion7.jpeg"},

]

interface FilterButtonProps {
  title: string
  houseTypes: HouseTypes
  setFilterSearchContext: (houseTypes: (prevState: any) => any) => void
}

const FilterButton = (props: FilterButtonProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const onClickAddHouseTypesIfNotExistsOrRemove = (houseTypes: HouseTypes) => {
    setIsSelected(!isSelected);
    props.setFilterSearchContext((prevState) => {
      const houseTypeString = houseTypes.toString();
      const updatedHouseTypes = prevState.houseTypes.includes(houseTypeString)
          ? prevState.houseTypes.filter((type: string) => type !== houseTypeString)
          : [...prevState.houseTypes, houseTypeString];
      return {
        ...prevState,
        houseTypes: updatedHouseTypes,
      };
    });
  };

  return (
      <button onClick={() => onClickAddHouseTypesIfNotExistsOrRemove(props.houseTypes)}
              className={`btn btn-outline btn-lg border-amber-600 text-amber-700 text-sm font-medium border-1 hover:border-amber-400 rounded
                            hover:text-amber-600
                            ${isSelected ? "hover:bg-amber-200" : "hover:bg-transparent"} 
                            ${isSelected ? "bg-amber-200" : "bg-transparent"} 
                           `}
      >
        {props.title}
      </button>
  )
}

interface RecentlyAddedHouseItemProps {
  house: House
}

const RecentlyAddedHouseItem = (props: RecentlyAddedHouseItemProps) => {
  const router = useRouter();

  return (
      <div className="h-full flex flex-col items-start border-2 border-amber-600 rounded p-2 btn
       hover:border-amber-500 hover:bg-zinc-50
          bg-white xxs:w-full normal-case
      " onClick={() => router.push(`/house/${props.house.id}`)}>
        <div className={""}>
          <Image
              className="xxs:h-40 xs:h-72 sm:h-80 md:h-40 lg:h-40"
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
          Price:
          <span className={"text-green-600 font-bold"}>
          {props.house.dollarPrice} / <span className={"text-amber-600 font-bold"}>{props.house.cryptoPrice}</span>
          </span>
        </p>
      </div>
  )
}

const Home = () => {
  const router = useRouter();

  const [text, setText] = useState("");
  const [textLines] = useState(1);
  const [filterSearchContext, setFilterSearchContext] = useState<FilterSearchReqBody>({
    country: "ANY",
    textAreaSearchValue: "",
    houseTypes: []
  });

  const [homeViewModel, setHomeViewModel] = useState<HomeViewModel>(HomeViewModelMock);

  const handleTextareaOnKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isEnterPressed = event.key === "Enter";
    if (isEnterPressed) {
      setFilterSearchContext(prevState => ({
        ...prevState,
        textAreaSearchValue: text
      }));
    }
    if (isEnterPressed) {
      event.preventDefault();
    }
  }

  const handleTextareaOnBlur = () => {
    setFilterSearchContext(prevState => ({
      ...prevState,
      textAreaSearchValue: text
    }));
  }

  const onChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterSearchContext(prevState => ({
      ...prevState,
      country: event.target.value
    }));
  };

  const onBtnSearch = () => {
    const estateTypes = filterSearchContext.houseTypes.map(type => `&estate_types=${type}`).join('&');
    if (filterSearchContext.textAreaSearchValue == "") {
      return router.push(`houses?country=${filterSearchContext.country}${estateTypes}`)
    }
    return router.push(`houses?country=${filterSearchContext.country}&location_area=${filterSearchContext.textAreaSearchValue}${estateTypes}`)
  };

  return (
      <main className={"flex"}>
        <div className={"w-full"}>
          <div className={"flex flex-col"}>
            <section aria-label={"filter_search"} className="flex flex-col items-center bg-local h-full p-2"
                     style={{
                       backgroundImage: `url(${awsImagesLinks[2].name})`,
                       backgroundSize: "cover",
                       backgroundRepeat: "no-repeat",
                     }}>
              <div className="flex justify-center border-amber-600 xxs:w-full md:w-10/12 xl:w-10/12 2xl:w-6/12 rounded h-full mb-5 mt-5 bg-zinc-50
                                  opacity-95">
                <div className={"flex flex-col gap-4 w-11/12 mt-8"}>

                  <section aria-label={"select-country"} className={"md:w-3/12"}>
                    <select id="countries"
                            className="bg-gray-50 border border-amber-600 text-amber-700 text-sm rounded focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 hover:border-amber-400"
                            defaultValue={"ANY"}
                            onChange={event => onChangeOption(event)}
                    >
                      <option value={"ANY"}>Any Country</option>
                      <option value="SWEDEN">Sweden</option>
                      <option value="SPAIN">Spain</option>
                    </select>
                  </section>

                  <section aria-label={"textfield"} className={"flex flex-col items-center"}>
                    <form className={"w-full"} onSubmit={(e) => e.preventDefault()}>
                    <textarea
                        className="textarea-bordered textarea w-full resize-none rounded bg-zinc-50 border-amber-600 bg-opacity-60 hover:border-amber-400
                        focus:ring-1 focus:ring-offset-2 focus:ring-offset-amber-600 focus-visible:border-0 focus:outline-none
                        focus-visible:ring-0 focus-visible:ring-offset-1 focus-visible:ring-offset-orange-30 text-amber-700"
                        placeholder="Search by place..." onChange={(e) => setText(e.target.value)} rows={textLines}
                        onKeyDown={handleTextareaOnKeydown} value={text}
                        onBlur={event => handleTextareaOnBlur()}
                    />
                    </form>
                  </section>

                  <section aria-label={"filter_btn"} className={"grid md:grid-cols-4 lg:grid-cols-7 gap-4"}>
                    <FilterButton title={"Condominium"} houseTypes={HouseTypes.CONDOMINIUM}
                                  setFilterSearchContext={setFilterSearchContext}/>
                    <FilterButton title={"Villa"} houseTypes={HouseTypes.VILLA}
                                  setFilterSearchContext={setFilterSearchContext}/>
                    <FilterButton title={"TownHouse"} houseTypes={HouseTypes.TOWNHOUSE}
                                  setFilterSearchContext={setFilterSearchContext}/>
                    <FilterButton title={"Vacation home"} houseTypes={HouseTypes.VACATION_HOME}
                                  setFilterSearchContext={setFilterSearchContext}/>
                    <FilterButton title={"Estates and Farms"} houseTypes={HouseTypes.ESTATES_AND_FARMS}
                                  setFilterSearchContext={setFilterSearchContext}/>
                    <FilterButton title={"Land"} houseTypes={HouseTypes.LAND}
                                  setFilterSearchContext={setFilterSearchContext}/>
                    <FilterButton title={"Other Houses"} houseTypes={HouseTypes.OTHER_HOUSES}
                                  setFilterSearchContext={setFilterSearchContext}/>
                  </section>

                  <section aria-label={"divider"} className={"mt-8"}>
                    <Divider/>
                  </section>

                  <section className={"mt-8 mb-8"}>
                    <Button2 title={"Search"} onClick={() => onBtnSearch()}/>
                  </section>
                </div>
              </div>
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
              <div
                  className={"xxs:w-full md:w-10/12 xl:w-10/12 2xl:w-6/12 grid xxs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 "}>
                {homeViewModel.recentlyAddedHouses.map(house => {
                  return (
                      <div key={house.id}><RecentlyAddedHouseItem house={house}/></div>
                  )
                })}
              </div>

            </section>
          </div>
        </div>
      </main>
  )
}

export default Home
