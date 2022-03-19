import { useContext, useMemo } from 'react'
import { List, Paper } from '@mui/material'

import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'

import { EntryStatus } from '../../interfaces'
import { EntryCard } from './'

import styles from './EntryList.module.css'

interface EntryListProps {
    status: EntryStatus
}

export const EntryList: React.FC<EntryListProps> = ({ status }) => {
    const { entries, updateEntry } = useContext(EntriesContext)

    const { isDragging, endDragging } = useContext(UIContext)

    const entriesByStatus = useMemo(
        () => entries.filter((entry) => entry.status === status),
        [entries, status],
    )

    const allowDrop = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault()

    const onDropEntry = (event: React.DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text')

        const entry = entries.find((entry) => entry._id === id)!
        entry.status = status
        updateEntry(entry)
        endDragging()
    }

    return (
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ''}>
            <Paper
                sx={{
                    height: 'calc(100vh - 180px)',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    backgroundColor: 'transparent',
                    padding: '1px 7px',
                }}>
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
                    {entriesByStatus.map((entry) => (
                        <EntryCard key={entry._id} entry={entry} />
                    ))}
                </List>
            </Paper>
        </div>
    )
}
