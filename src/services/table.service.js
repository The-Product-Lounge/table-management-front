import { httpService } from './http.service.js'

const BASE_URL = `table/`
const STORAGE_KEY_TABLE = 'tableId'

export const tableService = {
  joinTable,
  clearTables,
  updateTable,
  removeTable,
}

async function clearTables() {
  return httpService.delete(BASE_URL + 'delete-tables')
}

async function joinTable(user) {
  try {
    await httpService.post(BASE_URL + 'join-table', user)
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function updateTable(table) {
  return httpService.put(BASE_URL + table._id, table)
}
async function removeTable(tableId) {
  return httpService.delete(BASE_URL + tableId)
}
