import { debugPrint } from '../utils'
import { ILogRecord, ILoggerContext, ILoggerRuquestManager } from '../interface'
import axios, { Axios } from 'axios'

export class LoggerRuquestManager implements ILoggerRuquestManager {
  readonly context: ILoggerContext
  public request: Axios
  constructor(context: ILoggerContext) {
    const startTime = Date.now()
    this.context = context
    this.request = axios.create({
      timeout: 10000,
    })
    const endTime = Date.now()
    debugPrint(false, `初始化ajax耗时:${endTime - startTime}`)
  }
  public async sendLog(log: ILogRecord | ILogRecord[]) {
    const { host } = this.context.options
    if (typeof host === 'string') {
      try {
        await this.request.post(host, log)
      } catch (error) {
        debugPrint(true, '日志上报失败', `host:${host}`, error)
      }
    } else if (Array.isArray(host)) {
      host.forEach(async (target) => {
        try {
          await this.request.post(target, log)
        } catch (error) {
          debugPrint(true, '日志上报失败', `host:${host}`, error)
        }
      })
    }
  }
}
