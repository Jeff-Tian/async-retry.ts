import Action from '../index'
import assert = require('assert')

describe('可以重试', () => {
  let db = null

  function initDB() {
    db = []
  }

  function insertData() {
    db.push(1)
  }

  function insertAndReturn() {
    db.push(1)

    return db
  }

  const handlers = [
    {
      error: "Cannot read property 'push' of null",
      handler: initDB,
    },
  ]

  it('能够成功', () => {
    Action.retry(insertData, 1, handlers)
    assert(db.length === 1)
  })

  it('重试后能够返回值', () => {
    db = null
    let result = Action.retry(insertAndReturn, 1, handlers)
    assert(db.length === 1)
    assert.deepStrictEqual(result, [1])
  })
})
