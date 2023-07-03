import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import client from "../../../lib/graphqlClient";

interface PokemonDetailProps {
  id: string;
}

interface Pokemon {
  id: string;
  number: string;
  name: string;
  image: string;
}

export const PokemonDetail: React.FC<PokemonDetailProps> = ({ id }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pokemonQuery = gql`
    query getPokemon($id: String!) {
      pokemon(id: $id) {
        id
        number
        name
        image
      }
    }
  `;

  useEffect(() => {
    client
      .query({ query: pokemonQuery, variables: { id } })
      .then((response) => {
        setPokemon(response.data.pokemon);
      })
      .catch((err) => {
        setError(err.toString());
      });
  }, [id, pokemonQuery]);

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
