import { ILogRecord, ILogType } from '../interface'
import { version } from '../constants'

export function mergeConfig<T extends Record<string, any>>(
  defaultConfig: T,
  customConfig: T,
): T {
  ;(Object.keys(customConfig) as Array<keyof T>).forEach((key) => {
    defaultConfig[key] = customConfig[key]
  })
  return defaultConfig
}
export function mergeLog(log: ILogType): ILogRecord {
  const logRecord: ILogRecord = {
    time: useDateFormat(),
    systemInfo: {
      ip: '',
      userAgent: '',
    },
    appInfo: {
      appId: '',
      appName: '',
      version: version,
    },
    userInfo: {
      userId: 0,
    },
    pagePath: '',
    pageFullPath: '',
    ...log,
  }
  return logRecord
}
export function useDateFormat(
  format: string = 'yyyy-MM-dd HH:mm:ss',
  date: Date = new Date(),
) {
  if (date.toString() === 'Invalid Date') {
    console.error('dateStr参数异常', date)
    return ''
  }
  const year = date.getFullYear() + ''
  const month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  const minute =
    date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  const second =
    date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  const millisecond = date.getMilliseconds()
  return (
    format
      .replace('yyyy', year + '')
      .replace('MM', month + '')
      .replace('dd', day + '')
      .replace('HH', hour + '')
      .replace('mm', minute + '')
      .replace('ss', second + '')
      .replace('WW', millisecond.toString().slice(0, 2)) || ''
  )
}
const debugMessageStack: any[][] = []
export function debugPrint(end: boolean, ...message: any[]): void {
  if (!window['__QINGNIAO_DEV__']) return
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
export function printStep(...message: any[]): void {
  if (!window['__QINGNIAO_DEV__']) return
  console.log('%c[qingniao:step]', 'color: #ff983f', ...message)
}
