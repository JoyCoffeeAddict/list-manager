import { useUser } from "@clerk/nextjs"
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useState } from "react"
import { api } from "~/utils/api"
import { ButtonPrimary } from "../Buttons/PrimaryButton"
import { LoadingPage } from "../Loader/Loader"
import { CreateListModal } from "../Modals/CreateListModal"
import { RenameListModal } from "../Modals/RenameListModal"
import { Position, Tooltip } from "../Tooltip/Tooltip"
import styles from "./ListFeed.module.scss"
import { useLitsFeed } from "./useListFeed"
const NoListsComponent = () => {
  return (
    <div className="border-2 border-th-accent-medium p-3">
      <span>Start by creating your first list!</span>
    </div>
  )
}

const ListName = ({ id, listName }: { id: string; listName: string }) => {
  const [isRenameListModalOpen, setIsRenameListModalOpen] = useState(false)
  const { onRemoveList } = useLitsFeed()

  return (
    <>
      <li className={styles.listNameComponent}>
        <Link href={`/${id}`}>
          <div className="border-2 border-th-accent-medium p-3">
            <span>{listName} </span>
          </div>
        </Link>
        <Tooltip title="Rename" position={Position.Left}>
          <ButtonPrimary
            className={styles.listNameAction}
            onClick={() => {
              setIsRenameListModalOpen(true)
            }}
            type="button"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </ButtonPrimary>
        </Tooltip>
        <Tooltip title="Delete" position={Position.Left}>
          <ButtonPrimary
            className={styles.listNameAction}
            onClick={() => {
              onRemoveList(id)
            }}
            type="button"
          >
            <FontAwesomeIcon icon={faTrash} />
          </ButtonPrimary>
        </Tooltip>
      </li>
      {isRenameListModalOpen ? (
        <RenameListModal
          isOpen={isRenameListModalOpen}
          handleClose={() => setIsRenameListModalOpen(false)}
          id={id}
        />
      ) : null}
    </>
  )
}

export const ListsFeed = () => {
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
              <ListName id={id} listName={listName} key={id} />
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
