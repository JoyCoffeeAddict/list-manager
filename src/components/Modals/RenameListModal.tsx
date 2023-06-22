import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitErrorHandler } from "react-hook-form"
import { Logger } from "~/utils/logger"
import {
  renameListSchema,
  type renameListType,
} from "~/utils/schemas/listSchemas"
import { ButtonPrimary } from "../Buttons/PrimaryButton"
import { useListComponent } from "../ListComponent/useListComponent"
import { BasicModal } from "./BasicModal"
import { api } from "~/utils/api"
import { Loader } from "../Loader/Loader"

interface RenameListModalProps {
  isOpen: boolean
  handleClose: () => void
  id: string
}

export const RenameListModal = ({
  isOpen,
  handleClose,
  id,
}: RenameListModalProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<renameListType>({
    defaultValues: { listName: "", id },
    resolver: zodResolver(renameListSchema),
  })
  const ctx = api.useContext()
  const { onRenameList } = useListComponent({ id })

  const onSubmit = async ({ listName }: renameListType) => {
    await onRenameList({ listName })
    await ctx.lists.getUserPrivateLists.invalidate()
    handleClose()
  }
  if (!isOpen) return null

  const onInvalidSubmit: SubmitErrorHandler<renameListType> = (error) => {
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
        <div className=" absolute left-1/2 top-1/2 z-20 grid h-80 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-th-primary-light bg-th-background bg-th-background-gradient p-8 text-th-primary-medium shadow-2xl ">
          <div className="grid grid-rows-1 ">
            <h2 className="inline justify-self-center text-2xl">
              How would you like to rename your list?
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
            {isSubmitting ? (
              <Loader />
            ) : (
              <>
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
                    Cancel
                  </ButtonPrimary>
                  <ButtonPrimary type="submit">Save</ButtonPrimary>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </BasicModal>
  )
}
