import { httpService } from './http.service.js'

const BASE_URL = `table/`
const STORAGE_KEY_TABLE = 'table'

export const tableService = {
    joinTable,
    getTableFromStorage
}

async function joinTable(user) {
    try {
        const table = await httpService.post(BASE_URL + 'join-table', user)
        if(table) _putTableInStorage(table)
        return table
    } catch (err) {
        console.error(err)
        throw err
    } 
}

function getTableFromStorage() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_TABLE)) || null
}

function _putTableInStorage(table) {
    sessionStorage.setItem(STORAGE_KEY_TABLE, JSON.stringify(table))
}