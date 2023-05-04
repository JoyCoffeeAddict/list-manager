import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/router"
import { UseFieldArrayRemove, useFormContext } from "react-hook-form"
import { SingleListForm } from "~/hooks/useList"
import { ButtonPrimary } from "../Buttons/PrimaryButton"
import { useListItem } from "./useListItem"
import { Checkbox } from "../Forms/Checkbox/Checkbox"

export const ListItemComponent = ({
  index,
  remove,
}: {
  index: number
  remove: UseFieldArrayRemove
}) => {
  const router = useRouter()
  const { listId } = router.query
  const newListId = typeof listId === "string" && listId != null ? listId : ""
  const { user } = useUser()
  // const {
  //   isLoading,
  //   methods,
  //   data,
  //   onSubmit,
  //   onInvalidSubmit,
  //   fieldArrayMethods,
  // } = useList({
  //   listId: newListId,
  // })

  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<SingleListForm>()

  const { clearInput, contentKey, checkedKey } = useListItem({ index })

  return (
    <>
      <li className="my-4 flex focus-visible:outline-transparent">
        <Checkbox formName={checkedKey} />
        <input
          className="grow border-2 border-blue-400 bg-transparent p-2 outline-transparent focus-visible:outline-transparent"
          {...register(contentKey)}
        />
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
      </li>
      {errors.list?.[index]?.content?.message != null ? (
        <span>{errors.list?.[index]?.content?.message}</span>
      ) : null}
    </>
  )
}
