"use client"
import {useRouter, useSearchParams} from "next/navigation";
import React, {useState} from "react";
import {FilterSearchReqBody, HouseTypes} from "@/components/home/HomePageDTO";
import {SearchFilterButtonItem} from "@/lib/SearchFilterButtonItem";
import Divider from "@/lib/Divider";
import Button2 from "@/lib/Button2";
import {useQueryClient} from "@tanstack/react-query";

interface SearchAreaProps {
  isShadow: boolean,
  setFilterSearchContext: (filterSearchContext: (prevState: any) => any) => void,
  filterSearchContext: FilterSearchReqBody
}

export const SearchArea = (props: SearchAreaProps) => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const queryClient = useQueryClient();

  const [text, setText] = useState(searchParams.get('location_area') || "");
  const [defaultCountrySelected, setDefaultCountrySelected] = useState(searchParams.get('country') || "ANY");
  const [textLines] = useState(1);

  const handleTextareaOnKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isEnterPressed = event.key === "Enter";

    if (isEnterPressed) {
      event.preventDefault();

      const newText = event.currentTarget.value;
      const estateTypes = props.filterSearchContext.houseTypes.map(type => `estate_types=${type}`).join('&');

      const baseQuery = `houses?country=${props.filterSearchContext.country}`;
      const locationQuery = newText === "" ? '' : `&location_area=${newText}`;
      const queryParams = estateTypes ? `&${estateTypes}` : '';
      const sortQuery = props.filterSearchContext.sort ? `&sort=${props.filterSearchContext.sort}` : '';

      const url = `${baseQuery}${locationQuery}${queryParams}${sortQuery}`;

      router.push(url);

      props.setFilterSearchContext(prevState => ({
        ...prevState,
        textAreaSearchValue: newText
      }));
    }
  };

  const handleTextareaOnBlur = () => {
    props.setFilterSearchContext(prevState => ({
      ...prevState,
      textAreaSearchValue: text
    }));
  }

  const onChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setFilterSearchContext(prevState => ({
      ...prevState,
      country: event.target.value
    }));

    if (window.location.pathname.includes("houses")) {
      const estateTypes = props.filterSearchContext.houseTypes.map(type => `estate_types=${type}`).join('&');
      const baseQuery = `houses?country=${event.target.value}`;
      const locationQuery = props.filterSearchContext.textAreaSearchValue === "" ? '' : `&location_area=${props.filterSearchContext.textAreaSearchValue}`;
      const queryParams = estateTypes ? `&${estateTypes}` : '';
      const sortQuery = props.filterSearchContext.sort ? `&sort=${props.filterSearchContext.sort}` : '';

      const url = `${baseQuery}${locationQuery}${queryParams}${sortQuery}`;
      return router.push(url);
    }

  };

  const onBtnSearch = async () => {
    const estateTypes = props.filterSearchContext.houseTypes.map(type => `estate_types=${type}`).join('&');
    const baseQuery = `houses?country=${props.filterSearchContext.country}`;
    const locationQuery = props.filterSearchContext.textAreaSearchValue === "" ? '' : `&location_area=${props.filterSearchContext.textAreaSearchValue}`;
    const queryParams = estateTypes ? `&${estateTypes}` : '';
    const sortQuery = props.filterSearchContext.sort ? `&sort=${props.filterSearchContext.sort}` : '';

    const url = `${baseQuery}${locationQuery}${queryParams}${sortQuery}`;
    router.push(url)
  }

  return (
      <div
          className={`flex justify-center border-amber-600 xxs:w-full md:w-10/12 xl:w-10/12 2xl:w-6/12 rounded h-full mb-5 mt-5 bg-zinc-50 opacity-95 ${props.isShadow && "shadow-2xl"}`}>
        <div className={"flex flex-col gap-4 w-11/12 mt-8"}>

          <section aria-label={"select-country"} className={"md:w-3/12"}>
            <select id="countries"
                    className="bg-gray-50 border border-amber-600 text-amber-700 text-sm rounded focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 hover:border-amber-400"
                    defaultValue={defaultCountrySelected}
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
                        placeholder="Search" onChange={(e) => setText(e.target.value)}
                        rows={textLines}
                        onKeyDown={handleTextareaOnKeydown} value={text}
                        onBlur={event => handleTextareaOnBlur()}
                    />
            </form>
          </section>

          <section aria-label={"filter_btn"} className={"grid md:grid-cols-4 lg:grid-cols-7 gap-4"}>
            <SearchFilterButtonItem title={"Condominium"} houseTypes={HouseTypes.CONDOMINIUM}
                                    setFilterSearchContext={props.setFilterSearchContext}
                                    filterSearchContext={props.filterSearchContext}
            />
            <SearchFilterButtonItem title={"Villa"} houseTypes={HouseTypes.VILLA}
                                    setFilterSearchContext={props.setFilterSearchContext}
                                    filterSearchContext={props.filterSearchContext}
            />
            <SearchFilterButtonItem title={"TownHouse"} houseTypes={HouseTypes.TOWNHOUSE}
                                    setFilterSearchContext={props.setFilterSearchContext}
                                    filterSearchContext={props.filterSearchContext}
            />
            <SearchFilterButtonItem title={"Vacation home"} houseTypes={HouseTypes.VACATION_HOME}
                                    setFilterSearchContext={props.setFilterSearchContext}
                                    filterSearchContext={props.filterSearchContext}
            />
            <SearchFilterButtonItem title={"Estates and Farms"} houseTypes={HouseTypes.ESTATES_AND_FARMS}
                                    setFilterSearchContext={props.setFilterSearchContext}
                                    filterSearchContext={props.filterSearchContext}
            />
            <SearchFilterButtonItem title={"Land"} houseTypes={HouseTypes.LAND}
                                    setFilterSearchContext={props.setFilterSearchContext}
                                    filterSearchContext={props.filterSearchContext}
            />
            <SearchFilterButtonItem title={"Other Houses"} houseTypes={HouseTypes.OTHER_HOUSES}
                                    setFilterSearchContext={props.setFilterSearchContext}
                                    filterSearchContext={props.filterSearchContext}
            />
          </section>

          <section aria-label={"divider"} className={"mt-8"}>
            <Divider/>
          </section>

          <section className={"mt-8 mb-10"}>
            <Button2 title={"Search"} onClick={() => onBtnSearch()}/>
          </section>
        </div>
      </div>
  )
}
