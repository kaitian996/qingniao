import { debugPrint } from '../utils'
import { ILoggerContext, ILoggerErrorManager } from '../interface'

export class LoggerErrorManager implements ILoggerErrorManager {
  readonly context: ILoggerContext
  constructor(context: ILoggerContext) {
    const startTime = Date.now()
    this.context = context
    const endTime = Date.now()
    debugPrint(false, `初始化错误捕获耗时:${endTime - startTime}`)
  }
}
