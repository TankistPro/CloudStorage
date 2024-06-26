import React from 'react'

export const useDebounce = (value: any, delay: number) => {
    const [debounceValue, setDebounceValue] = React.useState(value);

    React.useEffect(() => {
        const timerId = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => {
            clearTimeout(timerId)
        }
    }, [value])

    return debounceValue
}
