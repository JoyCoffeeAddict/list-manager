import { ThemeChanger } from "~/components/ThemeChanger/ThemeChanger"

export const NotAuthedNavbar = () => {
  return (
    <nav className="w-full border-b-2 border-th-accent-medium p-4 text-th-primary-dark">
      <li className=" ml-auto block w-fit border-2 border-th-accent-medium hover:bg-th-background-secondary hover:bg-th-background-gradient">
        <ThemeChanger />
      </li>
    </nav>
  )
}
