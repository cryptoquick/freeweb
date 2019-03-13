import { IRequest, IResponse } from './types'

export const fetch = <I, O>(request: IRequest<I>): Promise<O> =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(request, (response: IResponse<O>) => {
      if (response.status < 400) {
        resolve(response.body)
      } else {
        reject(response.statusText)
      }
    })
  })
