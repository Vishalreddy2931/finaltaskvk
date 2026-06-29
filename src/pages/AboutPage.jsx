import { useMemo, useState } from 'react'

const highlights = [
  'Curated itineraries for solo travelers, couples, and families.',
  'Hands-on concierge support before and during your trip.',
  'Micro-planning tools that keep every detail easy to manage.',
]

export default function AboutPage() {
  const [showStory, setShowStory] = useState(true)
  const stats = useMemo(
    () => [
      { label: 'Years shaping travel', value: '12+' },
      { label: 'Local partners', value: '85' },
      { label: 'Carefully planned routes', value: '300+' },
    ],
    [],
  )

  return (
    <section className="page">
      <div className="section-heading">
        <p className="eyebrow">About our studio</p>
        <h1>Thoughtful planning for unforgettable travel.</h1>
        <p className="lead">
          We blend practical logistics with inspiring local knowledge so every trip feels both effortless and personal.
        </p>
      </div>

      <div className="cards-grid two-up">
        <article className="info-card">
          <h2>What sets us apart</h2>
          <ul>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="info-card">
          <h2>Our approach</h2>
          <p>
            We learn how you travel, then shape a route that keeps downtime, adventure, and wellness in balance.
          </p>
          <button type="button" className="btn btn-secondary" onClick={() => setShowStory((value) => !value)}>
            {showStory ? 'Hide story' : 'Show story'}
          </button>
          {showStory && (
            <p className="muted">
              What began as weekend city guides became a studio known for calm, detail-rich vacation planning.
            </p>
          )}
        </article>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
