import { tableService } from "../../services/table.service"

export function joinTable(user) {
    return async (dispatch) => {
        try {
            const table = await tableService.joinTable(user)
            dispatch({
                type: 'SET_TABLE',
                table
            })
        } catch (err) {
            console.error(err)
            throw err
        }
    }
}