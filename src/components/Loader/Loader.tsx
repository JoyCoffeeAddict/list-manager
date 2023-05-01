export const Loader = () => {
  return (
    <div className="relative z-50 flex items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
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
