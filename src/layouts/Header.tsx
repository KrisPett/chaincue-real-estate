"use client"
import React from "react";
import Image from "next/image";
import chaincueLogo from "../assets/images/chaincue-real-estate-logo.png";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Button from "@/lib/Button";
import {getSession, signIn, signOut, useSession} from "next-auth/react";

const Header = () => {
  const router = useRouter();
  const {data: session} = useSession();

  const handleSignOut = async () => {
    const s = await getSession();
    if (s && s.id_token) {
      const post_logout_redirect_uri = process.env.NEXT_PUBLIC_CLIENT_URL;
      const logoutUrl = `https://auth.chaincuet.com/auth/realms/real-estate/protocol/openid-connect/logout?id_token_hint=${s.id_token}&post_logout_redirect_uri=${post_logout_redirect_uri}`;
      signOut().then(() => router.replace(logoutUrl));
    }
    if (!s?.id_token) {
      console.log(s)
    }
  };

  return (
      <header
          className={
            "top-0 left-0 right-0 z-10 w-full bg-zinc-300 from-zinc-600 to-gray-500 dark:bg-zinc-600 dark:bg-gradient-to-r"
          }
      >
        <div className={"flex items-center justify-between py-3"}>
          <div className={"flex items-center"}>
            <div className={"hidden md:block"}>
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
            <div className={"ml-2"}>
              <Button onClick={() => router.push("/add-property")} title={"Add Property"}/>
            </div>
          </div>
          <div className={"mr-2"}>

            <section className={`${session ? "hidden" : "block"}`}>
              <Button onClick={() => signIn('keycloak')} title={"Sign in"}/>
            </section>

            <section aria-label={"profile-dropdown"}
                     className={`${!session ? "hidden" : "block"}`}>
              <div className={""}>
                <div className="dropdown-hover dropdown dropdown-end">
                  <label tabIndex={0}
                         className="btn-ghost border-2 border-amber-500 rounded-4xl w-20 text-lg hover:border-amber-500 btn text-amber-700 font-normal normal-case"
                         onClick={() => router.push("/account")}
                  >
                    {session?.user.email.charAt(0).toUpperCase()}
                  </label>
                  <ul tabIndex={0}
                      className="dropdown-content rounded bg-zinc-50 opacity-10 ">
                    <li className={""}>
                      <Link href={"/account"} replace
                            className={"btn-ghost font-normal btn text-base capitalize text-gray-600 hover:text-amber-600 w-40"}>
                        Account
                      </Link>
                    </li>
                    <li>
                      <button
                          className={"btn-ghost btn text-base font-normal capitalize text-gray-600 hover:text-amber-600 w-40"}
                          onClick={() => handleSignOut()}>
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

          </div>
        </div>
      </header>
  );
};


export default Header;
