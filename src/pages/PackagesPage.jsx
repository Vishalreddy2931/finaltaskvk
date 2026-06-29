import { useMemo, useState } from 'react'
import { travelPackages } from '../data/travelData'

export default function PackagesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredPackages = useMemo(() => {
    if (selectedCategory === 'all') return travelPackages

    return travelPackages.filter((pkg) => pkg.category === selectedCategory)
  }, [selectedCategory])

  return (
    <section className="page">
      <div className="section-heading">
        <p className="eyebrow">Travel packages</p>
        <h1>Pick a package that matches your pace.</h1>
        <p className="lead">Use the filters below to explore family-friendly, luxury, and adventure-ready planning options.</p>
      </div>

      <div className="filter-row">
        <button type="button" className={selectedCategory === 'all' ? 'pill active' : 'pill'} onClick={() => setSelectedCategory('all')}>
          All packages
        </button>
        <button type="button" className={selectedCategory === 'family' ? 'pill active' : 'pill'} onClick={() => setSelectedCategory('family')}>
          Family
        </button>
        <button type="button" className={selectedCategory === 'luxury' ? 'pill active' : 'pill'} onClick={() => setSelectedCategory('luxury')}>
          Luxury
        </button>
        <button type="button" className={selectedCategory === 'adventure' ? 'pill active' : 'pill'} onClick={() => setSelectedCategory('adventure')}>
          Adventure
        </button>
      </div>

      <div className="cards-grid">
        {filteredPackages.map((pkg) => (
          <article key={pkg.id} className="info-card package-card">
            <p className="eyebrow">{pkg.category}</p>
            <h3>{pkg.name}</h3>
            <p>{pkg.description}</p>
            <strong>{pkg.price}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}
