import { toast } from "react-hot-toast"

export const useErrorHelper = () => {
  const genericErrorNotify = () =>
    toast("Something went wrong! contact developer")

  return {
    genericErrorNotify,
  }
}
