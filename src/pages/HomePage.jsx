import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { destinationRegions, travelerStats } from '../data/travelData'

export default function HomePage() {
  const ctaRef = useRef(null)

  useEffect(() => {
    ctaRef.current?.focus()
  }, [])

  return (
    <section className="page home-page">
      <div className="hero-card">
        <div>
          <p className="eyebrow">Personalized travel planning</p>
          <h1>Design your dream escape with calm clarity.</h1>
          <p className="lead">
            Explore thoughtful itineraries, curated stays, and inspired routes built for every kind of traveler.
          </p>
          <div className="hero-actions">
            <Link to="/packages" ref={ctaRef} className="btn btn-primary">
              Explore packages
            </Link>
            <Link to="/destinations" className="btn btn-secondary">
              Browse regions
            </Link>
          </div>
        </div>
        <div className="hero-panel">
          <h3>Why travelers love us</h3>
          <ul>
            <li>Flexible plans with local insight</li>
            <li>Fast response from dedicated advisors</li>
            <li>Seamless booking support from start to finish</li>
          </ul>
        </div>
      </div>

      <div className="stats-grid">
        {travelerStats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>

      <div className="section-heading">
        <h2>Popular destinations</h2>
        <p>Choose a region to see what makes each place special.</p>
      </div>

      <div className="cards-grid">
        {destinationRegions.map((region) => (
          <article key={region.slug} className="info-card">
            <h3>{region.name}</h3>
            <p>{region.title}</p>
            <p>{region.blurb}</p>
            <ul>
              {region.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link to={`/destinations/${region.slug}`}>View itinerary →</Link>
          </article>
        ))}
      </div>
    </section>
  )
}
