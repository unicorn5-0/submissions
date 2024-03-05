import { useState } from "react"

export const useCountry = (type) => {
    const { value, setValue } = useState('')

    const onChange = (e) => {
        setValue(e.target.value)
    }
    
    return {
        type,
        value,
        onChange
    }
}