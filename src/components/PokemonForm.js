import React, { useState } from "react";
import { Form } from "semantic-ui-react";

const blankForm = {
  name: "",
  image: "",
  hp: "",
  sprites: {
    front: "",
    back: ""
  }
}

function PokemonForm({ onAddPokemon }) {
  const [form, setForm] = useState(blankForm)

  function handleChange(e){
    const name = e.target.name
    const value = e.target.value

    if(name.includes("Url")){
      setForm({
        ...form,
        sprites: {
          ...form.sprites,
          [name.replace("Url", "")]: value
        }
      })
    } else {
      setForm({
        ...form,
        [name]: value
      })
    }
  }

  function handleSubmit(e){
    e.preventDefault()

    fetch(`http://localhost:3001/pokemon`, {
      method: "POST",
      headers: {
        "Content-Type":"Application/JSON"
      },
      body: JSON.stringify(form)
    })
    .then(r=>r.json())
    .then(newPokemon=>{
      onAddPokemon(newPokemon)
      setForm(blankForm)
    })
  }

  return (
    <div>
      <h3>Add a Pokemon!</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input fluid label="Name" placeholder="Name" name="name" value={form.name} onChange={handleChange}/>
          <Form.Input fluid label="hp" placeholder="hp" name="hp" value={form.hp} onChange={handleChange}/>
          <Form.Input
            fluid
            label="Front Image URL"
            placeholder="url"
            name="frontUrl"
            value={form.sprites.front}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            label="Back Image URL"
            placeholder="url"
            name="backUrl"
            value={form.sprites.back}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default PokemonForm;
