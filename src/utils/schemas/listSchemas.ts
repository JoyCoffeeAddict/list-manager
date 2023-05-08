import { z } from "zod"

export const listNameSchema = z
  .string()
  .min(3, { message: "List name must contain at least 3 characters" })
  .max(258, { message: "List name must contain at most 258 characters" })

export const newListSchema = z.object({
  listName: listNameSchema,
  sequence: z.number(),
})

export type newListType = z.infer<typeof newListSchema>

export const renameListSchema = z.object({
  listName: listNameSchema,
  id: z.string().min(1),
})

export type renameListType = z.infer<typeof renameListSchema>
