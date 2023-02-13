import { tableService } from '../../services/table.service'

const initialState = {
  tables: [],
  table: tableService.getTableFromStorage(),
}

export function tableReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TABLE':
      state = { ...state, table: action.table }
      break

    default:
      return state
  }
  // For debug:
  window.state = state
  return state
}
