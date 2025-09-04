function process(obj) {
  const result = {};

  for (const key in obj) {
    const subObj = obj[key];
    if (typeof subObj === 'object' && subObj !== null && !Array.isArray(subObj)) {
      const restored = {};
      for (const flatKey in subObj) {
        const value = subObj[flatKey];
        const parts = flatKey.split('#');
        let cur = restored;
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          if (i === parts.length - 1) {
            cur[part] = value;
          } else {
            if (!(part in cur)) cur[part] = {};
            cur = cur[part];
          }
        }
      }
      result[key] = restored;
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}
