import { ILoggerContext, ILoggerRuquestManager } from 'src/interface'

export class LoggerRuquestManager implements ILoggerRuquestManager {
  context: ILoggerContext
  constructor(context: ILoggerContext) {
    this.context = context
  }
}
