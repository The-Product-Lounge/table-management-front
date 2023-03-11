import { httpService } from './http.service.js'

const BASE_URL = `table/`
const STORAGE_KEY_TABLE = 'tableId'

export const tableService = {
  joinTable,
  getById,
  getTableIdFromStorage,
  getTables,
  clearTables,
  updateTable,
  removeTable,
  putTableIdInStorage,
  removeTableIdFromStorage,
}

async function getTables() {
  return httpService.get(BASE_URL)
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

async function getById(tableId) {
  try {
    const table = await httpService.get(BASE_URL + tableId)
    if (!table) throw new Error()
    return table
  } catch (err) {
    throw err
  }
}

function getTableIdFromStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_TABLE)) || null
}

function putTableIdInStorage(table) {
  localStorage.setItem(STORAGE_KEY_TABLE, JSON.stringify(table))
}

function removeTableIdFromStorage() {
  localStorage.removeItem(STORAGE_KEY_TABLE)
}
