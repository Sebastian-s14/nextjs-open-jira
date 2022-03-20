import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'

import { UIContext } from '../../context/ui'
import { Entry } from '../../interfaces'
import { dateFunctions } from '../../utils'

interface EntryCardProps {
    entry: Entry
}

export const EntryCard: React.FC<EntryCardProps> = ({
    entry: { _id, description, createdAt },
}) => {
    const { startDragging, endDragging } = useContext(UIContext)
    const router = useRouter()

    const onDragStart = (event: React.DragEvent) => {
        event.dataTransfer.setData('text', _id)
        startDragging()
    }

    const onDragEnd = () => endDragging()

    const onClick = () => router.push(`entries/${_id}`)

    return (
        <Card
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={onClick}>
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{description}</Typography>
                </CardContent>
                <CardActions
                    sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant="body2">
                        {dateFunctions.getFormatDistanceToNow(createdAt)}
                    </Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
