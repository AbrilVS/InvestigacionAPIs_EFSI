import React from 'react';


function Card({ pokemon }) {
  return (
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
  );
}

export default Card;