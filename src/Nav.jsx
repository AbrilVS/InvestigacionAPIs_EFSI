import React from 'react';


function Nav({ search, handleInput, buscarPokemon, cambiarPokemon }) {
  return (
    <>
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
      <button onClick={cambiarPokemon} className="poke-btn cambiar">
        Cambiar Pokémon
      </button>
    </>
  );
}

export default Nav;