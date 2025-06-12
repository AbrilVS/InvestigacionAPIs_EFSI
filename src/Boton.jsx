import React from 'react'
import axios from 'axios'
import './Boton.css'
import { useState, useEffect } from 'react';

const pokemons = ["pikachu", "bulbasaur", "charmander", "squirtle"];

export const Boton = () => {
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
        // eslint-disable-next-line
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
            <form onSubmit={buscarPokemon} className="poke-form">
                <input
                    type="text"
                    value={search}
                    onChange={handleInput}
                    placeholder="Escribe un Pokémon"
                    className="poke-input"
                />
                <button type="submit" className="poke-btn buscar">Buscar</button>
            </form>
            <button onClick={cambiarPokemon} className="poke-btn cambiar">Cambiar Pokémon</button>
            {error && <p className="poke-error">{error}</p>}
            {loading && <p>Cargando...</p>}
            {pokemon && !loading && (
                <div className="poke-card">
                    <h1 className="poke-title">{pokemon.name}</h1>
                    <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="poke-img"
                    />
                    <p>Altura: <strong>{pokemon.height / 10} m</strong></p>
                    <div className="poke-abilities">
                        <h3>Habilidades:</h3>
                        <ul>
                            {pokemon.abilities.map((ab) => (
                                <li key={ab.ability.name}>
                                    {ab.ability.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}