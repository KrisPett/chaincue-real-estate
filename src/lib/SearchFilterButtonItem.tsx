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
  let router = useRouter();

  const [isSelected, setIsSelected] = useState<boolean>(props.filterSearchContext && props.filterSearchContext.houseTypes.includes(props.houseTypes));

  const onClickAddHouseTypesIfNotExistsOrRemove = (houseTypes: HouseTypes) => {
    setIsSelected(!isSelected);
    props.setFilterSearchContext(prevState => {
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

  useEffect(() => {
    if (props.filterSearchContext)
      setIsSelected(props.filterSearchContext.houseTypes.includes(props.houseTypes));
  }, [props.filterSearchContext, props.houseTypes]);

  return (
      <button onClick={() => onClickAddHouseTypesIfNotExistsOrRemove(props.houseTypes)}
              className={`btn btn-outline btn-lg border-amber-600 text-amber-700 text-sm font-medium border-1 hover:border-amber-400 rounded shadow
                            hover:text-amber-600
                            ${isSelected ? "hover:bg-amber-200" : "hover:bg-transparent"} 
                            ${isSelected ? "bg-amber-200" : "bg-transparent"} 
                           `}
      >
        {props.title}
      </button>
  )
}
