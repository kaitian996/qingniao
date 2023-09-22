import { debugPrint } from '../utils'
import { ILogQueueManager, ILoggerContext } from '../interface'

export class LogQueueManager implements ILogQueueManager {
  readonly context: ILoggerContext
  constructor(context: ILoggerContext) {
    const startTime = Date.now()
    this.context = context
    const endTime = Date.now()
    debugPrint(false, `初始化消息队列耗时:${endTime - startTime}`)
  }
}
