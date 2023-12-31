export interface HousesPageDTO {
  countries: Country[]
  houses: House[]
}

export interface Country {
  name: string
}

export interface House {
  id: string
  title: string
  location: string
  type: string
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
