import { useOrganization } from "@clerk/nextjs"
import { api } from "~/utils/api"

export const useListComponent = ({ id }: { id: string }) => {
  const ctx = api.useContext()

  const { mutate: deleteList } = api.lists.deleteList.useMutation()

  const onRemoveList = () => {
    deleteList(
      { id },
      {
        onSuccess: () => {
          void ctx.lists.getUserPrivateLists.invalidate()
          void ctx.lists.getCurrentUserOrganizationLists.invalidate()
        },
      }
    )
  }

  const { mutateAsync: renameList } = api.lists.renameList.useMutation()

  const onRenameList = async ({ listName }: { listName: string }) => {
    return renameList({ id, listName })
  }

  const { mutate: assignListToorganization } =
    api.lists.updateListorganization.useMutation()
  const { organization } = useOrganization()
  const onAssignListToorganization = () => {
    assignListToorganization(
      { listId: id },
      {
        onSuccess: () => {
          void ctx.lists.getUserPrivateLists.invalidate()
          void ctx.lists.getCurrentUserOrganizationLists.invalidate()
        },
      }
    )
  }

  return {
    onRemoveList,
    onRenameList,
    onAssignListToorganization,
    organization,
  }
}
