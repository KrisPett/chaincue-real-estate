import HomePage from "@/components/home/HomePage";
import {Metadata} from "next";
import {homePageDTOlMock} from "@/components/home/HomePageDTOlMock";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
  description: ""
}

const getData = async () => {
  return homePageDTOlMock
};

export default async function Page() {
  const data = await getData()
  return (
      < >
        <HomePage data={data}/>
      </>
  )
}
