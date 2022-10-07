export function proxyRoutesMapFromTarget<T =any>(obj: T, target: Record<string, any>, filterKeys: string[] = []) {
    const keys = Object.keys(target).filter(i => !filterKeys.includes(i));
    keys.forEach(key => {
      Object.defineProperty(obj, key, {
        get: () => {
          const route = target[key];
          if (Array.isArray(route)) {
            return route[route.length - 1]
          }
          return route
        }
      })
    })
  }