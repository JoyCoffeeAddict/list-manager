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
}

export const Tooltip = ({
  children,
  title,
  position = Position.Bottom,
}: TooltipProps) => {
  if (title == null || title === "") return <>{children}</>

  const postionClass = `tooltip${position}`

  return (
    <div className={classNames(styles.tooltip, styles[postionClass])}>
      <span className={styles.tooltipChildrenWrapper}>{children}</span>
      <div className={styles.tooltipTitle}>{title}</div>
    </div>
  )
}
