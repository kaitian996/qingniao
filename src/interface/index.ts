import type { Axios } from 'axios'

export type ILogRecord = {}
export interface ILoggerContextOptions {
  /**
   * @des 命名空间
   */
  nameSpace?: string
  /**
   * @des 全局前缀
   */
  prefix?: string
  /**
   * @des 全局后缀
   */
  postfix?: string
  /**
   * @des 目标主机
   */
  host: string | string[]
  /**
   * @des debug模式
   */
  debug?: {
    use?: boolean
    host?: string | string[]
  }
  /**
   * @des 是否启动单日志上报模式如果启动单日志上报模式，则不会启动上报队列，其余特性不变
   */
  singleModel?: boolean
  /**
   * @des 上报队列最大数量
   */
  logQueueSize?: number
  /**
   * @des 上报函数触发间隔
   */
  logTimeout?: number
  /**
   * @des 日志上报唯一验证key
   */
  accessKey: string
  /**
   * @des 全局上报前钩子
   */
  beforeReportHook?: () => void
  /**
   * @des 全局上报后钩子
   */
  afterReportHook?: () => void
  /**
   * @des 全局错误处理钩子
   */
  catchErrorHook?: () => void
  /**
   * @des 全局异步错误处理钩子
   */
  catchAsyncErrorHook?: () => void
}
export abstract class BaseContext {
  abstract readonly context: ILoggerContext
}
export interface ILogQueueManager extends BaseContext {
  logQueue: ILogRecord[]
  receiveLogMessage(log: ILogRecord): void
}
export interface ILoggerSocketManager extends BaseContext {}
export interface ILoggerRuquestManager extends BaseContext {
  request: Axios
  sendLog(log: ILogRecord | ILogRecord[]): Promise<void>
}
export interface ILoggerErrorManager extends BaseContext {}
export interface ILoggerContext {
  options: ILoggerContextOptions
  logQueueManager: ILogQueueManager
  loggerSocketManager: ILoggerSocketManager
  loggerRuquestManager: ILoggerRuquestManager
}
