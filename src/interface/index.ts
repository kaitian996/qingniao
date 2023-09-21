export interface ILogRecord {}
export abstract class BaseContext {
  abstract readonly context: ILoggerContext
}
export interface ILogQueueManager extends BaseContext {}
export interface ILoggerSocketManager extends BaseContext {}
export interface ILoggerRuquestManager extends BaseContext {}
export interface ILoggerContextOptions {
  nameSpace?: string
  prefix?: string
  postfix?: string
  host?: string | string[]
  debug?: {
    use?: boolean
    host?: string | string[]
  }
}
export interface ILoggerContext {
  options: ILoggerContextOptions
  logQueueManager: ILogQueueManager
  loggerSocketManager: ILoggerSocketManager
  loggerRuquestManager: ILoggerRuquestManager
}
