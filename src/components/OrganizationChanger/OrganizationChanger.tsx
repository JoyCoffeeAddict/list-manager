import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import { useRouter } from "next/router"
import { type ChangeEvent } from "react"
import { api } from "~/utils/api"

export const OrganizationChanger = () => {
  const router = useRouter()
  const { organizationList, setActive } = useOrganizationList()
  const { organization } = useOrganization()
  if (organizationList == null || setActive == null) {
    return null
  }

  const ctx = api.useContext()

  const onSetActiveOragnization = async (e: ChangeEvent<HTMLSelectElement>) => {
    await setActive({ organization: e.currentTarget.value })
    await ctx.lists.getCurrentUserOrganizationLists.invalidate()
    await router.push("/")
  }

  return (
    <div className="relative">
      <label htmlFor="organization-select" className="sr-only mr-2">
        Choose organization:
      </label>
      <select
        name="organization"
        id="organization-select"
        className=" pr- w-full bg-transparent px-4 py-2 pr-12 text-th-primary-dark"
        onChange={(e) => {
          void onSetActiveOragnization(e)
        }}
        defaultValue={organization?.id}
      >
        <option value="" className="hidden">
          Select Organization
        </option>
        {organizationList.map(({ organization }) => (
          <option key={organization.name} value={organization.id}>
            {organization.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-0 top-0 block h-full w-8 bg-th-background bg-th-background-gradient after:absolute after:left-1/2 after:top-5 after:h-0 after:w-0 after:-translate-x-1/2 after:-translate-y-1/2 after:border-8 after:border-transparent after:border-t-th-accent-dark after:content-['']"></div>
    </div>
  )
}
