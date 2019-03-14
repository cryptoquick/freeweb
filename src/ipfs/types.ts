import Key from './key'

export interface Query<Value> {
  prefix?: string
  filters?: Array<Filter<Value>>
  orders?: Array<Order<Value>>
  limit?: number
  offset?: number
  keysOnly?: boolean
}

interface QueryEntry<Value> {
  key: Key
  value?: Value
}

export type Callback<T> = (err: Error | null, data?: T) => void

type Filter<Value> = (qe: QueryEntry<Value>, cb: Callback<boolean>) => void

type PullEnd = boolean | Error

type PullSourceCallback<Value> = (end?: PullEnd, val?: Value) => void

type PullSource<Value> = (end?: PullEnd, cb?: PullSourceCallback<Value>) => void

export type QueryResult<Value> = PullSource<QueryEntry<Value>>

type Order<Value> = (
  qr: QueryResult<Value>,
  cb: Callback<QueryResult<Value>>,
) => void
