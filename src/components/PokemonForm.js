import React, { useState } from "react";
import { Form } from "semantic-ui-react";

function PokemonForm( { onSubmitNewPokemon } ) {
  const [sprites, setSprites] = useState({
    front: "",
    back: ""
  })
  const [formData, setFormData] = useState({
    name: "",
    hp: "",
  })
  

  function handleChange(e){
    const name = e.target.name
    const value = e.target.value

    if(name === "front" || name === "back"){
      setSprites({
        ...sprites,
        [name]: value
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  function handleSubmit(e){
    e.preventDefault()
    fetch("http://localhost:3001/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...formData,
        sprites
      })
    })
    .then(r=>r.json())
    .then(newPokemon=>onSubmitNewPokemon(newPokemon))
  }

  return (
    <div>
      <h3>Add a Pokemon!</h3>
      <Form
        onChange={handleChange}
        onSubmit={(e)=>{
          handleSubmit(e)
          e.target.reset()
        }}
      >
        <Form.Group widths="equal">
          <Form.Input fluid label="Name" placeholder="Name" name="name" />
          <Form.Input fluid label="hp" placeholder="hp" name="hp" />
          <Form.Input
            fluid
            label="Front Image URL"
            placeholder="url"
            name="front"
          />
          <Form.Input
            fluid
            label="Back Image URL"
            placeholder="url"
            name="back"
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default PokemonForm;
