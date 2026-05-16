import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchCharacters()
  }, [])

  const fetchCharacters = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character')
      const data = await response.json()
      setCharacters(data.results)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  const filteredCharacters = characters.filter(char => 
    char.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container">
      <header>
        <h1>Rick & Morty Universe</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Explore the multiverse and its strange inhabitants
        </p>
      </header>

      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search characters (e.g. Rick, Morty, Summer...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading">Warping through dimensions...</div>
      ) : (
        <div className="character-grid">
          {filteredCharacters.map((char) => (
            <div key={char.id} className="card">
              <img src={char.image} alt={char.name} className="card-image" />
              <div className="card-content">
                <h3 className="card-name">{char.name}</h3>
                <div className="card-info">
                  <div className="status">
                    <span className={`status-dot status-${char.status.toLowerCase()}`}></span>
                    {char.status} - {char.species}
                  </div>
                  <p>Last known location:</p>
                  <span style={{ color: 'white' }}>{char.location.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {filteredCharacters.length === 0 && !loading && (
        <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)' }}>
          No inhabitants found in this dimension.
        </div>
      )}
    </div>
  )
}

export default App
