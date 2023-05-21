import { useOrganizationList, useOrganization } from "@clerk/nextjs"
import { useState } from "react"
import { api } from "~/utils/api"

export const useListFeed = () => {
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false)
  const { organizationList: listOfOrganizations } = useOrganizationList()
  const { organization: currentOrganization } = useOrganization()

  const { data: lists, isLoading: isLoadingLists } =
    api.lists.getUserPrivateLists.useQuery(undefined, {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    })

  const { data: organizationLists, isLoading: isLoadingOrganizationLists } =
    api.lists.getCurrentUserOrganizationLists.useQuery(undefined, {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    })

  const getOrganizationName = (organizationId?: string | null) => {
    if (listOfOrganizations == null || organizationId == null) {
      return
    }

    const searchedOrg = listOfOrganizations.find(
      ({ organization }) => organization.id === organizationId
    )
    if (searchedOrg == null) {
      return
    }

    const name = searchedOrg.organization.name

    return name
  }

  return {
    isCreateListModalOpen,
    setIsCreateListModalOpen,
    lists,
    organizationLists,
    isLoadingLists,
    isLoadingOrganizationLists,
    currentOrganization,
    getOrganizationName,
    listOfOrganizations,
  }
}
