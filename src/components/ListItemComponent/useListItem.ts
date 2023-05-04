import { MouseEventHandler } from "react"
import { useFormContext } from "react-hook-form"

export const useListItem = ({ index }: { index: number }) => {
  const { setValue } = useFormContext()
  const contentKey = `list.${index}.content` as const
  const checkedKey = `list.${index}.checked` as const

  const clearInput: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    setValue(contentKey, "")
  }

  return {
    clearInput,
    contentKey,
    checkedKey
  }
}
