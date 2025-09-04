
function process(obj) {
  const result = {};
  const shouldBeFlatten = (o) => typeof o === 'object'
    && o !== null
    && !Array.isArray(o);

  function flattenSub(subObj, prefix, res) {
    if (prefix && Object.keys(subObj).length === 0 && !Array.isArray(subObj)) {
      res[prefix] = {};
      return;
    }

    for (const k in subObj) {
      const newPrefix = prefix ? prefix + '#' + k : k;
      if (shouldBeFlatten(subObj[k])) {
        flattenSub(subObj[k], newPrefix, res);
      } else {
        res[newPrefix] = subObj[k];
      }
    }
  }

  for (const key in obj) {
    if (shouldBeFlatten(obj[key])) {
      result[key] = {};
      flattenSub(obj[key], '', result[key]);
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}