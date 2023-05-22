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
import { ButtonPrimary } from "../Buttons/PrimaryButton"
import { Checkbox } from "../Forms/Checkbox/Checkbox"
import { Position, Tooltip } from "../Tooltip/Tooltip"
import styles from "./ListItemComponent.module.scss"
import { useListItem } from "./useListItem"

export const ListItemComponent = ({
  index,
  remove,
  disabled,
}: {
  index: number
  remove: UseFieldArrayRemove
  disabled: boolean
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SingleListForm>()

  const { clearInput, contentKey, checkedKey } = useListItem({ index })

  return (
    <>
      <li
        className={classNames(
          styles.listItem,
          "m-4 flex flex-col focus-visible:outline-transparent"
        )}
      >
        <div className="flex flex-col px-2">
          <button className=" translate-y-1  text-2xl leading-none hover:text-th-accent-medium">
            <FontAwesomeIcon icon={faCaretUp} />
          </button>
          <button className="-translate-y-1 text-2xl leading-none hover:text-th-accent-medium">
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
        </div>
        <label className="flex grow items-center">
          {/* Swap order */}

          <span>{index + 1}.</span>
          <Checkbox formName={checkedKey} disabled={disabled} />
          <label aria-label={`item number ${index + 1}`} className="grow">
            <input
              className={classNames(
                "w-full border-2 border-th-accent-medium bg-transparent p-2 outline-transparent focus:outline-transparent",
                { disabled: disabled }
              )}
              {...register(contentKey)}
              disabled={disabled}
            />
          </label>
          <Tooltip title="Clear" position={Position.Left}>
            <ButtonPrimary
              className="!rounded-none !border-l-0"
              onClick={clearInput}
              disabled={disabled}
            >
              <FontAwesomeIcon icon={faDeleteLeft} />
            </ButtonPrimary>
          </Tooltip>
          <Tooltip title="Delete" position={Position.Left}>
            <ButtonPrimary
              className="!rounded-none !border-l-0"
              onClick={() => remove(index)}
              disabled={disabled}
            >
              <FontAwesomeIcon icon={faTrash} />
            </ButtonPrimary>
          </Tooltip>
        </label>
        {errors.list?.[index]?.content?.message != null ? (
          <span className={styles.errorMessage}>
            {errors.list?.[index]?.content?.message}
          </span>
        ) : null}
      </li>
    </>
  )
}
