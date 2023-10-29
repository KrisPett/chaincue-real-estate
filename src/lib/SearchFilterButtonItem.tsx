import {HouseTypes} from "@/components/home/HomeViewModel";
import React, {useState} from "react";

interface FilterButtonProps {
  title: string
  houseTypes: HouseTypes
  setFilterSearchContext: (houseTypes: (prevState: any) => any) => void
}

export const SearchFilterButtonItem = (props: FilterButtonProps) => {
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
