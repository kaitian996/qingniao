import { debugPrint, printStep } from '../utils'
import { ILogRecord, ILoggerContext, ILoggerRuquestManager } from '../interface'

export class LoggerRuquestManager implements ILoggerRuquestManager {
  readonly context: ILoggerContext
  constructor(context: ILoggerContext) {
    const startTime = Date.now()
    this.context = context
    const endTime = Date.now()
    debugPrint(false, `初始化ajax耗时:${endTime - startTime}`)
  }
  public async sendLog(log: ILogRecord | ILogRecord[]) {
    const { host } = this.context.options
    if (typeof host === 'string') {
      try {
        await this.ajax(host, 'POST', log)
        printStep('日志上报成功', `host:${host}`, `log:${log}`)
      } catch (error) {
        printStep('日志上报失败', `host:${host}`, `log:${log}`, error)
      }
    } else if (Array.isArray(host)) {
      host.forEach(async (target) => {
        try {
          await this.ajax(target, 'POST', log)
          printStep('日志上报成功', `host:${host}`, `log:${log}`)
        } catch (error) {
          printStep('日志上报失败', `host:${host}`, `log:${log}`, error)
        }
      })
    }
  }
  private ajax(url: string, method: 'GET' | 'POST', data: any) {
    return new Promise<any>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response)
          } else {
            reject(new Error('error'))
          }
        }
      }
      if (method.toUpperCase() === 'GET') {
        const paramsList: string[] = []
        for (let key in data) {
          paramsList.push(key + '=' + data[key])
        }
        const params = paramsList.join('&')
        url = url + '?' + params
        xhr.open('get', url, true)
        xhr.send()
      } else if (method.toUpperCase() === 'POST') {
        xhr.open('post', url, true)
        xhr.setRequestHeader(
          'Content-Type',
          'application/x-www-form-urlencoded;charset=utf-8',
        )
        xhr.send(data)
      }
    })
  }
}
