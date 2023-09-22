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
import { mergeConfig } from '../utils'

export class LoggerContext implements ILoggerContext {
  public options: ILoggerContextOptions
  public logQueueManager: ILogQueueManager
  public loggerSocketManager: ILoggerSocketManager
  public loggerRuquestManager: ILoggerRuquestManager
  private loggerErrorManager: ILoggerErrorManager
  constructor(options: ILoggerContextOptions) {
    this.options = mergeConfig(defaultLoggerContextConfig, options)
    this.logQueueManager = new LogQueueManager(this)
    this.loggerSocketManager = new LoggerSocketManager(this)
    this.loggerRuquestManager = new LoggerRuquestManager(this)
    this.loggerErrorManager = new LoggerErrorManager(this)
    window && (window['_qingniao_LoggerContext'] = this)
  }
  public reportLog() {}
  public aspectRequest(): MethodDecorator {
    return (target, propertyKey, descriptor) => {}
  }
}

export const QingNiaoLogger = LoggerContext
