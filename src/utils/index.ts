export function mergeConfig<T extends Record<string, any>>(
  defaultConfig: T,
  customConfig: T,
): T {
  ;(Object.keys(customConfig) as Array<keyof T>).forEach((key) => {
    defaultConfig[key] = customConfig[key]
  })
  return defaultConfig
}
const debugMessageStack: any[][] = []
export function debugPrint(end: boolean, ...message: any[]): void {
  debugMessageStack.push(message)
  if (end) {
    console.group(
      '%c[qingniao:start]:StartInformation',
      'background-color: #FF6600 ; color: #ffffff ; font-weight: bold ; padding: 4px ;',
    )
    debugMessageStack.forEach((i) =>
      console.log('%c[qingniao:info]', 'color: #ff983f', ...i),
    )
    console.groupEnd()
    debugMessageStack.length = 0
  }
}
