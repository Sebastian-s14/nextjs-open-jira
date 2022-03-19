import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined'

export const NewEntry = () => {
    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const [touched, setTouched] = useState<boolean>(false)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputValue(e.target.value)

    // const someHandle = (n: number) => (e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value, n)

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
                        helperText="Ingrese un valor"
                        value={inputValue}
                        onChange={handleInput}
                    />
                    <Box display="flex" justifyContent="space-between">
                        <Button variant="text" onClick={() => setIsAdding(false)}>
                            Cancelar
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            endIcon={<SaveOutlinedIcon />}>
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
