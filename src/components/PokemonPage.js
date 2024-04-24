import React, { useEffect, useState } from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";

function PokemonPage() {
  const [pokemons, setPokemons] = useState([])
  const [searchValue, setSearchValue] = useState("")

  useEffect(()=>{
    fetch("http://localhost:3001/pokemon")
    .then(r=>r.json())
    .then(pokemonData=>setPokemons(pokemonData))
  }, [])

  function handleSearch(searchInput){
    setSearchValue(searchInput)
  }

  function handleAddNewPokemon(newPokemon){
    setPokemons([
      ...pokemons,
      newPokemon
    ])
  }

  return (
    <Container>
      <h1>Pokemon Searcher</h1>
      <br />
      <PokemonForm onSubmitNewPokemon={handleAddNewPokemon}/>
      <br />
      <Search searchValue={searchValue} onSearch={handleSearch}/>
      <br />
      <PokemonCollection pokemons={searchValue ? pokemons.filter(pokemon=>pokemon.name.includes(searchValue)) : pokemons }/>
    </Container>
  );
}

export default PokemonPage;
