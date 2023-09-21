import { ILogQueueManager, ILoggerContext } from 'src/interface'

export class LogQueueManager implements ILogQueueManager {
  context: ILoggerContext
  constructor(context: ILoggerContext) {
    this.context = context
  }
}
