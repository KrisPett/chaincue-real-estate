import React from 'react';
import Image from "next/image";
import chaincueLogo from "../assets/images/chaincue-real-estate-logo.png";

const Footer = () => {
  return (
      <footer className="footer p-5 h-48 min flex justify-center rounded-t-4xl border-amber-600 border-2">
        <div className={""}>
          <div className="mt-10">
            <Image src={chaincueLogo} alt="" width={300} height={100} className="" priority={true}/>
          </div>
        </div>
      </footer>
  )
}

export default Footer;
