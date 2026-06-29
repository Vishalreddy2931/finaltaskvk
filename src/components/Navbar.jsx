import { NavLink } from 'react-router-dom'
import { useTravel } from '../context/TravelContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/packages', label: 'Packages' },
  { to: '/contact', label: 'Contact' },
  { to: '/profile', label: 'Profile' },
]

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTravel()

  return (
    <header className={`topbar ${isDarkMode ? 'dark' : ''}`}>
      <NavLink to="/" className="brand">
        <span className="brand-mark">✦</span>
        <span>Voyage Studio</span>
      </NavLink>

      <nav className="nav-links" aria-label="Main navigation">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.to === '/'}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button type="button" className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  )
}
