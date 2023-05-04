import { useUser } from "@clerk/nextjs"
import classNames from "classnames"
import { type NextPage } from "next"
import { useRouter } from "next/router"
import { FormProvider } from "react-hook-form"
import { ButtonPrimary } from "~/components/Buttons/PrimaryButton"
import { ListItemComponent } from "~/components/ListItemComponent/ListItemComponent"
import { LoadingPage } from "~/components/Loader/Loader"
import { MainLayout } from "~/components/mainLayout"
import { useList } from "~/hooks/useList"

import styles from "~/styles/list.module.scss"

const ListView: NextPage = () => {
  const router = useRouter()
  const { listId } = router.query
  const newListId = typeof listId === "string" && listId != null ? listId : ""
  const { user } = useUser()
  const {
    isLoading,
    methods,
    data,
    onSubmit,
    onInvalidSubmit,
    fieldArrayMethods,
  } = useList({
    listId: newListId,
  })

  const {
    handleSubmit,
    formState: { errors },
  } = methods
  console.log("🚀 ~ file: [listId].tsx:36 ~ errors:", errors)
  const { append, fields, remove } = fieldArrayMethods
  if (isLoading) {
    return <LoadingPage />
  }

  if (data == null || user?.id == null) return <div>404</div>

  return (
    <FormProvider {...methods}>
      <MainLayout>
        <main className="flex h-screen flex-col items-center justify-center ">
          <form
            className={classNames(
              "mt-[66px] grid h-full w-full  overflow-x-hidden border-x-2 border-blue-400 p-4 md:max-w-2xl",
              styles.listForm
            )}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
          >
            <ul className="mb-8 overflow-y-auto">
              {fields.map(({ id, formArrayId }, index) => (
                <ListItemComponent
                  key={formArrayId}
                  index={index}
                  remove={remove}
                />
              ))}
            </ul>
            <div>
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
              >
                Add
              </ButtonPrimary>
              <ButtonPrimary type="submit" className="">
                Save
              </ButtonPrimary>
            </div>
          </form>
        </main>
      </MainLayout>
    </FormProvider>
  )
}

// import { createServerSideHelpers } from "@trpc/react-query/server"
// import { appRouter } from "~/server/api/root"
// import superjson from "superjson"
// import { prisma } from "~/server/db"
// import { ListItem } from "@prisma/client"

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   createServerSideHelpers({
//     router: appRouter,
//     ctx: {
//       prisma,
//       userId: null,
//     },
//     transformer: superjson, // optional - adds superjson serialization
//   })

//   const listId = context.params?.listid
//   console.log(context.params)

//   if (typeof listId !== "string" || listId == null) {
//     // throw new Error("No listId")
//     return {}
//   }

//   return {
//     props: {
//       listId,
//     },
//   }
// }

export default ListView
