import React, { useState, useEffect } from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";

function PokemonPage() {
  const [allPokemon, setAllPokemon] = useState([])
  const [search, setSearch] = useState("")

  useEffect(()=>{
    fetch(`http://localhost:3001/pokemon`)
    .then(r=>r.json())
    .then(pokemonData=>setAllPokemon(pokemonData))
  }, [])

  function handleSearch(searchValue){
    setSearch(searchValue)
  }

  function handleAddPokemon(newPokemon){
    setAllPokemon([
      ...allPokemon,
      newPokemon
    ])
  }

  const displayPokemon = !search ? allPokemon : allPokemon.filter(pokemon=>pokemon.name.includes(search.toLowerCase()))

  return (
    <Container>
      <h1>Pokemon Searcher</h1>
      <br />
      <PokemonForm onAddPokemon={handleAddPokemon}/>
      <br />
      <Search search={search} onSearch={handleSearch}/>
      <br />
      <PokemonCollection allPokemon={displayPokemon}/>
    </Container>
  );
}

export default PokemonPage;
