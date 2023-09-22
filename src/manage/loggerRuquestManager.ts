import { debugPrint } from '../utils'
import { ILoggerContext, ILoggerRuquestManager } from '../interface'

export class LoggerRuquestManager implements ILoggerRuquestManager {
  readonly context: ILoggerContext
  constructor(context: ILoggerContext) {
    const startTime = Date.now()
    this.context = context
    const endTime = Date.now()
    debugPrint(false,`初始化ajax耗时:${endTime - startTime}`)
  }
}
