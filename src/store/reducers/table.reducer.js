const initialState = {
    table: null
}

export function tableReducer(state = initialState, action) {

    switch (action.type) {
        default:
            return state
    }
    // For debug:
    window.state = state
    return state
}