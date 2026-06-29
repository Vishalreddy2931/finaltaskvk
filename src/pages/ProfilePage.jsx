import { useMemo, useState } from 'react'
import { useTravel } from '../context/TravelContext'
import { useDestinations } from '../hooks/useDestinations'

export default function ProfilePage() {
  const { savedTrips, addTrip, removeTrip } = useTravel()
  const { destinations, loading, error } = useDestinations(4)
  const [draft, setDraft] = useState({ title: '', note: '' })

  const journeySummary = useMemo(() => {
    return savedTrips.length > 0 ? `${savedTrips.length} ideas ready for your next escape.` : 'No trips saved yet.'
  }, [savedTrips.length])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!draft.title.trim()) return

    addTrip(draft)
    setDraft({ title: '', note: '' })
  }

  return (
    <section className="page">
      <div className="section-heading">
        <p className="eyebrow">Traveler profile</p>
        <h1>Your planning board.</h1>
        <p className="lead">Save inspirations, review global highlights, and organize the next trip that feels right.</p>
      </div>

      <div className="cards-grid two-up">
        <article className="info-card">
          <h2>Saved plans</h2>
          <p>{journeySummary}</p>
          <ul>
            {savedTrips.map((trip) => (
              <li key={trip.id} className="trip-item">
                <div>
                  <strong>{trip.title}</strong>
                  <p>{trip.note}</p>
                </div>
                <button type="button" className="text-link" onClick={() => removeTrip(trip.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </article>

        <article className="info-card">
          <h2>Add a trip idea</h2>
          <form onSubmit={handleSubmit} className="stacked-form">
            <input value={draft.title} placeholder="Trip title" onChange={(event) => setDraft((value) => ({ ...value, title: event.target.value }))} />
            <textarea value={draft.note} placeholder="Notes" onChange={(event) => setDraft((value) => ({ ...value, note: event.target.value }))} />
            <button type="submit" className="btn btn-primary">Save idea</button>
          </form>
        </article>
      </div>

      <div className="section-heading">
        <h2>Live destination highlights</h2>
        <p>These cards are loaded from an API for a real-world data experience.</p>
      </div>

      {loading && <p>Loading destinations...</p>}
      {error && <p className="error">{error}</p>}

      <div className="cards-grid">
        {destinations.map((destination) => (
          <article key={destination.id} className="info-card">
            <h3>{destination.name}</h3>
            <p>{destination.capital}</p>
            <p>{destination.description}</p>
            {destination.flag && <img src={destination.flag} alt={`${destination.name} flag`} className="flag" />}
          </article>
        ))}
      </div>
    </section>
  )
}
