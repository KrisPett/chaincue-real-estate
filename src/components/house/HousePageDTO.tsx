export interface HousePageDTO {
  id: string
  title: string
  type: string
  location: string
  numberOfRooms: number
  beds: number
  dollarPrice: string
  cryptoPrice: string
  description: string
  images: HouseImage[]
  broker: Broker
}

export interface HouseImage {
  id: string
  url: string
}

export interface Broker {
  id: string
  name: string
  phoneNumber: string
  email: string
}
