import React from "react";
import Image from "next/image";
import chaincueLogo from "../assets/images/chaincue-real-estate-logo.png";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Button from "@/lib/Button";

const Header = () => {
  const router = useRouter();

  return (
      <header
          className={
            "top-0 left-0 right-0 z-10 w-full bg-zinc-300 from-zinc-600 to-gray-500 dark:bg-zinc-600 dark:bg-gradient-to-r"
          }
      >
        <div className={"flex items-center justify-between py-3"}>
          <div>
            <Link href={"/"} className="btn-ghost btn hover:bg-transparent">
              <Image
                  src={chaincueLogo}
                  alt=""
                  width={300}
                  height={300}
                  className="min-w-full"
                  priority={true}
              />
            </Link>
          </div>
          <div className={"mr-2"}>
            <Button onClick={() => console.log("button")} title={"Sign in"}/>
          </div>
        </div>
      </header>
  );
};


export default Header;
