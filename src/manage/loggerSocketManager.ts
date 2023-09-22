import { debugPrint } from '../utils'
import { ILoggerContext, ILoggerSocketManager } from '../interface'

export class LoggerSocketManager implements ILoggerSocketManager {
  readonly context: ILoggerContext
  constructor(context: ILoggerContext) {
    const startTime = Date.now()
    this.context = context
    const endTime = Date.now()
    debugPrint(false, `初始化socket耗时:${endTime - startTime}`)
  }
}
