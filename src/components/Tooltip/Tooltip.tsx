import classNames from "classnames"
import { type ReactNode } from "react"
import styles from "./Tooltip.module.scss"
export enum Position {
  Top = "Top",
  Bottom = "Bottom",
  Left = "Left",
  Right = "Right",
}

interface TooltipProps {
  children?: ReactNode
  title?: string
  position?: Position
  disabled?: boolean
}

export const Tooltip = ({
  children,
  title,
  position = Position.Bottom,
  disabled = false,
}: TooltipProps) => {
  if (title == null || title === "" || disabled) return <>{children}</>

  const postionClass = `tooltip${position}`

  return (
    <div className={classNames(styles.tooltip, styles[postionClass])}>
      <span className={styles.tooltipChildrenWrapper}>{children}</span>
      <div className={styles.tooltipTitle}>{title}</div>
    </div>
  )
}
