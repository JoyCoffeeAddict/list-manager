import {
  faCircleArrowRight,
  faHouseCircleCheck,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useState } from "react"
import { api } from "~/utils/api"
import { ButtonPrimary } from "../Buttons/PrimaryButton"
import { RenameListModal } from "../Modals/RenameListModal"
import { Position, Tooltip } from "../Tooltip/Tooltip"

import styles from "./ListComponent.module.scss"
import { useListComponent } from "./useListComponent"
import { ConfirmDialog } from "../Modals/ConfirmDialog"

interface ListComponentProps {
  id: string
  listName: string
  organizationName?: string
}

export const ListComponent = ({
  id,
  listName,
  organizationName,
}: ListComponentProps) => {
  const [isRenameListModalOpen, setIsRenameListModalOpen] = useState(false)
  const [isDeleteListModalOpen, setIsDeleteListModalOpen] = useState(false)

  const { onRemoveList, organization, onAssignListToorganization } =
    useListComponent({ id })
  const ctx = api.useContext()

  return (
    <>
      <li className={styles.listNameComponent}>
        <Link href={`/${id}`}>
          <div className="flex w-auto items-center justify-between border-2 border-th-accent-medium p-3">
            <span>
              {listName}
              {organizationName != null ? ` (${organizationName})` : null}
            </span>
            <span className="pl-4">
              <FontAwesomeIcon icon={faCircleArrowRight} />
            </span>
          </div>
        </Link>
        <div className="flex">
          {organization != null ? (
            <Tooltip
              title="Add to current organization"
              position={Position.Left}
            >
              <ButtonPrimary
                className={styles.listNameAction}
                onClick={onAssignListToorganization}
                type="button"
              >
                <FontAwesomeIcon icon={faHouseCircleCheck} />
              </ButtonPrimary>
            </Tooltip>
          ) : null}
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
              onClick={() => setIsDeleteListModalOpen(true)}
              type="button"
            >
              <FontAwesomeIcon icon={faTrash} />
            </ButtonPrimary>
          </Tooltip>
        </div>
      </li>
      {isRenameListModalOpen ? (
        <RenameListModal
          isOpen={isRenameListModalOpen}
          handleClose={() => {
            void ctx.lists.getUserPrivateLists.invalidate()
            setIsRenameListModalOpen(false)
          }}
          id={id}
        />
      ) : null}
      {isDeleteListModalOpen ? (
        <ConfirmDialog
          isOpen={isDeleteListModalOpen}
          handleClose={() => setIsDeleteListModalOpen(false)}
          handleConfirm={onRemoveList}
          title="Do you want to delete this list?"
          description="This is irreversable! You will delete this list and all of it's list items"
        />
      ) : null}
    </>
  )
}
