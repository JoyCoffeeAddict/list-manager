import { ButtonPrimary } from "../Buttons/PrimaryButton"
import { BasicModal } from "./BasicModal"

interface ConfirmDialogProps {
  isOpen: boolean
  handleClose: () => void
  handleConfirm: () => void
  title: string
  description: string
}

export const ConfirmDialog = ({
  isOpen,
  handleClose,
  title,
  description,
  handleConfirm,
}: ConfirmDialogProps) => {
  if (!isOpen) return null

  return (
    <BasicModal>
      <div className="absolute inset-0 z-50 h-screen  w-screen ">
        {/* Overlay */}
        <div
          className="z-10 h-screen w-screen bg-white  bg-opacity-60 backdrop-blur-sm"
          onClick={handleClose}
        ></div>
        {/* content */}
        <div className=" absolute left-1/2 top-1/2 z-20 grid h-80 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-th-primary-light bg-th-background bg-th-background-gradient p-8 text-th-primary-medium shadow-2xl ">
          <div className="grid grid-rows-1 ">
            <h2 className="inline justify-self-center text-2xl">{title}</h2>
            <span
              onClick={handleClose}
              className="absolute right-0 top-0 cursor-pointer p-4 text-2xl"
            >
              x
            </span>
          </div>

          <span className="flex w-full flex-col items-center">
            {description}
          </span>

          <div className="flex gap-4 place-self-end">
            <ButtonPrimary type="button" onClick={handleClose}>
              Cancel
            </ButtonPrimary>
            <ButtonPrimary
              type="button"
              onClick={() => {
                handleConfirm()
                handleClose()
              }}
            >
              Yes
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </BasicModal>
  )
}
