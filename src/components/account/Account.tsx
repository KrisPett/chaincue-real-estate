"use client"
import React, {useEffect, useState} from 'react';
import {getSession, signIn, useSession} from "next-auth/react";
import Button from "@/lib/Button";
import {useRouter} from "next/navigation";
import {AccountPageDTO} from "@/components/account/AccountPageDTO";

interface AccountProps {
  data: AccountPageDTO
}

const Account = (props: AccountProps) => {
  const {data: session} = useSession();
  const router = useRouter();

  const [email, setEmail] = useState<string>(session ? session.user.email : "");

  useEffect(() => {
    if (session) setEmail(session.user.email)
  }, [session]);

  const onClickChangePassword = async () => {
    const session = await getSession();
    if (session) {
      const clientId = "real-estate-client"
      const clientRootUrl = window.location.href
      const url = `https://auth.chaincuet.com/auth/realms/real-estate/protocol/openid-connect/auth?client_id=${clientId}&redirect_uri=${clientRootUrl}/&response_type=code&scope=openid&kc_action=UPDATE_PASSWORD`
      router.replace(url)
    }
  };

  return (<>
        {session !== null ? <>
          <div className={"flex justify-center gap-5 mt-10"}>
            <div className={"flex flex-col gap-5 w-full max-w-screen-md p-1"}>
              <section>
                <p className={"text-4xl text-amber-700"}>Account</p>
              </section>
              <section>
                <p className={"text-amber-700"}>Email: {email}</p>
              </section>
              <section>
                <Button title={"Change Password"} onClick={() => onClickChangePassword()}/>
              </section>
            </div>
          </div>
        </> : <>
          <div className={"flex justify-center gap-5 mt-10"}>
            <div className={"flex flex-col gap-5 w-full max-w-screen-md p-1"}>
              <section>
                <p className={"text-3xl text-amber-700 text-center"}>Sign in to access account page</p>
              </section>
              <section className={`block`}>
                <Button onClick={() => signIn('keycloak')} title={"Sign in"}/>
              </section>
            </div>
          </div>
        </>}

      </>
  );
};

export default Account;
