import { tableService } from '../../services/table.service'

export function joinTable(user) {
  return async (dispatch) => {
    try {
      const table = await tableService.joinTable(user)
      // dispatch({
      //   type: 'SET_TABLE',
      //   table,
      // })
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

export function getTables() {
  return async (dispatch) => {
    try {
      const tables = await tableService.getTables()
      dispatch({
        type: 'SET_TABLES',
        tables: [...tables],
      })
    } catch (err) {
      console.log('Cannot get tables', err)
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
      tableService.removeTableFromStorage()
      dispatch({ type: 'SET_TABLE', table: null })
      throw err
    }
  }
}

export function updateTables(table) {
  return async (dispatch, getState) => {
    const prevTables = getState().tableModule.tables
    dispatch({ type: 'UPDATE_TABLES', table })

    try {
      await tableService.updateTable(table)
    } catch (err) {
      dispatch({ type: 'SET_TABLES', tables: prevTables })
      console.log('Cannot update table', err)
    }
  }
}

export function clearTables() {
  return async (dispatch) => {
    try {
      await tableService.clearTables()
      dispatch({ type: 'SET_TABLES', tables: [] })
    } catch (err) {
      console.log('Cannot clear tables', err)
    }
  }
}

export function removeTable(tableId) {
  return async (dispatch) => {
    try {
      await tableService.removeTable(tableId)
      dispatch({ type: 'REMOVE_TABLE', tableId })
    } catch (err) {
      throw err
    }
  }
}
