import { tableService } from '../../services/table.service'

export function joinTable(user) {
  return async (dispatch) => {
    try {
      const table = await tableService.joinTable(user)
      dispatch({
        type: 'SET_TABLE',
        table,
      })
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

export function loadTables() {
  return async (dispatch) => {
    try {
      const tables = await tableService.query()
      dispatch({
        type: 'SET_TABLES',
        tables: [...tables],
      })
    } catch (err) {
      console.log('Cannot load tables', err)
    }
  }
}

export function getTable(tableId) {
  return async (dispatch) => {
    try {
      const table = await tableService.getById(tableId)
      dispatch({ type: 'SET_TABLE', table: { ...table } })
    } catch (err) {
      console.log(`cannot get table:`, err)
      dispatch({ type: 'SET_TABLE', table: null })
      throw err
    }
  }
}
