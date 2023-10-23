import React from 'react';
import MultipleSelect from "@/components/home/MultipleSelect";

const Home = () => {
  return (
      <main className={"flex"}>
        <div className={"w-full"}>
          <div className={"h-96"}>
            <div className="flex flex-col items-center bg-local h-full"
                 style={{
                   backgroundImage: "url(https://images.chaincuet.com/logos/ancient-rome.jpeg)",
                   backgroundSize: "cover",
                   backgroundRepeat: "no-repeat",
                 }}>
              <div className={"flex flex-col w-4/5 rounded h-full mb-5 mt-5 bg-zinc-50 opacity-95"}>
                <section className={"md:w-1/5"}>
                  <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                  <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-zinc-300 focus:border-zinc-50 block w-full p-2.5">
                    <option disabled selected>Choose a country</option>
                    <option value="US">Any Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                    <option value="DE">Sweden</option>
                    <option value="DE">Spain</option>
                  </select>
                </section>

                <section>
                  <MultipleSelect/>
                </section>

              </div>
            </div>
          </div>
        </div>

      </main>
  );
};

export default Home;
