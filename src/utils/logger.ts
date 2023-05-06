/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

export let Logger = {
  log: (message?: any, ...args: any[]) => console.log(message, args),
  info: (message?: any, ...args: any[]) => console.info(message, args),
  error: (message?: any, ...args: any[]) => console.error(message, args),
  warn: (message?: any, ...args: any[]) => console.warn(message, args),
}

if (process.env.NODE_ENV === "production") {
  Logger = {
    log: () => {
      return
    },
    info: () => {
      return
    },
    warn: () => {
      return
    },
    error: () => {
      return
    },
  }
}
