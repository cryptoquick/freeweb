// @ts-ignore
import Source from 'pull-defer/source'
// @ts-ignore
import pull from 'pull-stream'

// Lots of type assumptions in this file...
type AbortCB = (aborted: string | null, data?: string) => void
type TestCB = (
  err: string | undefined,
  cb: (err: string, valid: string) => void,
) => void

export const asyncFilter = (test: TestCB) => {
  let busy = false
  let abortCb: AbortCB
  let aborted: string

  return (read: (abort: string | null, cb: AbortCB) => void) => {
    const next = (abort: string | null, cb: AbortCB) => {
      if (aborted) {
        return cb(aborted)
      }
      if (abort) {
        aborted = abort
        if (!busy) {
          read(abort, cb)
        } else {
          read(abort, () => {
            // if we are still busy, wait for the test to complete.
            if (busy) {
              abortCb = cb
            } else {
              cb(abort)
            }
          })
        }
      } else {
        read(null, (end, data) => {
          if (end) {
            cb(end)
          } else if (aborted) {
            cb(aborted)
          } else {
            busy = true
            test(data, (err, valid) => {
              busy = false
              if (aborted) {
                cb(aborted)
                abortCb(aborted)
              } else if (err) {
                next(err, cb)
              } else if (valid) {
                cb(null, data)
              } else {
                next(null, cb)
              }
            })
          }
        })
      }
    }
    return next
  }
}

type SorterCB = (err: string, res: string) => void
type Sorter = (ary: number, cb: SorterCB) => void

export const asyncSort = (sorter: Sorter) => {
  const source = Source()

  const sink = pull.collect((sinkErr: string, ary: number) => {
    if (sinkErr) {
      return source.abort(sinkErr)
    }
    sorter(ary, (err, _res) => {
      if (err) {
        return source.abort(err)
      }
      source.resolve(pull.values(ary))
    })
  })

  return (read: boolean) => {
    sink(read)
    return source
  }
}

export const replaceStartWith = (s: string, r: string) => {
  const matcher = new RegExp('^' + r)
  return s.replace(matcher, '')
}
