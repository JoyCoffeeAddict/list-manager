import { SignInButton, useUser } from "@clerk/nextjs"
import { type NextPage } from "next"
import { LoginButton } from "~/components/Buttons/LoginButton"
import { Loader, LoadingPage } from "~/components/Loader/Loader"
import { MainLayout } from "~/components/mainLayout"

const SignIn = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <span>Dive into List Manager</span>

      <LoginButton />
    </div>
  )
}

const Home: NextPage = () => {
  const { isSignedIn = false, isLoaded } = useUser()
  console.log(isLoaded)

  if (!isLoaded) {
    return <LoadingPage />
  }

  return (
    <MainLayout>
      <main className="flex h-screen flex-col items-center justify-center ">
        <div className="mt-[66px] h-full w-full overflow-y-auto overflow-x-hidden border-x-2 border-blue-400 p-4 md:max-w-2xl">
          {!isSignedIn ? <SignIn /> : null}
        </div>
      </main>
    </MainLayout>
  )
}

export default Home
