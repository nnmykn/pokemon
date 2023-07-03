import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import client from "../../../lib/graphqlClient";

interface PokemonDetailProps {
  id: string;
}

export const PokemonDetail: React.FC<PokemonDetailProps> = ({ id }) => {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(null);

  const pokemonQuery = gql`
    query {
      pokemon(id: "${id}") {
        id
        number
        name
        image
      }
    }
  `;

  useEffect(() => {
    client
      .query({ query: pokemonQuery })
      .then((response) => {
        setPokemon(response.data.pokemon);
      })
      .catch((err) => {
        setError(err.toString());
      });
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        {pokemon && (
          <ul>
            <img src={pokemon.image} alt={pokemon.name} />
            <h1 key={pokemon.id}>{pokemon.name}</h1>
            <li>{pokemon.number}</li>
          </ul>
        )}
      </div>
    </>
  );
};
