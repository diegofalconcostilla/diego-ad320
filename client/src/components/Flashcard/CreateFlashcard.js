import React, { useState } from "react"
import { Button, Stack, TextField } from "@mui/material"
import axios from 'axios'

const CreateFlashcard = ({ userId, deckId }) => {
    console.log(`[CreateFlashcard] deckId is ${deckId}`)
    const [formValue, setFormValue] = useState({})
    const [errors, setErrors] = useState({
        frontImage: null,
        frontText: null,
        backImage: null,
        backText: null
    })

    function validateProperty(fieldName, fieldValue) {
        const fieldValueTrimmed = fieldValue.trim()
        if (fieldValueTrimmed === '') {
            return `Field can't be empty`
        }
        if (fieldName === "frontImage" || fieldName === "backImage") {
            const urlValidation = fieldValue.match((/(http(s)?:\/\/.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g))
            if (urlValidation == null) {
                return `Field url is invalid`
            }
        }

        return null
    }

    const handleChange = (event) => {
        event.preventDefault()
        console.log("[CreateFlashcard] onChange ", event)
        const validation = validateProperty(event.target.name, event.target.value)
        if (validation !== null) {
            const fieldName = event.target.name
            switch (fieldName) {
                case 'frontImage':
                    setErrors({ ...errors, frontImage: validation })
                    break;
                case 'frontText':
                    setErrors({ ...errors, frontText: validation })
                    break;
                case 'backImage':
                    setErrors({ ...errors, backImage: validation })
                    break;
                case 'backText':
                    setErrors({ ...errors, backText: validation })
                    break;
                default:
                    break;
            }
    
        } else {
            const fieldName = event.target.name
            switch (fieldName) {
                case 'frontImage':
                    setErrors({ ...errors, frontImage: null })
                    break;
                case 'frontText':
                    setErrors({ ...errors, frontText: null })
                    break;
                case 'backImage':
                    setErrors({ ...errors, backImage: null })
                    break;
                case 'backText':
                    setErrors({ ...errors, backText: null })
                    break;
                default:
                    break;
            }
            const currentValues = formValue
            currentValues[event.target.name] = event.target.value
            
            setFormValue(currentValues)
        }
    }

    const handleSubmit = async (event) => {
        console.log("[CreateFlashcard] onSubmit ", event)
        event.preventDefault()
        try {
            const response = await axios.post(`http://localhost:8000/decks/${deckId}/cards`, formValue, { headers: { user: userId } })
            console.log(`[createflashcard] response submit ${response.status}`)
        } catch (err) {
            console.log(`response error ${err.status}`)
        }
    }

    return (
        <Stack component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <span>Form values: {formValue.frontText} &amp; {formValue.backText}</span>
            <TextField
                margin="normal"
                required
                fullWidth
                id="frontImage"
                label="Front Image"
                name="frontImage"
                onChange={handleChange}
                autoFocus
                error={errors.frontImage !== null}
            />
            {errors.frontImage !== null &&
                <span>{errors.frontImage} </span>
            }
            <TextField
                margin="normal"
                required
                fullWidth
                name="frontText"
                label="Front Text"
                id="frontText"
                onChange={handleChange}
                error={errors.frontText !== null}
            />
            {errors.frontText !== null &&
                <span>{errors.frontText} </span>
            }
            <TextField
                margin="normal"
                required
                fullWidth
                id="backImage"
                label="Back Image"
                name="backImage"
                onChange={handleChange}
                error={errors.backImage !== null}
            />
            {errors.backImage !== null &&
                <span>{errors.backImage} </span>
            }
            <TextField
                margin="normal"
                required
                fullWidth
                name="backText"
                label="Back Text"
                id="backText"
                onChange={handleChange}
                error={errors.backText !== null}
            />
            {errors.backText !== null  &&
                <span>{errors.backText} </span>
            }
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Submit
            </Button>
        </Stack>
    )
}

export default CreateFlashcard;