import Image from "next/image"
import Link from "next/link"

import { ThemeChanger } from "~/components/ThemeChanger/ThemeChanger"

export const NotAuthedNavbar = () => {
  return (
    <nav className="grid w-full grid-cols-2 items-center border-b-2 border-th-accent-medium p-4 text-th-primary-dark">
      <div>
        <Link href="/" className=" flex items-center gap-2">
          <Image src="/favicon.ico" width={32} height={32} alt="logo" />
          <span>List Manager</span>
        </Link>
      </div>

      <div className="flex gap-2 justify-self-end pr-4">
        <li className="block border-2 border-th-accent-medium hover:bg-th-background-secondary hover:bg-th-background-gradient">
          <ThemeChanger />
        </li>
      </div>
    </nav>
  )
}
