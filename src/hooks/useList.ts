import { zodResolver } from "@hookform/resolvers/zod"
import {
  useFieldArray,
  useForm,
  type SubmitErrorHandler,
} from "react-hook-form"
import { toast } from "react-hot-toast"
import { z } from "zod"
import { api } from "~/utils/api"
import { useErrorHelper } from "./useErrorHelper"

export const listItemSchema = z.object({
  id: z.string().optional(),
  content: z.string().min(1),
  checked: z.boolean(),
  authorId: z.string().min(1),
  listId: z.string().min(1),
  sequence: z.number(),
})

export const existingListItemSchema = listItemSchema.merge(
  z.object({
    id: z.string(),
  })
)
export const listSchema = z.object({
  list: z.array(listItemSchema),
})

export type SingleListForm = z.infer<typeof listSchema>

export type listItemType = z.infer<typeof listItemSchema>

export const useList = ({ listId }: { listId: string }) => {
  const methods = useForm<SingleListForm>({ resolver: zodResolver(listSchema) })
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = methods

  const fieldArrayMethods = useFieldArray({
    control,
    name: "list",
    keyName: "formArrayId",
  })
  const { fields, append, prepend, remove, swap, move, insert } =
    fieldArrayMethods

  const ctx = api.useContext()
  const { genericErrorNotify } = useErrorHelper()
  const { data, isLoading } = api.lists.listItemsByListId.useQuery(
    {
      listId,
    },
    {
      onSuccess: (newList) => {
        reset({ list: newList })
      },

      enabled: listId != "",
      refetchOnWindowFocus: false,
    }
  )

  const { mutate: updateList } = api.lists.updateList.useMutation()

  const onSubmit = (values: SingleListForm) => {
    const newList = values.list.map((listItem, index) => ({
      ...listItem,
      sequence: index,
    }))

    updateList(
      { id: listId, list: newList },
      {
        onSuccess: () => {
          void ctx.lists.invalidate()

          // getListItemsByListId.invalidate(
          //   { listId },
          //   { stale: true }
          // )
        },
        onError: () => {
          genericErrorNotify()
        },
      }
    )
  }
  const onInvalidSubmit: SubmitErrorHandler<SingleListForm> = () => {
    genericErrorNotify()
    return
  }

  return {
    isLoading,
    methods,
    data,
    onSubmit,
    onInvalidSubmit,
    fieldArrayMethods,
  }
}
