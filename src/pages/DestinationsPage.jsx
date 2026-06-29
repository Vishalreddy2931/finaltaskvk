import { NavLink, Outlet, useParams } from 'react-router-dom'
import { destinationRegions } from '../data/travelData'

export default function DestinationsPage() {
  const { regionSlug } = useParams()

  return (
    <section className="page">
      <div className="section-heading">
        <p className="eyebrow">Destination explorer</p>
        <h1>Choose a region and dive into the details.</h1>
        <p className="lead">Our nested routes showcase handpicked itineraries for globally inspired getaways.</p>
      </div>

      <div className="cards-grid two-up">
        <aside className="info-card sidebar-card">
          <h2>Regions</h2>
          <div className="stacked-links">
            {destinationRegions.map((region) => (
              <NavLink
                key={region.slug}
                to={`/destinations/${region.slug}`}
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                {region.name}
              </NavLink>
            ))}
          </div>
        </aside>

        <div className="info-card">
          {regionSlug ? (
            <Outlet />
          ) : (
            <div>
              <h2>Start with a region</h2>
              <p>Select any destination above to view a tailored storyboard with highlights, stays, and next-step ideas.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
