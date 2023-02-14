import { tableService } from '../../services/table.service'

const initialState = {
  tables: [],
  table: tableService.getTableFromStorage(),
}

export function tableReducer(state = initialState, action) {
  let tables
  switch (action.type) {
    case 'SET_TABLE':
      state = { ...state, table: action.table }
      break

    case 'SET_TABLES':
      state = { ...state, tables: action.tables }
      break

    case 'UPDATE_TABLES':
      tables = state.tables.map((table) =>
        table._id === action.table._id ? action.table : table
      )
      state = { ...state, tables }
      break

    default:
      return state
  }
  // For debug:
  window.state = state
  return state
}
