import type {Metadata} from 'next'
import '../styles/globals.css'
import React from "react";
import Providers from "@/app/providers";
import Layout from "@/layouts/Layout";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <body className="bg-zinc-200 text-black">
      <Providers>
        <Layout>
          {children}
        </Layout>
      </Providers>
      </body>
      </html>
  )
}
