import { useUser } from "@clerk/nextjs"
import { type NextPage } from "next"
import Link from "next/link"
import { useState } from "react"
import { LoginButton } from "~/components/Buttons/LoginButton"
import { ButtonPrimary } from "~/components/Buttons/PrimaryButton"
import { LoadingPage } from "~/components/Loader/Loader"
import { CreateListModal } from "~/components/Modals/CreateListModal"
import { MainLayout } from "~/Layouts/mainLayout"
import { api } from "~/utils/api"

const SignIn = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <span>Dive into List Manager</span>

      <LoginButton />
    </div>
  )
}

const NoListsComponent = () => {
  return (
    <div className="border-2 border-th-accent-medium p-3">
      <span>Start by creating your first list!</span>
    </div>
  )
}

const ListsFeed = () => {
  const { user } = useUser()
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false)

  if (user == null) return null

  const { data: lists, isLoading } =
    api.lists.getAllListsForCurrentUser.useQuery()

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <>
      <div className="flex h-full flex-col overflow-hidden border-x-2 border-b-2 border-th-accent-medium">
        <h2 className="p-4 pb-0">Your Lists: </h2>
        <ul className="mb-8 h-full overflow-y-auto p-4">
          {lists != null && lists.length !== 0 ? (
            lists?.map(({ id, listName }) => (
              <Link href={`/${id}`} key={id}>
                <li className="my-4">
                  <div className="border-2 border-th-accent-medium p-3">
                    <span>{listName} </span>
                  </div>
                </li>
              </Link>
            ))
          ) : (
            <NoListsComponent />
          )}
        </ul>
        <div className="flex justify-center p-4">
          <ButtonPrimary
            type="button"
            onClick={() => setIsCreateListModalOpen(true)}
          >
            Add new List
          </ButtonPrimary>
        </div>
      </div>

      <CreateListModal
        isOpen={isCreateListModalOpen}
        handleClose={() => setIsCreateListModalOpen(false)}
        sequence={lists?.length || 0}
      />
    </>
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
        {!isSignedIn ? <SignIn /> : <ListsFeed />}
      </div>
    </MainLayout>
  )
}

export default Home
