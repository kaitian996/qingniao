import { defaultLoggerContextConfig } from '../config'
import {
  ILogQueueManager,
  ILogType,
  ILoggerContext,
  ILoggerContextOptions,
  ILoggerErrorManager,
  ILoggerRuquestManager,
  ILoggerSocketManager,
} from '../interface'
import { LogQueueManager } from '../manage/logQueueManager'
import { LoggerErrorManager } from '../manage/loggerErrorManager'
import { LoggerRuquestManager } from '../manage/loggerRuquestManager'
import { LoggerSocketManager } from '../manage/loggerSocketManager'
import { debugPrint, mergeConfig, mergeLog, printStep } from '../utils'

export class LoggerContext implements ILoggerContext {
  public options: ILoggerContextOptions
  public logQueueManager: ILogQueueManager
  public loggerSocketManager: ILoggerSocketManager
  public loggerRuquestManager: ILoggerRuquestManager
  public loggerErrorManager: ILoggerErrorManager
  constructor(options: ILoggerContextOptions) {
    const startTime = Date.now()
    this.options = mergeConfig(defaultLoggerContextConfig, options)
    window && (window['_qingniao_LoggerContext'] = this)
    window && (window['__QINGNIAO_DEV__'] = this.options.debug?.use || false)
    if (!this.options.host) {
      throw new Error('目标主机必须传入！')
    }
    if (!this.options.accessKey) {
      throw new Error('accessKey为必传项！')
    }
    debugPrint(false, '合并用户配置:', this.options)
    this.logQueueManager = new LogQueueManager(this)
    this.loggerSocketManager = new LoggerSocketManager(this)
    this.loggerRuquestManager = new LoggerRuquestManager(this)
    this.loggerErrorManager = new LoggerErrorManager(this)
    const endTime = Date.now()
    debugPrint(true, `项目启动耗时:${endTime - startTime}`)
  }
  public reportLog(log: ILogType) {
    this.logQueueManager.receiveLogMessage(mergeLog(log))
  }
  public aspectRequest(url: string): MethodDecorator {
    //@ts-expect-error
    return (
      target,
      propertyKey,
      descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
    ) => {
      if (!descriptor) return console.error('不支持方法装饰器')
      const originalMethod = descriptor.value
      descriptor.value = async (...args: any[]) => {
        const startTime = Date.now()
        const res = await originalMethod?.apply(this, args)
        const endTime = Date.now()
        this.reportLog({
          type: 'log',
          eventType: 'request',
          timeConsuming: endTime - startTime,
        })
        printStep()
        return res
      }
    }
  }
}

export const QingNiaoLogger = LoggerContext
