import React, { useState } from "react";
import { Card } from "semantic-ui-react";

function PokemonCard({ pokemon }) {
  const [showFront, setShowFront] = useState(true)
  const {id, name, hp, sprites} = pokemon

  return (
    <Card onClick={()=>setShowFront(showFront=>!showFront)}>
      <div>
        <div className="image">
          <img src={showFront ? sprites.front : sprites.back} alt={name} />
        </div>
        <div className="content">
          <div className="header">{name}</div>
        </div>
        <div className="extra content">
          <span>
            <i className="icon heartbeat red" />
            {hp} hp
          </span>
        </div>
      </div>
    </Card>
  );
}

export default PokemonCard;
