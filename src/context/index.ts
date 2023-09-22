import { defaultLoggerContextConfig } from '../config'
import {
  ILogQueueManager,
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
import { debugPrint, mergeConfig } from '../utils'

export class LoggerContext implements ILoggerContext {
  public options: ILoggerContextOptions
  public logQueueManager: ILogQueueManager
  public loggerSocketManager: ILoggerSocketManager
  public loggerRuquestManager: ILoggerRuquestManager
  public loggerErrorManager: ILoggerErrorManager
  constructor(options: ILoggerContextOptions) {
    const startTime = Date.now()
    this.options = mergeConfig(defaultLoggerContextConfig, options)
    debugPrint(false, '合并用户配置:', this.options)
    this.logQueueManager = new LogQueueManager(this)
    this.loggerSocketManager = new LoggerSocketManager(this)
    this.loggerRuquestManager = new LoggerRuquestManager(this)
    this.loggerErrorManager = new LoggerErrorManager(this)
    window && (window['_qingniao_LoggerContext'] = this)
    const endTime = Date.now()
    debugPrint(true, `项目启动耗时:${endTime - startTime}`)
  }
  public reportLog() {}
  public aspectRequest(): MethodDecorator {
    return (target, propertyKey, descriptor) => {}
  }
}

export const QingNiaoLogger = LoggerContext
