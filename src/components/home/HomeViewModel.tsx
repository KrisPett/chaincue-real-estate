export interface HomeViewModel {
  countries: Country[]
  recentlyAddedHouses: House[]
}

export interface Country {
  name: string
}

export interface House {
  id: string
  title: string
  location:string
  numberRooms: number
  beds: number
  dollarPrice: string
  cryptoPrice: string
  src: string
}

/*ReqBody*/
export interface FilterSearchReqBody {
  country: string
  textAreaSearchValue: string
  houseTypes: string[]
  sort: string
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
