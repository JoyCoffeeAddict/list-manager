import { type AppType } from "next/app"

import { api } from "~/utils/api"

import "~/styles/globals.css"
import Head from "next/head"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "react-hot-toast"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ClerkProvider {...pageProps}>
        <Head>
          <title>List manager</title>
          <meta
            name="description"
            content="Basic lsit manager for easily sharing content"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Toaster position="bottom-right" />
        <Component {...pageProps} />
      </ClerkProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
