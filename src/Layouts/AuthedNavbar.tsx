import {
    SignOutButton,
    useOrganization,
    useUser
} from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

import classNames from "classnames"
import { ButtonPrimary } from "~/components/Buttons/PrimaryButton"
import { CreateorganizationModal } from "~/components/Modals/CreateOrganizationModal"
import { InviteToOrganization } from "~/components/Modals/InviteToOrganization"
import { ThemeChanger } from "~/components/ThemeChanger"

export const AuthedNavbar = ({ listName }: { listName?: string }) => {
  const [isInviteToOrgOpen, setIsInviteToOrgOpen] = useState(false)
  const {  user } = useUser()
  const router = useRouter()
  const [isCreateorganizationModalOpen, setIsCreateorganizationModalOpen] =
    useState(false)

  const { organization } = useOrganization()

  if (user == null) return null

  return (
    <>
      <nav
        className={classNames(
          "grid w-full items-center border-b-2 border-th-accent-medium p-4 text-th-primary-dark",
          listName != null ? "grid-cols-3" : "grid-cols-2"
        )}
      >
        <div>
          <Link href="/" className=" flex items-center gap-2">
            <Image
              src="/favicon.ico"
              width={32}
              height={32}
              alt="logo"
              className={classNames("h-8 w-8")}
            />
            <span>List Manager</span>
          </Link>
        </div>

        {listName != null ? (
          <span className="justify-self-center text-2xl leading-none">
            {listName}
          </span>
        ) : null}
        <div className="flex items-center gap-2 justify-self-end pr-4">
          {organization != null ? (
            <>
              <span>Current org: {organization.name} </span>

              <button
                onClick={() => {
                  setIsInviteToOrgOpen(true)
                }}
              >
                <span>Invite to Organisation</span>
              </button>
            </>
          ) : null}
          <ButtonPrimary
            type="button"
            onClick={() => {
              setIsCreateorganizationModalOpen(true)
            }}
          >
            create org
          </ButtonPrimary>
          <ThemeChanger />
          <Image
            src={user.profileImageUrl}
            alt={`${user.username || ""}'s profile pic`}
            width={32}
            height={32}
          />
          <SignOutButton
            signOutCallback={async () => {
              await router.push("/")
            }}
          >
            Sign out
          </SignOutButton>
        </div>
      </nav>
      <CreateorganizationModal
        isOpen={isCreateorganizationModalOpen}
        handleClose={() => setIsCreateorganizationModalOpen(false)}
      />
      <InviteToOrganization
        isOpen={isInviteToOrgOpen}
        handleClose={() => setIsInviteToOrgOpen(false)}
      />
    </>
  )
}
