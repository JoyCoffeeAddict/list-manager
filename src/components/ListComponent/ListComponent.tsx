import {
  faCircleArrowRight,
  faHouseCircleCheck,
  faHouseCircleXmark,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useState } from "react"
import { RenameListModal } from "../Modals/RenameListModal"
import { Position, Tooltip } from "../Tooltip/Tooltip"

import { ButtonIcon } from "../Buttons/ButtonIcon"
import { ConfirmDialog } from "../Modals/ConfirmDialog"
import { useListComponent } from "./useListComponent"

interface ListComponentProps {
  id: string
  listName: string
  isPrivate: boolean
}

export const ListComponent = ({
  id,
  listName,
  isPrivate,
}: ListComponentProps) => {
  const [isRenameListModalOpen, setIsRenameListModalOpen] = useState(false)
  const [isDeleteListModalOpen, setIsDeleteListModalOpen] = useState(false)

  const {
    onRemoveList,
    organization,
    onAssignListToOrganization,
    onRemoveListFromOrganization,
  } = useListComponent({ id })

  return (
    <>
      <li className="my-2 flex">
        <Link href={`/${id}`} className="contents">
          <div className="flex grow items-center justify-between border-2 border-th-accent-medium p-3">
            <span>{listName}</span>
            <span className="pl-4 text-th-accent-medium sm:text-inherit">
              <FontAwesomeIcon icon={faCircleArrowRight} />
            </span>
          </div>
        </Link>
        <div className="flex">
          {organization != null && isPrivate ? (
            <Tooltip
              title="Add to current organization"
              position={Position.Left}
            >
              <ButtonIcon
                className="h-full !rounded-none !border-l-0 py-3"
                onClick={onAssignListToOrganization}
                type="button"
                icon={faHouseCircleCheck}
              />
            </Tooltip>
          ) : null}

          {organization != null && !isPrivate ? (
            <Tooltip
              title="Remove from current organization"
              position={Position.Left}
            >
              <ButtonIcon
                className="h-full !rounded-none !border-l-0 py-3"
                onClick={onRemoveListFromOrganization}
                type="button"
                icon={faHouseCircleXmark}
              />
            </Tooltip>
          ) : null}
          <Tooltip title="Rename" position={Position.Left}>
            <ButtonIcon
              className="h-full !rounded-none !border-l-0 py-3"
              onClick={() => {
                setIsRenameListModalOpen(true)
              }}
              type="button"
              icon={faPenToSquare}
            />
          </Tooltip>
          <Tooltip title="Delete" position={Position.Left}>
            <ButtonIcon
              className="h-full !rounded-none !border-l-0 py-3"
              onClick={() => setIsDeleteListModalOpen(true)}
              type="button"
              icon={faTrash}
            />
          </Tooltip>
        </div>
      </li>

      {isRenameListModalOpen ? (
        <RenameListModal
          isOpen={isRenameListModalOpen}
          handleClose={
            () => {
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
