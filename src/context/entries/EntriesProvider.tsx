import { useEffect, useReducer } from 'react'

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

    const addNewEntry = async (description: string) => {
        const { data } = await entriesApi.post<Entry>('/entries', {
            description,
        })
        dispatch({ type: '[ENTRIES] - Add Entry', payload: data })
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
