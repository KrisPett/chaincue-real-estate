import React from 'react';
import Image from "next/image";
import chaincueLogo from "../assets/images/chaincue-real-estate-logo.png";
import Link from "next/link";

const Footer = () => {
  return (
      <footer className="footer p-5 h-64 min flex justify-center rounded-t-4xl border-amber-600 border-t-2 mt-20">
        <div className={""}>
          <div className="mt-20">
            <Link href={"/"} className="btn-ghost btn hover:bg-transparent">
            <Image src={chaincueLogo} alt="" width={400} height={100} className="" priority={true}/>
            </Link>
          </div>
        </div>
      </footer>
  )
}

export default Footer;
