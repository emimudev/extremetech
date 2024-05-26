export function existSearchParam(
  searchParams: URLSearchParams,
  key: string,
  value: string | undefined = undefined,
  caseSensitive = false
) {
  if (caseSensitive) {
    return searchParams.has(key, value)
  }
  let exist = false
  searchParams.forEach((v, k) => {
    if (k.toLocaleLowerCase() === key.toLocaleLowerCase()) {
      if (value) {
        if (v.toLocaleLowerCase() === value.toLocaleLowerCase()) {
          exist = true
        }
      } else {
        exist = true
      }
    }
  })
  return exist
}
