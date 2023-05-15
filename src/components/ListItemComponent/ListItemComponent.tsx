import { useFormContext, type UseFieldArrayRemove } from "react-hook-form"
import { type SingleListForm } from "~/hooks/useList"
import { ButtonPrimary } from "../Buttons/PrimaryButton"
import { Checkbox } from "../Forms/Checkbox/Checkbox"
import { useListItem } from "./useListItem"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDeleteLeft, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Position, Tooltip } from "../Tooltip/Tooltip"
import classNames from "classnames"

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
      <li className="m-4 flex flex-col focus-visible:outline-transparent">
        <label className="flex grow items-center">
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
          <span>{errors.list?.[index]?.content?.message}</span>
        ) : null}
      </li>
    </>
  )
}
