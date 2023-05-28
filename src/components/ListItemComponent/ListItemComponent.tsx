import {
  faCaretDown,
  faCaretUp,
  faDeleteLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import { useFormContext, type UseFieldArrayRemove } from "react-hook-form"
import { type SingleListForm } from "~/hooks/useList"
import { Checkbox } from "../Forms/Checkbox/Checkbox"
import { Position, Tooltip } from "../Tooltip/Tooltip"
import { useListItem } from "./useListItem"
import { ButtonIcon } from "../Buttons/ButtonIcon"

export const ListItemComponent = ({
  index,
  remove,
  disabled,
  isLast,
}: {
  index: number
  remove: UseFieldArrayRemove
  disabled: boolean
  isLast: boolean
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SingleListForm>()

  const { onClearInput, contentKey, checkedKey } = useListItem({
    index,
    disabled,
  })

  const onRemoveItem = () => {
    if (disabled) {
      return
    }

    remove(index)
  }

  const errorMessage = errors.list?.[index]?.content?.message

  return (
    <li className="m-2 flex flex-col focus-visible:outline-transparent md:m-4">
      {/* Swap order */}
      <div className="flex grow items-center">
        <div className="flex flex-col pr-2">
          <button
            disabled={index === 0}
            type="button"
            className=" translate-y-1  text-2xl leading-none text-th-accent-medium hover:text-th-accent-medium md:text-inherit"
          >
            <FontAwesomeIcon icon={faCaretUp} />
          </button>
          <button
            type="button"
            className="-translate-y-1 text-2xl leading-none text-th-accent-medium hover:text-th-accent-medium md:text-inherit"
            disabled={isLast}
          >
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
        </div>
        <span className={classNames({ disabled: disabled })}>{index + 1}.</span>
        <Checkbox formName={checkedKey} disabled={disabled} />
        <label aria-label={`item number ${index + 1}`} className="grow">
          <input
            className="w-full border-2 border-th-accent-medium bg-transparent p-2 outline-transparent focus:outline-transparent"
            {...register(contentKey)}
            disabled={disabled}
          />
        </label>
        <Tooltip title="Clear" position={Position.Left} disabled={disabled}>
          <ButtonIcon
            icon={faDeleteLeft}
            className="!rounded-none !border-l-0"
            onClick={onClearInput}
            disabled={disabled}
            type="button"
          />
        </Tooltip>
        <Tooltip title="Delete" position={Position.Left} disabled={disabled}>
          <ButtonIcon
            className="!rounded-none !border-l-0"
            onClick={onRemoveItem}
            disabled={disabled}
            icon={faTrash}
            type="button"
          />
        </Tooltip>
      </div>
      {errorMessage != null ? (
        <span className="text-center text-th-error">{errorMessage}</span>
      ) : null}
    </li>
  )
}
