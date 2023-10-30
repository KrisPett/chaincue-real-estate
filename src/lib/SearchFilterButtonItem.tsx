import {FilterSearchReqBody, HouseTypes} from "@/components/home/HomeViewModel";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

interface FilterButtonProps {
  title: string
  houseTypes: HouseTypes
  setFilterSearchContext: (houseTypes: (prevState: FilterSearchReqBody) => FilterSearchReqBody) => void
  filterSearchContext: FilterSearchReqBody
}

export const SearchFilterButtonItem = (props: FilterButtonProps) => {
  const router = useRouter();
  const [isSelected, setIsSelected] = useState<boolean>(props.filterSearchContext && props.filterSearchContext.houseTypes.includes(props.houseTypes));

  const onClickAddHouseTypesIfNotExistsOrRemove = (houseTypes: HouseTypes) => {
    const houseTypeString = houseTypes.toString();
    const updatedHouseTypes = props.filterSearchContext.houseTypes.includes(houseTypeString)
        ? props.filterSearchContext.houseTypes.filter((type: string) => type !== houseTypeString)
        : [...props.filterSearchContext.houseTypes, houseTypeString];

    props.setFilterSearchContext(prevState => ({
      ...prevState,
      houseTypes: updatedHouseTypes,
    }));

    if (window.location.pathname.includes("houses")) {
      const estateTypes = updatedHouseTypes.map(type => `estate_types=${type}`).join('&');
      const baseQuery = `houses?country=${props.filterSearchContext.country}`;
      const locationQuery = props.filterSearchContext.textAreaSearchValue === "" ? '' : `&location_area=${props.filterSearchContext.textAreaSearchValue}`;
      const queryParams = estateTypes ? `&${estateTypes}` : '';
      const sortQuery = props.filterSearchContext.sort ? `&sort=${props.filterSearchContext.sort}` : '';

      const url = `${baseQuery}${locationQuery}${queryParams}${sortQuery}`;
      return router.push(url);
    }
  };

  useEffect(() => {
    if (props.filterSearchContext)
      setIsSelected(props.filterSearchContext.houseTypes.includes(props.houseTypes));
  }, [props.filterSearchContext, props.houseTypes]);

  return (
      <button onClick={() => onClickAddHouseTypesIfNotExistsOrRemove(props.houseTypes)}
              className={`btn btn-outline btn-lg border-amber-600 text-amber-700 xxs:text-sm xs:text-sm sm:text-sm md:text-xs font-medium border-1 hover:border-amber-400 rounded shadow
                            hover:text-amber-600
                            ${isSelected ? "hover:bg-amber-200" : "hover:bg-transparent"} 
                            ${isSelected ? "bg-amber-200" : "bg-transparent"} 
                           `}
      >
        {props.title}
      </button>
  )
}
