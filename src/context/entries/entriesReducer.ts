import { EntriesState } from './'
import { Entry } from '../../interfaces'

type EntriesActiontype = { type: '[ENTRIES] - Add Entry'; payload: Entry }

export const entriesReducer = (
    state: EntriesState,
    action: EntriesActiontype,
): EntriesState => {
    switch (action.type) {
        case '[ENTRIES] - Add Entry':
            return {
                ...state,
                entries: [...state.entries, action.payload],
            }

        default:
            return state
    }
}
