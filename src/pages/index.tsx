import { SignInButton, useUser } from "@clerk/nextjs"
import { type NextPage } from "next"
import Link from "next/link"
import { LoginButton } from "~/components/Buttons/LoginButton"
import { Loader, LoadingPage } from "~/components/Loader/Loader"
import { MainLayout } from "~/components/mainLayout"
import { api } from "~/utils/api"

const SignIn = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <span>Dive into List Manager</span>

      <LoginButton />
    </div>
  )
}

const ListsFeed = () => {
  const { user } = useUser()
  if (user == null) return null

  const { data } = api.lists.getAllListsForCurrentUser.useQuery({
    userId: user.id,
  })

  console.log(data)
  return (
    <div>
      <h2 className="mb-3">Your Lists: </h2>
      {data?.map(({ id, listName }) => (
        <Link href={`/${id}`} key={id}>
          <div className="border-2 border-blue-400 p-3">
            <span>{listName} </span>
          </div>
        </Link>
      ))}
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
          {!isSignedIn ? <SignIn /> : <ListsFeed />}
        </div>
      </main>
    </MainLayout>
  )
}

export default Home
