import { zodResolver } from "@hookform/resolvers/zod"
import {
  type FieldErrors,
  useFieldArray,
  useForm,
  type SubmitErrorHandler,
} from "react-hook-form"
import { z } from "zod"
import { api } from "~/utils/api"
import { Logger } from "~/utils/logger"
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
  const { control, reset } = methods

  const fieldArrayMethods = useFieldArray({
    control,
    name: "list",
    keyName: "formArrayId",
  })

  const ctx = api.useContext()
  const { genericErrorNotify } = useErrorHelper()

  const { data: list } = api.lists.getListById.useQuery({ listId })

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
          void ctx.lists.listItemsByListId.invalidate()
        },
        onError: () => {
          genericErrorNotify()
        },
      }
    )
  }
  const onInvalidSubmit: SubmitErrorHandler<SingleListForm> = (
    errors: FieldErrors
  ) => {
    Logger.warn("Invalid submit, errors:", errors)
    return
  }

  return {
    isLoading,
    methods,
    data,
    onSubmit,
    onInvalidSubmit,
    fieldArrayMethods,
    list,
  }
}
