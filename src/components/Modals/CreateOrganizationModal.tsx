import { useOrganizationList, useOrganizations } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitErrorHandler } from "react-hook-form"
import { z } from "zod"
import { Logger } from "~/utils/logger"
import { type newListType } from "~/utils/schemas/listSchemas"
import { ButtonPrimary } from "../Buttons/PrimaryButton"
import { BasicModal } from "./BasicModal"

interface CreateorganizationModalProps {
  isOpen: boolean
  handleClose: () => void
}

const organizationSchema = z.object({ name: z.string().min(2).max(32) })

type organizationType = z.infer<typeof organizationSchema>

export const CreateorganizationModal = ({
  isOpen,
  handleClose,
}: CreateorganizationModalProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<organizationType>({
    defaultValues: { name: "" },
    resolver: zodResolver(organizationSchema),
  })

  const { setActive } = useOrganizationList()
  const { createOrganization } = useOrganizations()

  const onSubmit = async ({ name }: organizationType) => {
    if (createOrganization == null || setActive == null) {
      return
    }
    const newOrganization = await createOrganization({ name: name })

    await setActive({ organization: newOrganization })

    // TODO: Add logo with UploadThing
    handleClose()
  }

  const onInvalidSubmit: SubmitErrorHandler<newListType> = (error) => {
    Logger.error(error)
  }

  if (!isOpen) return null

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
              How would you like to name your new organization?
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
                {...register("name")}
              />
              <div>{errors.name?.message}</div>
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
