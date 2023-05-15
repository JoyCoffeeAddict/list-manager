//https://codepen.io/enbee81/pen/oNWZBbb
import { type RegisterOptions, useFormContext } from "react-hook-form"
import styles from "./checkbox.module.scss"
import classNames from "classnames"
export const Checkbox = ({
  formName,
  registerOptions,
  disabled = false,
}: {
  formName: string
  registerOptions?: RegisterOptions
  disabled?: boolean
}) => {
  const { register } = useFormContext()
  return (
    <label className={styles.checkbox__label} aria-label="Is it done?">
      <input
        className={classNames(styles.checkbox__input, { disabled: disabled })}
        type="checkbox"
        {...register(formName, registerOptions)}
        disabled={disabled}
      />
      <svg
        className={styles.checkbox__icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 22 22"
        aria-label="It's done!"
      >
        <rect
          className={classNames(
            styles.border,
            disabled ? styles.svgDisabled : ""
          )}
          width="21"
          height="21"
          x=".5"
          y=".5"
          fill="transparent"
          rx="3"
        />
        <path
          className={classNames(
            styles.tick,
            disabled ? styles.svgDisabled : ""
          )}
          fill="none"
          strokeLinecap="round"
          strokeWidth="4"
          d="M4 10l5 5 9-9"
        />
      </svg>
    </label>
  )
}
