import classNames from "classnames"

export const Loader = ({ size = 64 }: { size?: number }) => {
  return (
    <div className="relative z-50 flex items-center justify-center">
      <div
        className={classNames(
          "animate-spin rounded-full border-b-2 border-t-2 border-th-primary-dark"
        )}
        style={{ width: `${size}px`, height: `${size}px` }}
      ></div>
    </div>
  )
}

export const LoadingPage = () => {
  return (
    <div className="absolute inset-0 grid h-screen w-screen place-items-center">
      <Loader />
    </div>
  )
}
