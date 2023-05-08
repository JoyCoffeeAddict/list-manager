import { api } from "~/utils/api"

export const useLitsFeed = () => {
  const ctx = api.useContext()

  const { mutate: deleteList } = api.lists.deleteList.useMutation()

  const onRemoveList = (id: string) => {
    deleteList(
      { id },
      {
        onSuccess: () => {
          void ctx.lists.getAllListsForCurrentUser.invalidate()
        },
      }
    )
  }

  const { mutate: renameList } = api.lists.renameList.useMutation()

  const onRenameList = ({ id, listName }: { id: string; listName: string }) => {
    renameList(
      { id, listName },
      {
        onSuccess: () => {
          void ctx.lists.getAllListsForCurrentUser.invalidate()
        },
      }
    )
  }

  return { onRemoveList, onRenameList }
}
