import { SignOutButton, useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { type PropsWithChildren } from "react"

import styles from "./mainLayout.module.scss"
import { ThemeChanger } from "~/components/ThemeChanger"

export const MainLayout = ({
  children,
  listName,
}: PropsWithChildren<{ listName?: string }>) => {
  const { isSignedIn, user } = useUser()
  const router = useRouter()

  return (
    <div className={styles.layout}>
      <nav className="grid w-full grid-cols-3 items-center border-b-2 border-th-accent-medium p-4 text-th-primary-dark">
        <div>
          <Link href="/" className=" flex items-center gap-2">
            <Image src="/favicon.ico" width={32} height={32} alt="logo" />
            <span>List Manager</span>
          </Link>
        </div>
        <span className="justify-self-center text-2xl leading-none">
          {listName || ""}
        </span>
        <div className="flex gap-2 justify-self-end pr-4">
          <ThemeChanger />
          {isSignedIn && user != null ? (
            <>
              <Image
                src={user.profileImageUrl}
                alt={`${user.username || ""}'s profile pic`}
                width={32}
                height={32}
              />
              <SignOutButton
                signOutCallback={async () => {
                  await router.push("/")
                }}
              >
                Sign out
              </SignOutButton>
            </>
          ) : null}
        </div>
      </nav>
      <main className="flex w-full items-center justify-center overflow-hidden  pb-20 ">
        {children}
      </main>
    </div>
  )
}
