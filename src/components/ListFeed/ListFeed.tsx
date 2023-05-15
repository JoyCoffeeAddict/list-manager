import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import { useState } from "react"
import { api } from "~/utils/api"
import { ButtonPrimary } from "../Buttons/PrimaryButton"
import { ListComponent } from "../ListComponent/ListComponent"
import { LoadingPage } from "../Loader/Loader"
import { CreateListModal } from "../Modals/CreateListModal"
import styles from "./ListFeed.module.scss"

const NoListsComponent = () => {
  return (
    <div className="border-2 border-th-accent-medium p-3">
      <span>Start by creating your first list!</span>
    </div>
  )
}

export const ListsFeed = () => {
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false)

  const { data: lists, isLoading } = api.lists.getUserPrivateLists.useQuery(
    undefined,
    { refetchOnMount: false }
  )

  const { data: organizationLists, isLoading: isLoadingOrganizationLists } =
    api.lists.getCurrentUserOrganizationLists.useQuery(undefined, {
      refetchOnMount: false,
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
          <h2 className="p-4 pb-0">Your Private Lists: </h2>
          <ul className="mb-8 p-4">
            {lists != null && lists.length !== 0 ? (
              lists?.map(({ id, listName, organizationId }) => (
                <ListComponent
                  id={id}
                  listName={listName}
                  key={id}
                  organizationName={getOrganizationName(organizationId)}
                />
              ))
            ) : (
              <NoListsComponent />
            )}
          </ul>

          {organizationLists != null && organizationLists.length !== 0 ? (
            <>
              <h2 className="p-4 pb-0">
                {getOrganizationName(currentOrganization?.id)} Lists:{" "}
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
