import { SignedIn, useUser } from "@clerk/nextjs"
import { type NextPage } from "next"
import { LoginButton, RegisterButton } from "~/components/Buttons/LoginButton"
import { ListsFeed } from "~/components/ListFeed/ListFeed"
import { LoadingPage } from "~/components/Loader/Loader"
import { MainLayout } from "~/Layouts/mainLayout"

const SignIn = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <h1 className="text-3xl">Dive into List Manager</h1>
      <h2 className="mb-2 text-xl">
        World&apos;s first application for sharable list.
      </h2>
      <h3 className="text-center text-lg">
        Create Todo Lists, Shopping Lists, then easily share with others!
      </h3>
      <div className="mt-4 flex items-center gap-3">
        <LoginButton />

        <span>or</span>
        <RegisterButton />
      </div>
    </div>
  )
}

const Home: NextPage = () => {
  const { isSignedIn = false, isLoaded } = useUser()

  if (!isLoaded) {
    return <LoadingPage />
  }

  return (
    <MainLayout>
      <div className="h-full w-full overflow-hidden overflow-y-auto overflow-x-hidden md:max-w-2xl">
        {!isSignedIn ? (
          <SignIn />
        ) : (
          <SignedIn>
            <ListsFeed />
          </SignedIn>
        )}
      </div>
    </MainLayout>
  )
}

export default Home
