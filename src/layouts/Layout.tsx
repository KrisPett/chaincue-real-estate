"use client"

import React, {ReactNode} from "react";
import Header from "./Header";
import Footer from "@/layouts/Footer";

type Props = {
  children: ReactNode;
};

const Layout = ({children}: Props) => {
  return (
      <div style={{minHeight: '100vh'}} className={"flex flex-col"}>
        <Header/>
        <main className="flex-1">{children}</main>
        <Footer/>
      </div>
  );
};

export default Layout;
