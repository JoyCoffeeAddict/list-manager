import { ButtonPrimary } from "../Buttons/PrimaryButton"
import { ListComponent } from "../ListComponent/ListComponent"
import { LoadingPage } from "../Loader/Loader"
import { CreateListModal } from "../Modals/CreateListModal"
import styles from "./ListFeed.module.scss"
import { useListFeed } from "./useListFeed"

export const ListsFeed = () => {
  const {
    currentOrganization,
    getOrganizationName,
    isCreateListModalOpen,
    isLoadingLists,
    isLoadingOrganizationLists,
    lists,
    organizationLists,
    setIsCreateListModalOpen,
    listOfOrganizations,
  } = useListFeed()

  if (isLoadingLists || isLoadingOrganizationLists) {
    return <LoadingPage />
  }
  return (
    <>
      <div className={styles.feedWrapper}>
        <div className="flex flex-1 flex-col  overflow-y-auto">
          {(lists == null || lists.length === 0) &&
          (organizationLists == null || organizationLists.length === 0) ? (
            <h1 className="p-4 text-center text-3xl">
              Start by creating your first list!
            </h1>
          ) : null}
          {lists != null &&
          listOfOrganizations != null &&
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

          {currentOrganization != null && currentOrganization.id != null ? (
            <h2 className="p-4 pb-0">
              {getOrganizationName(currentOrganization?.id)} Lists:
            </h2>
          ) : null}
          {organizationLists != null && organizationLists.length !== 0 ? (
            <ul className="mb-8 p-4">
              {organizationLists?.map(({ id, listName }) => (
                <ListComponent id={id} listName={listName} key={id} />
              ))}
            </ul>
          ) : (
            <h3 className="p-4 pb-0">
              Your organization does not have any lists, let&apos;s add some of
              your private lists to this organization.
            </h3>
          )}
        </div>
        <div className="flex justify-center p-4">
          <ButtonPrimary
            type="button"
            onClick={() => setIsCreateListModalOpen(true)}
            disabled={isCreateListModalOpen}
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
