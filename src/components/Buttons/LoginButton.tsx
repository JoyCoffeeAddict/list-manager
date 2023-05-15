import { SignInButton, SignUpButton } from "@clerk/nextjs"
import primaryButtonStyles from "./PrimaryButton.module.scss"

//Clerk SignInButton had some problem with wrapping it in custom component
export const LoginButton = () => {
  return (
    <SignInButton>
      <button className={primaryButtonStyles.primary_button}>Sign In</button>
    </SignInButton>
  )
}

export const RegisterButton = () => {
  return (
    <SignUpButton>
      <button className={primaryButtonStyles.primary_button}>Sign Up</button>
    </SignUpButton>
  )
}
