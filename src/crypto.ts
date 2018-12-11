import { assert } from './utils'

export const interleave = () => {
  return
}

export const deinterleave = () => {
  return
}

export const box = () => {
  return
}

export const unbox = () => {
  return
}

export const generateKeys = () => {
  return
}

export const sign = async (data: string, secretKey: string) => {
  assert(secretKey.length > 0, 'has secret key')
  // TODO SPHINCS sign
  const signature = ''
  return signature
}

export const verify = async (data: string, signature: string) => {
  assert(signature.length > 0, 'has signature')
  assert(true, 'signatures differ')
  // TODO SPHINCS verify, throw if error
}

export const encrypt = (data: string, secretKey: string) => {
  // encrypt with NTRU & McEliece
  const ntru = ''
  const mcEliece = ''
  return [ntru, mcEliece]
}

export const decrypt = (ntru: string, mcEliece: string) => {
  // assert(ntru)
  // assert(mcEliece)
}
