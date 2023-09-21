import { ILoggerContextOptions } from 'src/interface'

export const defaultLoggerContextConfig: ILoggerContextOptions = {
  nameSpace: '',
  accessKey: '',
  prefix: '',
  postfix: '',
  host: '',
  debug: {
    use: false,
    host: '',
  },
  singleModel: false,
  logQueueSize: 10,
  logTimeout: 500,
  beforeReportHook: undefined,
  afterReportHook: undefined,
  catchErrorHook: undefined,
  catchAsyncErrorHook: undefined,
}
