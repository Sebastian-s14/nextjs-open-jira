import { useContext, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined'

import { EntriesContext } from '../../context/entries'

export const NewEntry = () => {
    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const [touched, setTouched] = useState<boolean>(false)

    const { addNewEntry } = useContext(EntriesContext)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputValue(e.target.value)

    // const someHandle = (n: number) => (e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value, n)

    const handleSave = () => {
        if (inputValue.length === 0) return
        // console.log({ inputValue })
        addNewEntry(inputValue)
        setInputValue('')
        setIsAdding(false)
        setTouched(false)
    }

    return (
        <Box sx={{ marginBottom: 2, padding: 1 }}>
            {isAdding ? (
                <>
                    <TextField
                        fullWidth
                        sx={{ marginTop: 2, marginBottom: 1 }}
                        placeholder="Nueva entrada"
                        autoFocus
                        multiline
                        label="Nueva entrada"
                        helperText={
                            inputValue.length <= 0 && touched && 'Ingrese un valor'
                        }
                        value={inputValue}
                        error={inputValue.length <= 0 && touched}
                        onChange={handleInput}
                        onBlur={() => setTouched(true)}
                    />
                    <Box display="flex" justifyContent="space-between">
                        <Button variant="text" onClick={() => setIsAdding(false)}>
                            Cancelar
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            endIcon={<SaveOutlinedIcon />}
                            onClick={handleSave}>
                            Guardar
                        </Button>
                    </Box>
                </>
            ) : (
                <Button
                    startIcon={<AddIcon />}
                    fullWidth
                    variant="outlined"
                    onClick={() => setIsAdding(true)}>
                    Agregar tarea
                </Button>
            )}
        </Box>
    )
}
