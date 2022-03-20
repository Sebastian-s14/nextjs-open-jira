import { useContext, useMemo, useState } from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import {
    Button,
    capitalize,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'

import { Layout } from '../../components/layouts'
import { Entry, EntryStatus } from '../../interfaces'
import { dbEntries } from '../../database'
import { EntriesContext } from '../../context/entries'

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface EntrypageProps {
    entry: Entry
}

const EntryPage: NextPage<EntrypageProps> = ({ entry }) => {
    const [inputValue, setInputValue] = useState<string>(entry.description)
    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touched, setTouched] = useState<boolean>(false)

    const { updateEntry } = useContext(EntriesContext)

    const isNotValid = useMemo(
        () => inputValue.length <= 0 && touched,
        [inputValue, touched],
    )

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputValue(e.target.value)

    const onStatusChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value as EntryStatus)
    }
    // console.log(entry)

    const onSave = () => {
        if (inputValue.trim().length === 0) return
        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue,
        }
        updateEntry(updatedEntry)
    }

    return (
        <Layout title={inputValue.substring(0, 20) + '...'}>
            <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            // title={`Entrada: ${inputValue}`}
                            title="Entrada: "
                            subheader={`Creada hace ${entry.createdAt} minutos`}
                        />
                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder="Nueva entrada"
                                autoFocus
                                multiline
                                label="Nueva entrada"
                                value={inputValue}
                                onChange={handleInput}
                                helperText={isNotValid && 'Ingrese un valor'}
                                onBlur={() => setTouched(true)}
                                error={isNotValid}
                            />
                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup row value={status} onChange={onStatusChanged}>
                                    {validStatus.map((option) => (
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio />}
                                            label={capitalize(option)}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveOutlinedIcon />}
                                variant="contained"
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length <= 0}>
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'error.dark',
                }}>
                <DeleteOutlined />
            </IconButton>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string }

    const entry = await dbEntries.getEntryById(id)

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            entry,
        },
    }
}

export default EntryPage
