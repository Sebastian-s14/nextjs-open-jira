import { useContext, useMemo } from 'react'
import { List, Paper } from '@mui/material'

import { EntriesContext } from '../../context/entries'
import { EntryStatus } from '../../interfaces'
import { EntryCard } from './'

interface EntryListProps {
    status: EntryStatus
}

export const EntryList: React.FC<EntryListProps> = ({ status }) => {
    const { entries } = useContext(EntriesContext)

    const entriesByStatus = useMemo(
        () => entries.filter((entry) => entry.status === status),
        [entries, status],
    )

    // const entriesByStatus = entries.filter((entry) => entry.status === status)

    return (
        <div>
            <Paper
                sx={{
                    height: 'calc(100vh - 180px)',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    backgroundColor: 'transparent',
                    padding: '1px 7px',
                }}>
                <List sx={{ opacity: 1 }}>
                    {entriesByStatus.map((entry) => (
                        <EntryCard key={entry._id} entry={entry} />
                    ))}
                </List>
            </Paper>
        </div>
    )
}
