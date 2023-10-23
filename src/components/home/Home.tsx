import React from 'react';

const imageSrc = "images.chaincuet.com/logos/ancient-rome.jpeg"
const Home = () => {
  return (
      <main className={"flex flex-col items-center"}>
        <div className={"border-2 border-amber-400 w-4/5 h-96"}>
          <div className="bg-local h-full"
               style={{backgroundImage: "url(https://images.chaincuet.com/logos/ancient-rome.jpeg)"}}>
            <div>landing</div>
          </div>
        </div>
      </main>
  );
};

export default Home;
