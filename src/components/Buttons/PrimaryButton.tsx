import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
} from "react"
import styles from "./PrimaryButton.module.scss"
import classNames from "classnames"

export const ButtonPrimary = ({
  children,
  onClick,
  className,
  type,
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      className={classNames(styles.primary_button, className)}
      onClick={onClick}
      type={type || "button"}
    >
      {children}
    </button>
  )
}
