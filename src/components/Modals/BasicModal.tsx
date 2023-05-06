/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type PropsWithChildren } from "react"
import { createPortal } from "react-dom"

export const BasicModal = ({ children }: PropsWithChildren) => {
  return createPortal(children, document.getElementById("modalPortal")!)
}
