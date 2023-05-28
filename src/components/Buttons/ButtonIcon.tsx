import { type IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import { ButtonPrimary, type ButtonPrimaryProps } from "./PrimaryButton"

interface ButtonIconProps extends ButtonPrimaryProps {
  icon: IconProp
}

export const ButtonIcon = ({ icon, className, ...rest }: ButtonIconProps) => {
  return (
    <ButtonPrimary
      className={classNames("text-th-accent-medium sm:text-inherit", className)}
      {...rest}
    >
      <FontAwesomeIcon icon={icon} />
    </ButtonPrimary>
  )
}
