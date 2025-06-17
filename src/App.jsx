import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './Nav.css';
import './Card.css';
import Nav from './Nav';
import Card from './Card';

const pokemons = ["pikachu", "bulbasaur", "charmander", "squirtle"];

function App() {
  const [current, setCurrent] = useState(0);
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPokemon = (name) => {
    setPokemon(null);
    setError("");
    setLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then(response => setPokemon(response.data))
      .catch(() => setError("No se encontró el Pokémon"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPokemon(pokemons[current]);
  }, [current]);

  const cambiarPokemon = () => {
    setCurrent((prev) => (prev + 1) % pokemons.length);
    setSearch("");
    setError("");
  };

  const handleInput = (e) => setSearch(e.target.value);

  const buscarPokemon = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      fetchPokemon(search.trim());
    }
  };

  return (
    <div className="poke-container">
      <Nav
        search={search}
        handleInput={handleInput}
        buscarPokemon={buscarPokemon}
        cambiarPokemon={cambiarPokemon}
      />
      {error && <p className="poke-error">{error}</p>}
      {loading && <p>Cargando...</p>}
      {pokemon && !loading && <Card pokemon={pokemon} />}
    </div>
  );
}

export default App;