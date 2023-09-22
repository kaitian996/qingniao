import { ILoggerContext, ILoggerSocketManager } from '../interface'

export class LoggerSocketManager implements ILoggerSocketManager {
  readonly context: ILoggerContext
  constructor(context: ILoggerContext) {
    this.context = context
  }
}
