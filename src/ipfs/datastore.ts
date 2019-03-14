// @ts-ignore
import pull from 'pull-stream'
import { ByteArray } from 'tweetnacl-ts'

import Key from './key'
import { Callback, Query, QueryResult } from './types'
import { asyncFilter, asyncSort } from './utils'

// Errors
import * as Errors from './errors'

const INDEX_KEY = 'index'

interface Items {
  [key: string]: ByteArray
}

const set = (key: Key, value: ByteArray) => setMany({ [key.toString()]: value })

const setMany = (items: Items) =>
  new Promise(resolve => {
    chrome.storage.local.set(items, () => {
      resolve()
    })
  })

const get = async (key: Key): Promise<ByteArray> => {
  const keyS = key.toString()
  const items = await getMany(keyS)
  return items[keyS]
}

const getMany = (keys: string | string[]): Promise<Items> =>
  new Promise(resolve => {
    chrome.storage.local.get(keys, items => {
      resolve(items)
    })
  })

const remove = (key: Key) => removeMany(key.toString())

const removeMany = (keys: string | string[]): Promise<void> =>
  new Promise((resolve, reject) => {
    chrome.storage.local.remove(keys, () => {
      resolve()
    })
  })

export class ChromeDatastore {
  public open(callback: () => void) {
    setImmediate(callback)
  }

  public async put(key: Key, value: ByteArray, callback?: () => void) {
    await set(key, value)

    if (callback) {
      callback()
    }
  }

  public async get(key: Key, callback?: Callback<ByteArray>) {
    const item = await get(key)

    if (!item) {
      const error = Errors.notFoundError()

      if (callback) {
        callback(error)
      } else {
        throw error
      }
    }

    if (callback) {
      callback(null, item)
    }

    return item
  }

  public async has(key: Key, callback?: Callback<boolean>) {
    const item = await get(key)
    const exists = item !== undefined

    if (callback) {
      callback(null, exists)
    }

    return exists
  }

  public async delete(key: Key, callback: Callback<void>) {
    await remove(key)

    if (callback) {
      callback(null)
    }
  }

  public batch() {
    let puts: { [key: string]: ByteArray } = {}
    let dels: string[] = []

    return {
      put(key: Key, value: ByteArray) {
        puts[key.toString()] = value
      },

      delete(key: Key) {
        dels.push(key.toString())
      },

      commit: async (callback?: Callback<void>) => {
        await Promise.all([setMany(puts), removeMany(dels)])

        if (callback) {
          callback(null)
        }

        puts = {}
        dels = []
      },
    }
  }

  // TODO
  // public query(q: Query<ByteArray>): QueryResult<ByteArray> {
  //   let tasks = [
  //     pull.keys(this),
  //     // pull.map(k => ({
  //     //   key: new Key(k),
  //     //   value: this.data[k],
  //     // })),
  //   ]

  //   let filters = []

  //   if (q.prefix != null) {
  //     const prefix = q.prefix
  //     filters.push((e, cb) => cb(null, e.key.toString().startsWith(prefix)))
  //   }

  //   if (q.filters != null) {
  //     filters = filters.concat(q.filters)
  //   }

  //   tasks = tasks.concat(filters.map(f => asyncFilter(f)))

  //   if (q.orders != null) {
  //     tasks = tasks.concat(q.orders.map(o => asyncSort(o)))
  //   }

  //   if (q.offset != null) {
  //     let i = 0
  //     // $FlowFixMe
  //     tasks.push(pull.filter(() => i++ >= q.offset))
  //   }

  //   if (q.limit != null) {
  //     tasks.push(pull.take(q.limit))
  //   }

  //   if (q.keysOnly === true) {
  //     tasks.push(pull.map(e => ({ key: e.key })))
  //   }

  //   return pull(...tasks)
  // }

  public close(callback: Callback<void>) {
    setImmediate(callback)
  }

  // TODO
  // private addKey(key: Key, callback: Callback<void>) {
  //   chrome.storage.local.get(INDEX_KEY, ({ index }) => {
  //     index.push(key.toString())
  //     chrome.storage.local.set({ index }, () => {
  //       callback(null)
  //     })
  //   })
  // }

  // private removeKey(key: Key, callback: Callback<void>) {
  //   chrome.storage.local.get(INDEX_KEY, ({ index }) => {
  //     const keyS = key.toString()
  //     index = index.filter((k: string) => k !== keyS)
  //     chrome.storage.local.set({ index }, () => {
  //       callback(null)
  //     })
  //   })
  // }

  // private getIndex(key: Key, callback: Callback<void>) {
  //   chrome.storage.local.get(INDEX_KEY, ({ index }) => {
  //     callback(null, index)
  //   })
  // }
}
