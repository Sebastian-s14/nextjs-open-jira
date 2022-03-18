import { EntriesState } from './'

type EntriesActiontype = { type: '[ENTRIES] - ActionName' }

export const entriesReducer = (
    state: EntriesState,
    action: EntriesActiontype,
): EntriesState => {
    switch (action.type) {
        case '[ENTRIES] - ActionName':
            return {
                ...state,
            }

        default:
            return state
    }
}
