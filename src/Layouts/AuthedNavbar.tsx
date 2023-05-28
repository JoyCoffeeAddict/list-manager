import { SignOutButton, useOrganization, useUser } from "@clerk/nextjs"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"

import { faBars, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import { CreateorganizationModal } from "~/components/Modals/CreateOrganizationModal"
import { InviteToOrganization } from "~/components/Modals/InviteToOrganization"
import { ThemeChanger } from "~/components/ThemeChanger/ThemeChanger"
import { OrganizationChanger } from "~/components/OrganizationChanger/OrganizationChanger"

export const AuthedNavbar = ({ listName }: { listName?: string }) => {
  const [isInviteToOrgOpen, setIsInviteToOrgOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useUser()
  const router = useRouter()
  const [isCreateOrganizationModalOpen, setIsCreateOrganizationModalOpen] =
    useState(false)

  const { organization } = useOrganization()

  if (user == null) return null

  return (
    <>
      <nav className="relative flex w-full items-center justify-center border-b-2 border-th-accent-medium p-4 px-2 text-th-primary-dark sm:px-10">
        <div className="text:lg min-h-[2rem]  justify-self-center px-20 text-center sm:text-2xl">
          {listName || ""}
        </div>

        <span className="absolute right-2 flex items-center  gap-3 sm:right-10">
          <Image
            src={user.profileImageUrl}
            alt={`${user.username || ""}'s profile pic`}
            width={32}
            height={32}
            className="h-6 w-6 md:h-8 md:w-8"
          />
          {/* menu button */}
          <button
            onClick={() => {
              setIsMenuOpen((open) => !open)
            }}
            className="h-6 w-6 text-xl !leading-none   md:text-2xl"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faX : faBars} />
          </button>
        </span>

        {/* menu itself */}
        <div
          className={classNames(
            "absolute right-0 top-full z-10 border-2 border-th-accent-medium bg-th-background bg-th-background-gradient-reversed",
            {
              hidden: !isMenuOpen,
            }
          )}
        >
          <ul>
            {organization != null ? (
              <>
                <li className="border-b-2 border-th-accent-medium">
                  <div className="px-4 py-2 text-center">
                    <div> Current organization:</div>
                    <div>{organization.name}</div>
                  </div>
                </li>
                <li className="border-b-2 border-th-accent-medium hover:bg-th-background-secondary hover:bg-th-background-gradient">
                  <button
                    onClick={() => {
                      setIsInviteToOrgOpen(true)
                    }}
                    className="w-full px-4 py-2 text-left"
                  >
                    <span>Invite to Organisation</span>
                  </button>
                </li>
              </>
            ) : null}
            <li className="border-b-2 border-th-accent-medium  hover:bg-th-background-secondary hover:bg-th-background-gradient">
              <button
                type="button"
                onClick={() => {
                  setIsCreateOrganizationModalOpen(true)
                }}
                className="w-full px-4 py-2 text-left"
              >
                Create organization
              </button>
            </li>
            <li className="border-b-2 border-th-accent-medium hover:bg-th-background-secondary hover:bg-th-background-gradient">
              <ThemeChanger />
            </li>
            <li className="border-b-2 border-th-accent-medium hover:bg-th-background-secondary hover:bg-th-background-gradient">
              <OrganizationChanger />
            </li>
            <li className="hover:bg-th-background-secondary hover:bg-th-background-gradient">
              <SignOutButton
                signOutCallback={async () => {
                  await router.push("/")
                }}
              >
                <button className="px-4 py-2">Sign out</button>
              </SignOutButton>
            </li>
          </ul>
        </div>
      </nav>

      <CreateorganizationModal
        isOpen={isCreateOrganizationModalOpen}
        handleClose={() => setIsCreateOrganizationModalOpen(false)}
      />
      <InviteToOrganization
        isOpen={isInviteToOrgOpen}
        handleClose={() => setIsInviteToOrgOpen(false)}
      />
    </>
  )
}
