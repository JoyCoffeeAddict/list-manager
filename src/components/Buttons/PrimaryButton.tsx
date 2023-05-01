import { PropsWithChildren } from "react"

import styles from "./PrimaryButton.module.scss"
export const PrimaryButtonWrapper = ({ children }: PropsWithChildren) => {
  return <button className={styles.primary_button}>{children}</button>
}
