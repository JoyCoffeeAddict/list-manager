import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

const themes = [{ name: "Light" }, { name: "Dark" }, { name: "Fancy" }, { name: "Lavender" }]

export const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="relative">
      <label htmlFor="theme-select" className="sr-only mr-2">
        Choose theme:
      </label>
      <select
        name="theme"
        id="theme-select"
        className=" pr- w-full bg-transparent px-4 py-2 pr-12 text-th-primary-dark"
        onChange={(e) => setTheme(e.currentTarget.value)}
        value={theme}
      >
        <option value="" className="hidden">
          Select Theme
        </option>
        {themes.map((t) => (
          <option key={t.name.toLowerCase()} value={t.name.toLowerCase()}>
            {t.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-0 top-0 block h-full w-8 bg-th-background bg-th-background-gradient after:absolute after:left-1/2 after:top-5 after:h-0 after:w-0 after:-translate-x-1/2 after:-translate-y-1/2 after:border-8 after:border-transparent after:border-t-th-accent-dark after:content-['']"></div>
    </div>
  )
}
