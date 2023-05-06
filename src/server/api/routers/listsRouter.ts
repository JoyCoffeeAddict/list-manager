import * as z from "zod"

import type { PrismaClient, ListItem } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { newListSchema } from "~/components/Modals/CreateListModal"
import {
  existingListItemSchema,
  type listItemType,
  listSchema,
} from "~/hooks/useList"
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc"
import { Logger } from "~/utils/logger"

interface SortableObject extends Record<string, unknown> {
  sequence: number
}

const getListItemsById = async (
  input: { listId: string },
  prisma: PrismaClient
) => {
  try {
    return await prisma.listItem.findMany({
      where: { listId: input.listId },
      orderBy: [{ sequence: "asc" }],
    })
  } catch (e) {
    Logger.error(e)
    return []
  }
}

// Checks if length of an array is equal to unique sequences
export const sequencesListValidator = (array: SortableObject[]) => {
  return array.length === new Set(array.map(({ sequence }) => sequence)).size
}

export const listsRouter = createTRPCRouter({
  getAllListsForCurrentUser: privateProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.list.findMany({
      where: { authorId: ctx.userId },
      orderBy: { sequence: "asc" },
    })
  }),

  getListById: privateProcedure
    .input(z.object({ listId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.list.findFirst({ where: { id: input.listId } })
    }),

  createList: privateProcedure
    .input(newListSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.list.create({
        data: { authorId: ctx.userId, ...input },
      })
    }),

  listItemsByListId: privateProcedure
    .input(
      z.object({
        listId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await getListItemsById({ listId: input.listId }, ctx.prisma)
    }),

  updateList: privateProcedure
    .input(z.object({ id: z.string().min(1) }).merge(listSchema))
    .mutation(async ({ ctx, input }) => {
      if (!sequencesListValidator(input.list)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Duplicate sequences or missing sequences on list items",
        })
      }

      await ctx.prisma.$transaction(async () => {
        let previousListItems: ListItem[] = []
        try {
          previousListItems = await ctx.prisma.listItem.findMany({
            where: { listId: input.id },
          })
        } catch (e) {
          previousListItems = []
        }

        const previousListItemsIds = previousListItems.map(({ id }) => id)
        const newListItemIds = input.list.map(({ id }) => id)
        const idsToDelete = previousListItemsIds.filter(
          (id) => !newListItemIds.includes(id)
        )

        await Promise.all(
          idsToDelete.map((id) => ctx.prisma.listItem.delete({ where: { id } }))
        )

        const itemsForUpdate: ListItem[] = []
        const itemsForCreate: listItemType[] = []

        input.list.forEach((item) => {
          try {
            const newItem = existingListItemSchema.parse(item)
            itemsForUpdate.push(newItem)
          } catch {
            itemsForCreate.push(item)
          }
        })

        await Promise.all(
          itemsForUpdate.map((item) =>
            ctx.prisma.listItem.update({
              where: { id: item.id },
              data: item,
            })
          )
        )

        await ctx.prisma.listItem.createMany({ data: itemsForCreate })
      })
    }),
})
