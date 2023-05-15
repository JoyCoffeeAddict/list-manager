import classNames from "classnames"
import type { ButtonHTMLAttributes, PropsWithChildren } from "react"
import styles from "./PrimaryButton.module.scss"
import { Loader } from "../Loader/Loader"

interface ButtonPrimaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export const ButtonPrimary = ({
  children,
  onClick,
  className,
  disabled,
  type = "button",
  isLoading = false,
}: PropsWithChildren<ButtonPrimaryProps>) => {
  return (
    <button
      className={classNames(styles.primary_button, className, {
        disabled: disabled,
      })}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {isLoading ? <Loader size={24} /> : children}
    </button>
  )
}
