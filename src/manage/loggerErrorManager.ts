import { ILoggerContext, ILoggerErrorManager } from '../interface'

export class LoggerErrorManager implements ILoggerErrorManager {
  readonly context: ILoggerContext
  constructor(context: ILoggerContext) {
    this.context = context
  }
}
