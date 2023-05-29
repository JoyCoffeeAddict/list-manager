import {
  faDeleteLeft,
  faTrash
} from "@fortawesome/free-solid-svg-icons"
import classNames from "classnames"
import {
  type UseFieldArrayReturn,
  useFormContext
} from "react-hook-form"
import { type SingleListForm } from "~/hooks/useList"
import { Logger } from "~/utils/logger"
import { ButtonIcon } from "../Buttons/ButtonIcon"
import { Checkbox } from "../Forms/Checkbox/Checkbox"
import { SwapDirection, SwapOrder } from "../SwapOrder/SwapOrder"
import { Position, Tooltip } from "../Tooltip/Tooltip"
import { useListItem } from "./useListItem"

interface ListItemComponentProps {
  index: number
  fieldArrayMethods: UseFieldArrayReturn<SingleListForm, "list", "formArrayId">
  disabled: boolean
  isLast: boolean
}

export const ListItemComponent = ({
  index,
  disabled,
  isLast,
  fieldArrayMethods,
}: ListItemComponentProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SingleListForm>()

  const { remove, swap } = fieldArrayMethods

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

  const handleSwap = (direction: SwapDirection) => {
    if (direction === SwapDirection.Up && index !== 0) {
      swap(index, index - 1)
      return
    }

    if (direction === SwapDirection.Down && !isLast) {
      swap(index, index + 1)
      return
    }

    Logger.error("This swap should not occur")
  }
  return (
    <li className="m-2 flex flex-col focus-visible:outline-transparent md:m-4">
      <div className="flex grow items-center">
          <SwapOrder
            handleSwap={handleSwap}
            isFirst={index === 0}
            isLast={isLast}
          />
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
