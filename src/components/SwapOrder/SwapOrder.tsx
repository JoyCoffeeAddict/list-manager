import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface SwapOrderProps {
  isFirst: boolean
  isLast: boolean
  handleSwap: (direction: SwapDirection) => void
}

export enum SwapDirection {
  Down = "Down",
  Up = "Up",
}

export const SwapOrder = ({ handleSwap, isFirst, isLast }: SwapOrderProps) => {
  return (
    <div className="flex flex-col pr-2">
      <button
        disabled={isFirst}
        type="button"
        onClick={() => {
          handleSwap(SwapDirection.Up)
        }}
        className=" translate-y-1  text-2xl leading-none text-th-accent-medium hover:text-th-accent-medium md:text-inherit"
      >
        <FontAwesomeIcon icon={faCaretUp} />
      </button>
      <button
        type="button"
        className="-translate-y-1 text-2xl leading-none text-th-accent-medium hover:text-th-accent-medium md:text-inherit"
        disabled={isLast}
        onClick={() => {
          handleSwap(SwapDirection.Down)
        }}
      >
        <FontAwesomeIcon icon={faCaretDown} />
      </button>
    </div>
  )
}
