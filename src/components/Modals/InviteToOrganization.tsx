import { useOrganization } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitErrorHandler } from "react-hook-form"
import { z } from "zod"
import { Logger } from "~/utils/logger"
import { type newListType } from "~/utils/schemas/listSchemas"
import { ButtonPrimary } from "../Buttons/PrimaryButton"
import { BasicModal } from "./BasicModal"

interface InviteToOrganizationProps {
  isOpen: boolean
  handleClose: () => void
}

//Clerk Membership Role https://clerk.com/docs/organizations/manage-member-roles
const inviteToOrganizationSchema = z.object({
  email: z.string().email().min(3),
  role: z.enum(["admin", "basic_member", "guest_member"]),
})

type inviteToOrganizationType = z.infer<typeof inviteToOrganizationSchema>

export const InviteToOrganization = ({
  isOpen,
  handleClose,
}: InviteToOrganizationProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<inviteToOrganizationType>({
    defaultValues: { email: "", role: "basic_member" },
    resolver: zodResolver(inviteToOrganizationSchema),
  })
  const { organization } = useOrganization()

  const onSubmit = async ({ email, role }: inviteToOrganizationType) => {
    if (organization == null) {
      return
    }

    try {
      await organization.inviteMember({
        emailAddress: email,
        role,
      })
      handleClose()
    } catch (e) {
      return
    }
  }

  const onInvalidSubmit: SubmitErrorHandler<newListType> = (error) => {
    Logger.error(error)
  }

  if (!isOpen) return null

  return (
    <BasicModal>
      <div className="absolute inset-0 z-50 h-screen  w-screen ">
        <div
          className="z-10 h-screen w-screen bg-white  bg-opacity-60 backdrop-blur-sm"
          onClick={handleClose}
        ></div>
        <div className=" absolute left-1/2 top-1/2 z-20 grid h-2/3 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-th-primary-light bg-th-background bg-th-background-gradient p-8 text-th-primary-medium shadow-2xl md:h-96 ">
          <div className="grid grid-rows-1 ">
            <h2 className="inline justify-self-center text-2xl">
              Invite by typing an email to your friend!
            </h2>
            <span
              onClick={handleClose}
              className="absolute right-0 top-0 cursor-pointer p-4 text-2xl"
            >
              x
            </span>
          </div>

          <form
            className="grid h-full place-items-center gap-4 "
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
          >
            <span className="flex w-full flex-col items-center">
              <input
                type="text"
                className="m-2 w-3/4 border-2 border-th-accent-medium bg-transparent p-2"
                {...register("email")}
              />
              <div>{errors.email?.message}</div>
            </span>
            <ul className="grid w-full grid-rows-1 gap-6 md:grid-cols-2">
              <li>
                <input
                  type="radio"
                  id="basic_member"
                  value="basic_member"
                  className="peer hidden"
                  {...register("role")}
                />
                {/* TODO: Re-style */}
                <label
                  htmlFor="basic_member"
                  className="inline-flex h-full w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">
                      Basic member
                    </div>
                    <div className="w-full">
                      Can edit all of the lists and their items in this
                      organization.
                    </div>
                  </div>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="admin"
                  value="admin"
                  className="peer hidden"
                  {...register("role")}
                />
                <label
                  htmlFor="admin"
                  className="inline-flex h-full w-full cursor-pointer justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">Admin</div>
                    <div className="w-full">
                      Can invite and remove users from organization.
                    </div>
                  </div>
                </label>
              </li>
            </ul>

            <div className="flex gap-4 place-self-end">
              <ButtonPrimary type="button" onClick={handleClose}>
                Cancel
              </ButtonPrimary>
              <ButtonPrimary type="submit">Save</ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    </BasicModal>
  )
}
