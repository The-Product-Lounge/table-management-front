import { httpService } from './http.service.js'

const BASE_URL = `table/`

export const tableService = {
    joinTable
}

async function joinTable(user) {
    return httpService.post(BASE_URL + 'join-table', user)
}