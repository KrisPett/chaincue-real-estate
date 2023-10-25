"use client"
import React, {useState} from 'react';
import {FilterSearchReqBody, HouseTypes} from "@/components/home/HomeViewModel";

const awsImagesLinks = [
  {name: "https://images.chaincuet.com/logos/ancient-rome.jpeg"},
  {name: "https://images.chaincuet.com/logos/ancient-rome2.jpg"},
  {name: "https://images.chaincuet.com/logos/ancient-rome3.webp"},
  {name: "https://images.chaincuet.com/logos/ancient-rome4.webp"}
]

interface FilterButtonProps {
  title: string
  houseTypes: HouseTypes
  setFilterSearchContext: (houseTypes: (prevState: any) => any) => void
}

const FilterButton = (props: FilterButtonProps) => {
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
              className={`btn btn-outline btn-lg border-amber-600 text-amber-600 text-sm font-medium border-1 hover:border-amber-400 
                            hover:text-amber-600
                            ${isSelected ? "hover:bg-amber-200" : "hover:bg-transparent"} 
                            ${isSelected ? "bg-amber-200" : "bg-transparent"} 
                           `}
      >
        {props.title}
      </button>
  )
}


const Home = () => {
      const [text, setText] = useState("");
      const [textLines] = useState(1);
      // const [isSelected, setIsSelected] = useState(false);
      const [filterSearchContext, setFilterSearchContext] = useState<FilterSearchReqBody>({
        country: "ANY",
        textAreaSearchValue: "",
        houseTypes: []
      });

      const handleTextareaOnKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const isEnterPressed = event.key === "Enter";
        if (isEnterPressed) {
          setFilterSearchContext(prevState => ({
            ...prevState,
            textAreaSearchValue: text
          }));
        }
        if (isEnterPressed) {
          event.preventDefault();
        }
      }

      const handleTextareaOnBlur = () => {
        setFilterSearchContext(prevState => ({
          ...prevState,
          textAreaSearchValue: text
        }));
      }

      const onChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterSearchContext(prevState => ({
          ...prevState,
          country: event.target.value
        }));
      };

      // const onClickAddHouseTypesIfNotExistsOrRemove = (houseTypes: HouseTypes) => {
      //   setIsSelected(!isSelected);
      //   setFilterSearchContext((prevState) => {
      //     const houseTypeString = houseTypes.toString();
      //     const updatedHouseTypes = prevState.houseTypes.includes(houseTypeString)
      //         ? prevState.houseTypes.filter((type) => type !== houseTypeString)
      //         : [...prevState.houseTypes, houseTypeString];
      //     return {
      //       ...prevState,
      //       houseTypes: updatedHouseTypes,
      //     };
      //   });
      // };

      console.log(filterSearchContext)

      return (
          <main className={"flex"}>
            <div className={"w-full"}>
              <div className={"h-96"}>
                <div className="flex flex-col items-center bg-local h-full"
                     style={{
                       backgroundImage: `url(${awsImagesLinks[2].name})`,
                       backgroundSize: "cover",
                       backgroundRepeat: "no-repeat",
                     }}>
                  <div className="flex justify-center border-amber-600 xxs:w-full md:w-10/12 xl:w-8/12 2xl:w-6/12 rounded h-full mb-5 mt-5 bg-zinc-50
                                  opacity-95" >
                    <div className={"flex flex-col w-11/12 mt-1"}>

                      <section aria-label={"select-country"} className={"md:w-3/12"}>
                        <select id="countries"
                                className="bg-gray-50 border border-amber-600 text-gray-900 text-sm rounded focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 hover:border-amber-400"
                                defaultValue={"ANY"}
                                onChange={event => onChangeOption(event)}
                        >
                          <option value={"ANY"}>Any Country</option>
                          <option value="SWEDEN">Sweden</option>
                          <option value="SPAIN">Spain</option>
                        </select>
                      </section>

                      <section aria-label={"textfield"} className={"flex flex-col items-center mt-2"}>
                        <form className={"w-full"} onSubmit={(e) => e.preventDefault()}>
                    <textarea
                        className="textarea-bordered textarea w-full resize-none rounded bg-zinc-50 border-amber-600 bg-opacity-60 hover:border-amber-400
                        focus:ring-1 focus:ring-offset-2 focus:ring-offset-amber-600 focus-visible:border-0 focus:outline-none
                        focus-visible:ring-0 focus-visible:ring-offset-1 focus-visible:ring-offset-orange-30"
                        placeholder="Search by place..." onChange={(e) => setText(e.target.value)} rows={textLines}
                        onKeyDown={handleTextareaOnKeydown} value={text}
                        onBlur={event => handleTextareaOnBlur()}
                    />
                        </form>
                      </section>

                      <section className={"grid md:grid-cols-4 lg:grid-cols-7 gap-4"}>
                        <FilterButton title={"Condominium"} houseTypes={HouseTypes.CONDOMINIUM}
                                      setFilterSearchContext={setFilterSearchContext}/>
                        <FilterButton title={"Villa"} houseTypes={HouseTypes.VILLA}
                                      setFilterSearchContext={setFilterSearchContext}/>
                        <FilterButton title={"TownHouse"} houseTypes={HouseTypes.TOWNHOUSE}
                                      setFilterSearchContext={setFilterSearchContext}/>
                        <FilterButton title={"Vacation home"} houseTypes={HouseTypes.VACATION_HOME}
                                      setFilterSearchContext={setFilterSearchContext}/>
                        <FilterButton title={"Estates and Farms"} houseTypes={HouseTypes.ESTATES_AND_FARMS}
                                      setFilterSearchContext={setFilterSearchContext}/>
                        <FilterButton title={"Land"} houseTypes={HouseTypes.LAND}
                                      setFilterSearchContext={setFilterSearchContext}/>
                        <FilterButton title={"Other Houses"} houseTypes={HouseTypes.OTHER_HOUSES}
                                      setFilterSearchContext={setFilterSearchContext}/>
                      </section>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
      );
    }
;

export default Home;
