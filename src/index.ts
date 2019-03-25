import RetryAction from './retry'
import RetryAsyncAction from './retryAsync'

export default class Action {
  static retry(action, maxRetryCount, handlers, logger = console) {
    return RetryAction.retry(action, maxRetryCount, handlers, logger)
  }

  static retryAsync(action, maxRetryCount, handlers, logger = console) {
    return RetryAsyncAction.retry(action, maxRetryCount, handlers, logger)
  }
}
