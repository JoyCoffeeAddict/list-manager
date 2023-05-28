import * as z from "zod"

import type { ListItem, PrismaClient } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import {
  existingListItemSchema,
  listSchema,
  type listItemType,
} from "~/hooks/useList"
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc"
import { Logger } from "~/utils/logger"
import { newListSchema, renameListSchema } from "~/utils/schemas/listSchemas"

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
  getUserPrivateLists: privateProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.list.findMany({
      where: { AND: [{ authorId: ctx.userId, organizationId: null }] },
      orderBy: { sequence: "asc" },
    })
  }),
  getCurrentUserOrganizationLists: privateProcedure.query(async ({ ctx }) => {
    if (ctx.orgId == null) return []

    return await ctx.prisma.list.findMany({
      where: {
        organizationId: ctx.orgId,
      },
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

  renameList: privateProcedure
    .input(renameListSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, listName } = input
      return await ctx.prisma.list.update({
        where: { id },
        data: { listName },
      })
    }),

  deleteList: privateProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.$transaction([
        // ctx.prisma.listItem.deleteMany({ where: { listId: input.id } }),
        ctx.prisma.list.delete({ where: { id: input.id } }),
      ])
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

      // const user = await ctx.prisma.userInorganization.findFirst({
      //   where: { AND: [{ listId: input.id }, { userId: ctx.userId }] },
      // })

      // if (!user?.isEditor) {
      //   throw new TRPCError({
      //     code: "FORBIDDEN",
      //     message:
      //       "You don't have permissions to modify this list, contact your organization.",
      //   })
      // }

      // console.log("🚀 ~ file: listsRouter.ts:121 ~ .mutation ~ user:", user)

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

  updateListOrganization: privateProcedure
    .input(
      z.object({
        listId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.orgId == null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "organization not specified",
        })
      }

      await ctx.prisma.list.update({
        where: { id: input.listId },
        data: { organizationId: ctx.orgId },
      })
    }),
  removeListOrganization: privateProcedure
    .input(
      z.object({
        listId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.list.update({
        where: { id: input.listId },
        data: { organizationId: null },
      })
    }),
})
