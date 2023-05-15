import { SignedIn, SignedOut } from "@clerk/nextjs"
import { type PropsWithChildren } from "react"

import { AuthedNavbar } from "./AuthedNavbar"
import { NotAuthedNavbar } from "./NotAuthedNavbar"
import styles from "./mainLayout.module.scss"

export const MainLayout = ({
  children,
  listName,
}: PropsWithChildren<{ listName?: string }>) => {
  return (
    <div className={styles.layout}>
      <SignedIn>
        <AuthedNavbar listName={listName} />
      </SignedIn>

      <SignedOut>
        <NotAuthedNavbar />
      </SignedOut>
      <main className="flex w-full items-center justify-center overflow-hidden  pb-20 ">
        {children}
      </main>
    </div>
  )
}
