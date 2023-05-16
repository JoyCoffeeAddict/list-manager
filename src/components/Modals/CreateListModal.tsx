import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import { useForm, type SubmitErrorHandler } from "react-hook-form"
import { api } from "~/utils/api"
import { Logger } from "~/utils/logger"
import { newListSchema, type newListType } from "~/utils/schemas/listSchemas"
import { ButtonPrimary } from "../Buttons/PrimaryButton"
import { BasicModal } from "./BasicModal"

interface CreateListModalProps {
  isOpen: boolean
  handleClose: () => void
  sequence: number
}

export const CreateListModal = ({
  isOpen,
  handleClose,
  sequence,
}: CreateListModalProps) => {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<newListType>({
    defaultValues: { listName: "", sequence },
    resolver: zodResolver(newListSchema),
  })
  const { mutate: createList } = api.lists.createList.useMutation()

  const onSubmit = ({ listName }: newListType) => {
    createList(
      { listName, sequence },
      {
        onSuccess: (newList) => {
          void router.push(`/${newList.id}`)
        },
      }
    )
  }

  if (!isOpen) return null

  const onInvalidSubmit: SubmitErrorHandler<newListType> = (error) => {
    Logger.error(error)
  }
  return (
    <BasicModal>
      <div className="absolute inset-0 z-50 h-screen  w-screen ">
        {/* Overlay */}
        <div
          className="z-10 h-screen w-screen bg-white  bg-opacity-60 backdrop-blur-sm"
          onClick={handleClose}
        ></div>
        {/* content */}
        <div className=" absolute left-1/2 top-1/2 z-20 grid h-80 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-th-primary-light bg-th-background bg-th-background-gradient p-8 text-th-primary-medium shadow-2xl ">
          <div className="grid grid-rows-1 ">
            <h2 className="inline justify-self-center text-2xl">
              How would you like to name your new list?
            </h2>
            <span
              onClick={handleClose}
              className="absolute right-0 top-0 cursor-pointer p-4 text-2xl"
            >
              x
            </span>
          </div>

          <form
            className="grid h-full place-items-center "
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
          >
            <span className="flex w-full flex-col items-center">
              <input
                type="text"
                className="m-2 w-3/4 border-2 border-th-accent-medium bg-transparent p-2"
                {...register("listName")}
              />
              <div>{errors.listName?.message}</div>
            </span>

            <div className="flex gap-4 place-self-end">
              <ButtonPrimary type="button" onClick={handleClose}>
                cancel
              </ButtonPrimary>
              <ButtonPrimary type="submit">save</ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    </BasicModal>
  )
}
