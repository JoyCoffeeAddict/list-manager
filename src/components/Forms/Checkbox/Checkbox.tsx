//https://codepen.io/enbee81/pen/oNWZBbb
import { type RegisterOptions, useFormContext } from "react-hook-form"
import styles from "./checkbox.module.scss"
export const Checkbox = ({
  formName,
  registerOptions,
}: {
  formName: string
  registerOptions?: RegisterOptions
}) => {
  const { register } = useFormContext()
  return (
    <label className={styles.checkbox__label} aria-label="Is it done?">
      <input
        className={styles.checkbox__input}
        type="checkbox"
        {...register(formName, registerOptions)}
      />
      <svg
        className={styles.checkbox__icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 22 22"
        aria-label="It's done!"
      >
        <rect
          width="21"
          height="21"
          x=".5"
          y=".5"
          fill="transparent"
          stroke="#ffffff"
          rx="3"
        />
        <path
          className={styles.tick}
          stroke="#6EA340"
          fill="none"
          strokeLinecap="round"
          strokeWidth="4"
          d="M4 10l5 5 9-9"
        />
      </svg>
    </label>
  )
}
