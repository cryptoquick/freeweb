// Bytes
export const bytesEquals = (
  bytesA: Uint8Array,
  bytesB: Uint8Array,
): boolean => {
  if (bytesA.length === bytesB.length) {
    for (let i = 0, ii = bytesA.length; i < ii; i++) {
      if (bytesA[i] !== bytesB[i]) {
        return false
      }
    }
    return true
  }
  return false
}

// Assertions
export const assert = (assertion: boolean, message: string) => {
  if (!assertion) {
    throw new Error(`Assertion Error: ${message}`)
  }
}

export const guard = (value: boolean, message: string) => {
  if (!value) {
    throw new Error(`Assertion Error: ${message}`)
  } else {
    return value
  }
}
