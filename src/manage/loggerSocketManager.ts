import { ILoggerContext, ILoggerSocketManager } from 'src/interface'

export class LoggerSocketManager implements ILoggerSocketManager {
  context: ILoggerContext
  constructor(context: ILoggerContext) {
    this.context = context
  }
}
