import React, { useState, useEffect } from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";

const API = `http://localhost:3001/pokemon`

function PokemonPage() {
  const [allPokemon, setAllPokemon] = useState([])
  const [search, setSearch] = useState("")
  const displayPokemon = allPokemon.filter(pokemon=>pokemon.name.includes(search))

  function handleSearch(searchBy){
    setSearch(searchBy)
  }

  function handleSubmitNewPokemon(newPokemon){
    setAllPokemon([
      ...allPokemon,
      newPokemon
    ])
  }

  useEffect(()=>{
    fetch(API)
    .then(r=>r.json())
    .then(pokemonData=>setAllPokemon(pokemonData))
  }, [])

  return (
    <Container>
      <h1>Pokemon Searcher</h1>
      <br />
      <PokemonForm onSubmitNewPokemon={handleSubmitNewPokemon}/>
      <br />
      <Search onSearch={handleSearch} search={search}/>
      <br />
      <PokemonCollection pokemonData={displayPokemon}/>
    </Container>
  );
}

export default PokemonPage;
