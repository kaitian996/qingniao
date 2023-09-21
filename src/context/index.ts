import { defaultLoggerContextConfig } from 'src/config'
import {
  ILogQueueManager,
  ILoggerContext,
  ILoggerContextOptions,
  ILoggerRuquestManager,
  ILoggerSocketManager,
} from 'src/interface'
import { LogQueueManager } from 'src/manage/logQueueManager'
import { LoggerRuquestManager } from 'src/manage/loggerRuquestManager'
import { LoggerSocketManager } from 'src/manage/loggerSocketManager'
import { mergeConfig } from 'src/utils'

export class LoggerContext implements ILoggerContext {
  public options: ILoggerContextOptions
  public logQueueManager: ILogQueueManager
  public loggerSocketManager: ILoggerSocketManager
  public loggerRuquestManager: ILoggerRuquestManager
  constructor(options: ILoggerContextOptions) {
    this.options = mergeConfig(defaultLoggerContextConfig, options)
    this.logQueueManager = new LogQueueManager(this)
    this.loggerSocketManager = new LoggerSocketManager(this)
    this.loggerRuquestManager = new LoggerRuquestManager(this)
    window && (window['_qingniao_LoggerContext'] = this)
  }
  public reportLog() {}
  public aspectRequest(): MethodDecorator {
    return () => {}
  }
}
