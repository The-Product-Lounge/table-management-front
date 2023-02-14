import { httpService } from './http.service.js'

const BASE_URL = `table/`
const STORAGE_KEY_TABLE = 'table'

export const tableService = {
  joinTable,
  getById,
  getTableFromStorage,
  getTables,
  clearTables,
  updateTable,
}

async function getTables() {
  return httpService.get(BASE_URL)
}

async function clearTables() {
  return httpService.delete(BASE_URL + 'delete-tables')
}

async function joinTable(user) {
  try {
    const table = await httpService.post(BASE_URL + 'join-table', user)
    if (table) _putTableInStorage(table)
    return table
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function updateTable(table) {
  if (table._id) {
    return httpService.put(BASE_URL + table._id, table)
  }
}

async function getById(tableId) {
  try {
    const table = await httpService.get(BASE_URL + tableId)
    return table
  } catch (err) {
    console.error(err)
    _deleteTableFromStorage()
    throw err
  }
}

function getTableFromStorage() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_TABLE)) || null
}

function _putTableInStorage(table) {
  sessionStorage.setItem(STORAGE_KEY_TABLE, JSON.stringify(table))
}

function _deleteTableFromStorage() {
  sessionStorage.removeItem(STORAGE_KEY_TABLE)
}
