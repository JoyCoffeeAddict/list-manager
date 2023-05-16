import { SignOutButton, useOrganization, useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
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
      <nav
        className="relative grid w-full items-center border-b-2 border-th-accent-medium p-4 px-2 text-th-primary-dark sm:px-10"
        style={{
          gridTemplateColumns: listName != null ? "auto 1fr auto" : "auto auto",
        }}
      >
        <div>
          <Link href="/" className=" flex items-center gap-2">
            <Image
              src="/favicon.ico"
              width={32}
              height={32}
              alt="logo"
              className="h-8 w-8"
            />
            <span className="text-xs sm:text-base">List Manager</span>
          </Link>
        </div>

        {listName != null ? (
          <span className="text:lg justify-self-center text-center leading-none sm:text-2xl">
            {listName}
          </span>
        ) : null}

        <span className="flex items-center gap-3 justify-self-end">
          <Image
            src={user.profileImageUrl}
            alt={`${user.username || ""}'s profile pic`}
            width={32}
            height={32}
            className="h-8 w-8"
          />
          {/* menu button */}
          <button
            onClick={() => {
              setIsMenuOpen((open) => !open)
            }}
            className="h-6 w-6 text-base"
          >
            <FontAwesomeIcon
              className="text-2xl"
              icon={isMenuOpen ? faX : faBars}
            />
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
                    className="px-4 py-2"
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
                className="px-4 py-2"
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
