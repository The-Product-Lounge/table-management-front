export const utilService = {
  makeId,
  reformatKeyValuePairToArray,
  isInHebrew
}

function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function reformatKeyValuePairToArray(object, orderBy) {
  if (!object) return []
  const entityArray = []
  for (const entityKey in object) {
    const entity = object[entityKey];
    entityArray.push({ id: entityKey, ...entity });
  }
  if (orderBy) entityArray.sort((a, b) => a[orderBy] - b[orderBy]);
  return entityArray;
}

function isInHebrew(text) {
  const regex = /^[\u0590-\u05FF\s]+$/; // Regex to match Hebrew characters and white spaces

  if (regex.test(text)) {
    return true
  }
  return false
}
