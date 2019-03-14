// @ts-ignore
import errcode from 'err-code'

export const dbOpenFailedError = (err?: string): Error =>
  errcode(err || new Error('Cannot open database'), 'ERR_DB_OPEN_FAILED')

export const dbDeleteFailedError = (err?: string): Error =>
  errcode(err || new Error('Delete failed'), 'ERR_DB_DELETE_FAILED')

export const dbWriteFailedError = (err?: string): Error =>
  errcode(err || new Error('Write failed'), 'ERR_DB_WRITE_FAILED')

export const notFoundError = (err?: string): Error =>
  errcode(err || new Error('Not Found'), 'ERR_NOT_FOUND')
