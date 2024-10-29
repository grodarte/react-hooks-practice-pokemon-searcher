import React, { useState } from "react";
import { Form } from "semantic-ui-react";

const blankPokemon = {
  name: "",
  hp: "",
  sprites: {
    front: "",
    back: ""
  }
}

function PokemonForm({ onSubmitNewPokemon }) {
  const [newPokemonData, setNewPokemonData] = useState(blankPokemon)

  function handleChange(e){
    let name = e.target.name
    let value = e.target.value

    if(name.includes("Url")){
      setNewPokemonData({
        ...newPokemonData,
        ["sprites"]: {
          ...newPokemonData.sprites,
          [name.replace("Url", "")]: value
        }
      })
    } else {
      setNewPokemonData({
        ...newPokemonData,
        [name]: value
      })
    }
  }

  function handleSubmit(e){
    e.preventDefault()
    fetch(`http://localhost:3001/pokemon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPokemonData)
    })
    .then(r=>r.json())
    .then(newPokemon=>onSubmitNewPokemon(newPokemon))
    setNewPokemonData(blankPokemon)
  }

  return (
    <div>
      <h3>Add a Pokemon!</h3>
      <Form
        onSubmit={handleSubmit}
      >
        <Form.Group widths="equal">
          <Form.Input fluid label="Name" placeholder="Name" name="name" value={newPokemonData.name} onChange={handleChange}/>
          <Form.Input fluid label="hp" placeholder="hp" name="hp" value={newPokemonData.hp} onChange={handleChange}/>
          <Form.Input
            fluid
            label="Front Image URL"
            placeholder="url"
            name="frontUrl"
            value={newPokemonData.sprites.front}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            label="Back Image URL"
            placeholder="url"
            name="backUrl"
            value={newPokemonData.sprites.back}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default PokemonForm;
