import HomeView from "@/components/home/HomeView";
import {Metadata} from "next";
import {homeViewModelMock} from "@/components/home/HomeViewModelMock";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
  description: ""
}

const getData = async () => {
  return homeViewModelMock
};

export default async function Page() {
  const data = await getData()
  return (
      < >
        <HomeView data={data}/>
      </>
  )
}
