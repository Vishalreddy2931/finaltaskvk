import { useEffect, useState } from 'react'

export function useDestinations(limit = 6) {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const controller = new AbortController()

    fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags', {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load travel destinations right now.')
        }

        return response.json()
      })
      .then((data) => {
        if (!isMounted) return

        const mapped = data.slice(0, limit).map((country, index) => ({
          id: `${country.name.common}-${index}`,
          name: country.name.common,
          capital: country.capital?.[0] || 'Coastal hub',
          flag: country.flags?.png || '',
          description: `${country.name.common} offers mix of culture, cuisine, and striking landscapes.`,
        }))

        setDestinations(mapped)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        if (isMounted) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [limit])

  return { destinations, loading, error }
}
