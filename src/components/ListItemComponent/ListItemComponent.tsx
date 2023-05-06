import { useFormContext, type UseFieldArrayRemove } from "react-hook-form"
import { type SingleListForm } from "~/hooks/useList"
import { ButtonPrimary } from "../Buttons/PrimaryButton"
import { Checkbox } from "../Forms/Checkbox/Checkbox"
import { useListItem } from "./useListItem"

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
              className="w-full border-2 border-blue-400 bg-transparent p-2 outline-transparent focus:outline-transparent"
              {...register(contentKey)}
            />
          </label>
          <ButtonPrimary
            className="!rounded-none !border-l-0"
            onClick={clearInput}
          >
            clear
          </ButtonPrimary>
          <ButtonPrimary
            className="!rounded-none !border-l-0"
            onClick={() => remove(index)}
          >
            remove
          </ButtonPrimary>
        </label>
        {errors.list?.[index]?.content?.message != null ? (
          <span>{errors.list?.[index]?.content?.message}</span>
        ) : null}
      </li>
    </>
  )
}
