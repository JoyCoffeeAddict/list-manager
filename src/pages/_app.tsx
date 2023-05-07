import { type AppType } from "next/app"

import { api } from "~/utils/api"

import Head from "next/head"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "next-themes"
import "~/styles/globals.scss"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ClerkProvider {...pageProps}>
        <ThemeProvider>
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
        </ThemeProvider>
      </ClerkProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
