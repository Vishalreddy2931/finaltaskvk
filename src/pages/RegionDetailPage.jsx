import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { destinationRegions } from '../data/travelData'

export default function RegionDetailPage() {
  const { regionSlug } = useParams()

  const region = useMemo(
    () => destinationRegions.find((item) => item.slug === regionSlug),
    [regionSlug],
  )

  if (!region) {
    return <p>That destination is not available yet.</p>
  }

  return (
    <div>
      <p className="eyebrow">{region.accent}</p>
      <h2>{region.name}</h2>
      <p>{region.title}</p>
      <p>{region.blurb}</p>
      <ul>
        {region.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="muted">Best for travelers who want culture, scenery, and slow afternoons in one itinerary.</p>
    </div>
  )
}
