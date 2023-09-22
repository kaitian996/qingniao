import { ILogQueueManager, ILoggerContext } from '../interface'

export class LogQueueManager implements ILogQueueManager {
  readonly context: ILoggerContext
  constructor(context: ILoggerContext) {
    this.context = context
  }
}
