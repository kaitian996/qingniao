import { ILoggerContext, ILoggerRuquestManager } from '../interface'

export class LoggerRuquestManager implements ILoggerRuquestManager {
  readonly context: ILoggerContext
  constructor(context: ILoggerContext) {
    this.context = context
  }
}
