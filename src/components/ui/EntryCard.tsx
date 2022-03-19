import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { Entry } from '../../interfaces'

interface EntryCardProps {
    entry: Entry
}

export const EntryCard: React.FC<EntryCardProps> = ({
    entry: { description, createdAt },
}) => {
    return (
        <Card sx={{ marginBottom: 1 }}>
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{description}</Typography>
                </CardContent>
                <CardActions
                    sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant="body2">{createdAt}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
