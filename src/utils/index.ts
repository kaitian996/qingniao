export function mergeConfig<T extends Record<string, any>>(
  defaultConfig: T,
  customConfig: T,
): T {
  ;(Object.keys(customConfig) as Array<keyof T>).forEach((key) => {
    defaultConfig[key] = customConfig[key]
  })
  return defaultConfig
}
