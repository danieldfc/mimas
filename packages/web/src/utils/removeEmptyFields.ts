export default function removeEmptyFields<T>(obj: any): Partial<T> {
  Object.keys(obj).forEach(key => {
    if (obj[key] === '' || obj[key] === undefined || obj[key] === null) {
      delete obj[key]
    }
  })

  return obj
}
