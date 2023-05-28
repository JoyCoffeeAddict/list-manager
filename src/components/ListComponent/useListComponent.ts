import { useOrganization } from "@clerk/nextjs"
import { api } from "~/utils/api"

export const useListComponent = ({ id }: { id: string }) => {
  const ctx = api.useContext()

  const { mutate: deleteList } = api.lists.deleteList.useMutation()

  const invalidateLists = () => {
    void ctx.lists.getCurrentUserOrganizationLists.invalidate()
    void ctx.lists.getUserPrivateLists.invalidate()
  }

  const onRemoveList = () => {
    deleteList(
      { id },
      {
        onSuccess: () => {
          invalidateLists()
        },
      }
    )
  }

  const { mutateAsync: renameList } = api.lists.renameList.useMutation()
  const onRenameList = async ({ listName }: { listName: string }) => {
    return renameList(
      { id, listName },
      {
        onSuccess: () => {
          invalidateLists()
        },
      }
    )
  }

  const { organization } = useOrganization()
  const { mutate: assignListToorganization } =
    api.lists.updateListorganization.useMutation()
  const onAssignListToorganization = () => {
    assignListToorganization(
      { listId: id },
      {
        onSuccess: () => {
          invalidateLists()
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
