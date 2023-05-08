import { useFormContext, type UseFieldArrayRemove } from "react-hook-form"
import { type SingleListForm } from "~/hooks/useList"
import { ButtonPrimary } from "../Buttons/PrimaryButton"
import { Checkbox } from "../Forms/Checkbox/Checkbox"
import { useListItem } from "./useListItem"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDeleteLeft, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Position, Tooltip } from "../Tooltip/Tooltip"

export const ListItemComponent = ({
  index,
  remove,
}: {
  index: number
  remove: UseFieldArrayRemove
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
          <Checkbox formName={checkedKey} />
          <label aria-label={`item number ${index + 1}`} className="grow">
            <input
              className="w-full border-2 border-th-accent-medium bg-transparent p-2 outline-transparent focus:outline-transparent"
              {...register(contentKey)}
            />
          </label>
          <Tooltip title="Clear" position={Position.Left}>
            <ButtonPrimary
              className="!rounded-none !border-l-0"
              onClick={clearInput}
            >
              <FontAwesomeIcon icon={faDeleteLeft} />
            </ButtonPrimary>
          </Tooltip>
          <Tooltip title="Delete" position={Position.Left}>
            <ButtonPrimary
              className="!rounded-none !border-l-0"
              onClick={() => remove(index)}
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
