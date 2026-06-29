import { createContext, useContext, useMemo, useState } from 'react'

const TravelContext = createContext(null)

export function TravelProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [savedTrips, setSavedTrips] = useState([
    { id: 1, title: 'Golden Temple Escape', note: 'Add a sunrise walk to the lakefront.' },
    { id: 2, title: 'Alpine Cabin Reset', note: 'Pack light layers for the mountain trail.' },
  ])

  const toggleTheme = () => setIsDarkMode((value) => !value)

  const addTrip = (trip) => {
    setSavedTrips((items) => [...items, { id: Date.now(), ...trip }])
  }

  const removeTrip = (id) => {
    setSavedTrips((items) => items.filter((item) => item.id !== id))
  }

  const value = useMemo(
    () => ({ isDarkMode, toggleTheme, savedTrips, addTrip, removeTrip }),
    [isDarkMode, savedTrips],
  )

  return <TravelContext.Provider value={value}>{children}</TravelContext.Provider>
}

export function useTravel() {
  const context = useContext(TravelContext)

  if (!context) {
    throw new Error('useTravel must be used inside TravelProvider')
  }

  return context
}
