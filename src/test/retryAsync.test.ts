import Action from '../index'
import assert = require('assert')

describe('可以重试 async 操作', () => {
  let db = null

  function initDB() {
    db = []
  }

  async function insertData() {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          db.push(1)
          resolve()
        } catch (ex) {
          reject(ex)
        }
      }, 1000)
    })
  }

  async function insertAndReturn() {
    await insertData()
    return db
  }

  const handlers = [
    {
      error: "Cannot read property 'push' of null",
      handler: initDB,
    },
  ]

  it('async 能够成功', async () => {
    await Action.retryAsync(insertData, 1, handlers)
    assert(db.length === 1)
  })

  it('async 重试后能够返回值', async () => {
    db = null
    let result = await Action.retryAsync(insertAndReturn, 1, handlers)
    assert(db.length === 1)
    assert.deepStrictEqual(result, [1])
  })
})
