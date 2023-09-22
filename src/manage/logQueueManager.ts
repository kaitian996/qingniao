import { debugPrint } from '../utils'
import { ILogQueueManager, ILogRecord, ILoggerContext } from '../interface'

export class LogQueueManager implements ILogQueueManager {
  readonly context: ILoggerContext
  public logQueue: ILogRecord[] = []
  constructor(context: ILoggerContext) {
    const startTime = Date.now()
    this.context = context
    const endTime = Date.now()
    debugPrint(false, `初始化消息队列耗时:${endTime - startTime}`)
  }
  public async receiveLogMessage(log: ILogRecord) {
    const { singleModel, logQueueSize, beforeReportHook, afterReportHook } =
      this.context.options
    if (singleModel) {
      beforeReportHook && beforeReportHook()
      // 进行报告
      await this.context.loggerRuquestManager.sendLog(log)
      afterReportHook && afterReportHook()
      debugPrint(true, '日志上报', log)
    } else {
      this.logQueue.push(log)
      if (this.logQueue.length === logQueueSize) {
        await this.context.loggerRuquestManager.sendLog(this.logQueue)
        debugPrint(true, '日志上报', this.logQueue)
        this.logQueue.length = 0
      }
    }
  }
}
