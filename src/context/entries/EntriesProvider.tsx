import { useEffect, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces'
import { entriesApi } from '../../apis'

export interface EntriesState {
    entries: Entry[]
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending',
        }
        dispatch({ type: '[ENTRIES] - Add Entry', payload: newEntry })
    }

    const updateEntry = (entry: Entry) =>
        dispatch({ type: '[ENTRIES] - Entry-Updated', payload: entry })

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries')
        dispatch({ type: '[ENTRIES] - Refresh-data', payload: data })
    }

    useEffect(() => {
        refreshEntries()
    }, [])

    return (
        <EntriesContext.Provider
            value={{
                ...state,
                addNewEntry,
                updateEntry,
            }}>
            {children}
        </EntriesContext.Provider>
    )
}
