export const utilService = {
  makeId,
  reformatKeyValuePairToArray
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
