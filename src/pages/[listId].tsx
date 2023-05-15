import { useUser } from "@clerk/nextjs"
import classNames from "classnames"
import { type NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { FormProvider } from "react-hook-form"
import { MainLayout } from "~/Layouts/mainLayout"
import { ButtonPrimary } from "~/components/Buttons/PrimaryButton"
import { ListItemComponent } from "~/components/ListItemComponent/ListItemComponent"
import { LoadingPage } from "~/components/Loader/Loader"
import { useList } from "~/hooks/useList"

import styles from "~/styles/list.module.scss"

const ListView: NextPage = () => {
  const router = useRouter()
  const { listId } = router.query
  const newListId = typeof listId === "string" && listId != null ? listId : ""
  const { user, isLoaded: isUserLoaded } = useUser()
  const {
    isLoading,
    methods,
    onSubmit,
    onInvalidSubmit,
    fieldArrayMethods,
    list,
    isUpdateLoading,
  } = useList({
    listId: newListId,
  })

  const {
    handleSubmit,
    formState: { errors },
  } = methods
  const { append, fields, remove } = fieldArrayMethods
  const isInvalid = (errors?.list?.flat?.(1).length || 0) > 0

  if (isLoading || !isUserLoaded) {
    return <LoadingPage />
  }

  if (user?.id == null) {
    void router.push("/")
    return null
  }

  return (
    <FormProvider {...methods}>
      <MainLayout listName={list?.listName}>
        <form
          className={classNames(
            "grid h-full  w-full overflow-x-hidden border-x-2 border-b-2 border-th-accent-medium pb-4 md:max-w-2xl",
            styles.listForm
          )}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
        >
          <ul className=" mb-8 overflow-y-auto">
            {fields.map(({ formArrayId }, index) => (
              <ListItemComponent
                key={formArrayId}
                index={index}
                remove={remove}
                disabled={isUpdateLoading}
              />
            ))}
          </ul>
          <div className="flex justify-center gap-4">
            <Link href="/">
              <ButtonPrimary>
                <span>Go back to lists</span>
              </ButtonPrimary>
            </Link>
            <ButtonPrimary
              type="button"
              className=""
              onClick={() =>
                append({
                  authorId: user?.id,
                  checked: false,
                  listId: newListId,
                  content: "",
                  sequence: fields.length,
                  id: undefined,
                })
              }
              disabled={isUpdateLoading}
              isLoading={isUpdateLoading}
            >
              Add
            </ButtonPrimary>
            <ButtonPrimary
              type="submit"
              className=""
              disabled={isInvalid || isUpdateLoading || fields.length === 0}
              isLoading={isUpdateLoading}
            >
              <span>Save</span>
            </ButtonPrimary>
          </div>
        </form>
      </MainLayout>
    </FormProvider>
  )
}

export default ListView
