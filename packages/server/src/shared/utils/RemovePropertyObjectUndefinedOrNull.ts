export class RemovePropertyObjectUndefinedOrNull {
  static exec(object: object): object {
    if (!Object.keys(object).length) return {}

    return this.getObjectValid(object)
  }

  static getObjectValid(object: any): object {
    return Object.keys(object).reduce((acc, key) => {
      if (object[key] !== undefined || object[key] !== null) {
        acc[key] = object[key]
      }
      return acc
    }, {} as any)
  }
}
