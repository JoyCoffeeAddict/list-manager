import { SignOutButton, useUser } from "@clerk/nextjs"
import Image from "next/image"
import { PropsWithChildren } from "react"

export const MainLayout = (props: PropsWithChildren) => {
  const { isSignedIn, user } = useUser()

  return (
    <>
      <nav className="absolute top-0 flex w-full justify-between border-b-2 border-blue-400 p-4 text-white">
        <div>
          <div className=" flex items-center gap-2">
            <Image src="/favicon.ico" width={32} height={32} alt="logo" />
            <span>List Manager</span>
          </div>
        </div>
        <div className="flex gap-2 pr-4">
          {isSignedIn && user != null ? (
            <>
              <Image
                src={user.profileImageUrl}
                alt={`${user.username || ""}'s profile pic`}
                width={32}
                height={32}
              />
              <SignOutButton> Sign out </SignOutButton>
            </>
          ) : null}
        </div>
      </nav>
      <>{props.children}</>
    </>
  )
}
