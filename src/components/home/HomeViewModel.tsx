export interface HomeViewModel {
  countries: Country[]
}

export interface Country {
  name: string
}




/*ReqBody*/
export interface FilterSearchReqBody {
  country: string
  textAreaSearchValue: string
  houseTypes: string[]
}

/*Enums*/
export enum HouseTypes {
  CONDOMINIUM = "CONDOMINIUM",
  VILLA = "VILLA",
  TOWNHOUSE = "TOWNHOUSE",
  VACATION_HOME = "VACATION_HOME",
  ESTATES_AND_FARMS = "ESTATES_AND_FARMS",
  LAND = "LAND",
  OTHER_HOUSES = "OTHER_HOUSES"
}
