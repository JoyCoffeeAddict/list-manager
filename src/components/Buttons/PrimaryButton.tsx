import classNames from "classnames"
import type { ButtonHTMLAttributes, PropsWithChildren } from "react"
import styles from "./PrimaryButton.module.scss"

export const ButtonPrimary = ({
  children,
  onClick,
  className,
  type,
  disabled,
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      className={classNames(
        styles.primary_button,
        className,
        disabled ? styles.primary_button_disabled : ""
      )}
      onClick={onClick}
      type={type || "button"}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
