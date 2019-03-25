function logException(ex, logger) {
  logger.error('!Error!!!', { ex })
}

async function tryHandleError(expectedMessage, ex, handler, retry, retryResult, logger = console) {
  if (typeof expectedMessage === 'string') {
    expectedMessage = new RegExp('^' + expectedMessage + '$')
  }

  logger.debug(`testing "${ex.message}" by /${expectedMessage}/...`)
  if (!expectedMessage.test(ex.message)) {
    logger.debug(`:( can't handle "${ex.message} by ${expectedMessage}`)
    return false
  }

  logger.debug(`handling "${ex.message} by ${expectedMessage} with retry: ${!!retry}...`)
  handler()

  if (retry) {
    retryResult.result = await retry()
  }

  return true
}

async function handleException(ex, handlers, retry, retryResult, logger = console) {
  logException(ex, logger)

  let fixed = false
  logger.debug('try to fix it...')
  try {
    for (let i = 0; i < handlers.length; i++) {
      if ((fixed = await tryHandleError(handlers[i].error, ex, handlers[i].handler, retry, retryResult, logger))) {
        logger.debug(`handled by: ${handlers[i].handler} with retry: ${!!retry}`)
        break
      }
    }
  } catch (innerException) {
    logException(innerException, logger)

    throw innerException
  }

  if (!fixed) {
    throw ex
  }
}

export default class RetryAsyncAction {
  static async retry(action, maxRetryCount, handlers, logger) {
    logger.debug('(:o) trying Action with maxRetryCount = ', maxRetryCount, '...')

    if (maxRetryCount <= 0) {
      return await action()
    }

    try {
      return await action()
    } catch (actionException) {
      const retryResult = {
        result: undefined,
      }
      try {
        await handleException(
          actionException,
          handlers,
          async () => {
            return await RetryAsyncAction.retry(action, maxRetryCount - 1, handlers, logger)
          },
          retryResult,
          logger,
        )
      } catch (handlerException) {
        handlerException(
          handlerException,
          handlers,
          async () => {
            return await RetryAsyncAction.retry(action, maxRetryCount - 1, handlers, logger)
          },
          retryResult,
        )
      }

      return retryResult.result
    }
  }
}
