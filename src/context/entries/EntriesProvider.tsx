import { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces'

export interface EntriesState {
    entries: Entry[]
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'example description',
            createdAt: Date.now(),
            status: 'pending',
        },
        {
            _id: uuidv4(),
            description: 'example description 2',
            createdAt: Date.now() - 1000000,
            status: ' in-progress',
        },
        {
            _id: uuidv4(),
            description: 'example description 3',
            createdAt: Date.now() - 100000,
            status: 'finished',
        },
    ],
}

export const EntriesProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)
    return (
        <EntriesContext.Provider
            value={{
                ...state,
            }}>
            {children}
        </EntriesContext.Provider>
    )
}
