import React from "react";
import PokemonCard from "./PokemonCard";
import { Card } from "semantic-ui-react";

function PokemonCollection({ pokemonData }) {
  const pokemonElements = pokemonData.map(pokemon=><PokemonCard key={pokemon.id} pokemon={pokemon}/>)

  return (
    <Card.Group itemsPerRow={6}>
      {pokemonElements}
    </Card.Group>
  );
}

export default PokemonCollection;
