import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

const themes = [{ name: "Light" }, { name: "Dark" }, { name: "Fancy" }]

export const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="flex items-center justify-between text-sm font-bold text-th-primary-dark">
      <div>
        <label htmlFor="theme-select" className="sr-only mr-2">
          Choose theme:
        </label>
        <select
          name="theme"
          id="theme-select"
          className="border-2 border-th-accent-medium bg-transparent px-3 py-1 text-th-primary-dark"
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
      </div>
    </div>
  )
}
