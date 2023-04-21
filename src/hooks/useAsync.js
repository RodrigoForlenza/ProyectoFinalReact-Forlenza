import { useState, useEffect } from 'react'

export const useAsync = (asyncFunction, dependencies = []) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    if(!Array.isArray(dependencies)) {
        console.error('No se pasaron correctamente las dependencias')
        dependencies = []
    }

    useEffect(() => {
        setLoading(true)

        asyncFunction()
            .then(data => {
                setData(data)
            })
            .catch(error => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [...dependencies])

    return {
        data,
        error,
        loading
    }
}