import RetryAction from './retry';
import RetryAsyncAction from './retryAsync';

type Handlers = Array<{
  error: string | RegExp,
  handler: () => void
}>;

interface ILogger {
  debug: (...args)=>void;
}

export default class Action {
  static retry(action: () => void, maxRetryCount: number, handlers: Handlers, logger: ILogger = console) {
    return RetryAction.retry(action, maxRetryCount, handlers, logger);
  }

  static retryAsync(action: () => Promise<void>, maxRetryCount: number, handlers: Handlers, logger: ILogger = console) {
    return RetryAsyncAction.retry(action, maxRetryCount, handlers, logger);
  }
}
