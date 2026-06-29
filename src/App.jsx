import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { TravelProvider, useTravel } from './context/TravelContext'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import DestinationsPage from './pages/DestinationsPage'
import HomePage from './pages/HomePage'
import PackagesPage from './pages/PackagesPage'
import ProfilePage from './pages/ProfilePage'
import RegionDetailPage from './pages/RegionDetailPage'

function AppRoutes() {
  const { isDarkMode } = useTravel()

  return (
    <div className={`app-shell ${isDarkMode ? 'dark-theme' : ''}`}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/destinations" element={<DestinationsPage />}>
            <Route path=":regionSlug" element={<RegionDetailPage />} />
          </Route>
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <TravelProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TravelProvider>
  )
}

export default App
