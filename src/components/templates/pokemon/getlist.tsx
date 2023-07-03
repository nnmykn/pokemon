import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import client from "../../../lib/graphqlClient";
import Link from "next/link";

interface PokemonListProps {
  first: number;
}

export const PokemonList: React.FC<PokemonListProps> = ({ first }) => {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);

  const pokemonQuery = gql`
    query {
      pokemons(first: ${first}) {
        id
        name
      }
    }
  `;

  useEffect(() => {
    client
      .query({ query: pokemonQuery })
      .then((response) => {
        setPokemons(response.data.pokemons);
      })
      .catch((err) => {
        setError(err.toString());
      });
  }, [first]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {pokemons.map((pokemon) => (
        <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
          <li>{pokemon.name}</li>
        </Link>
      ))}
    </ul>
  );
};
