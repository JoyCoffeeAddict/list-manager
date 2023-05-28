import { useFormContext } from "react-hook-form"

interface useListItemProps {
  disabled: boolean
  index: number
}

export const useListItem = ({ index, disabled }: useListItemProps) => {
  const { setValue } = useFormContext()
  const contentKey = `list.${index}.content` as const
  const checkedKey = `list.${index}.checked` as const

  const onClearInput = () => {
    if (disabled) {
      return
    }

    setValue(contentKey, "")
  }

  return {
onClearInput,
    contentKey,
    checkedKey,
  }
}
