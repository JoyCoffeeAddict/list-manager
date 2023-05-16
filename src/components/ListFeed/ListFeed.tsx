import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import { useState } from "react"
import { api } from "~/utils/api"
import { ButtonPrimary } from "../Buttons/PrimaryButton"
import { ListComponent } from "../ListComponent/ListComponent"
import { LoadingPage } from "../Loader/Loader"
import { CreateListModal } from "../Modals/CreateListModal"
import styles from "./ListFeed.module.scss"

export const ListsFeed = () => {
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false)

  const { data: lists, isLoading } = api.lists.getUserPrivateLists.useQuery(
    undefined,
    { refetchOnMount: true, refetchOnWindowFocus: false }
  )

  const { data: organizationLists, isLoading: isLoadingOrganizationLists } =
    api.lists.getCurrentUserOrganizationLists.useQuery(undefined, {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    })

  const { organizationList } = useOrganizationList()
  const { organization: currentOrganization } = useOrganization()

  if (isLoading || isLoadingOrganizationLists) {
    return <LoadingPage />
  }

  const getOrganizationName = (organizationId?: string | null) => {
    if (organizationList == null || organizationId == null) {
      return
    }

    const searchedOrg = organizationList.find(
      ({ organization }) => organization.id === organizationId
    )
    if (searchedOrg == null) {
      return
    }

    const name = searchedOrg.organization.name

    return name
  }

  return (
    <>
      <div className={styles.feedWrapper}>
        <div className="flex flex-1 flex-col  overflow-y-auto">
          {lists != null &&
          organizationList != null &&
          lists.length === 0 &&
          organizationLists?.length !== 0 ? (
            <h2 className="p-4 pb-0">
              You don&apos;t have any private list yet!
            </h2>
          ) : null}
          {lists != null && lists.length !== 0 ? (
            <>
              <h2 className="p-4 pb-0">Your Private Lists: </h2>
              <ul className="mb-8 p-4">
                {lists?.map(({ id, listName, organizationId }) => (
                  <ListComponent
                    id={id}
                    listName={listName}
                    key={id}
                    organizationName={getOrganizationName(organizationId)}
                  />
                ))}
              </ul>
            </>
          ) : null}

          {(lists == null || lists.length === 0) &&
          (organizationLists == null || organizationLists.length === 0) ? (
            <h1 className="p-4 text-center text-3xl">
              Start by creating your first list!
            </h1>
          ) : null}

          {organizationLists != null && organizationLists.length !== 0 ? (
            <>
              <h2 className="p-4 pb-0">
                {getOrganizationName(currentOrganization?.id)} Lists:
              </h2>

              <ul className="mb-8 p-4">
                {organizationLists?.map(({ id, listName }) => (
                  <ListComponent id={id} listName={listName} key={id} />
                ))}
              </ul>
            </>
          ) : null}
        </div>
        <div className="flex justify-center p-4">
          <ButtonPrimary
            type="button"
            onClick={() => setIsCreateListModalOpen(true)}
          >
            Add new List
          </ButtonPrimary>
        </div>
      </div>
      {isCreateListModalOpen ? (
        <CreateListModal
          isOpen={isCreateListModalOpen}
          handleClose={() => setIsCreateListModalOpen(false)}
          sequence={lists?.length || 0}
        />
      ) : null}
    </>
  )
}
