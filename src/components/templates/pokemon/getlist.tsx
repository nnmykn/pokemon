import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import client from "../../../lib/graphqlClient";
import Link from "next/link";

interface PokemonListProps {
  first: number;
  name?: string;
}

interface Pokemon {
  id: string;
  name: string;
}

export const PokemonList: React.FC<PokemonListProps> = ({ first, name }) => {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
  const [error, setError] = useState(null);

  let pokemonQuery;

  if (name) {
    pokemonQuery = gql`
    query {
      pokemon(name: "${name}") {
        id
        name
      }
    }
  `;
  } else {
    pokemonQuery = gql`
    query {
      pokemons(first: ${first}) {
        id
        name
      }
    }
  `;
  }

  useEffect(() => {
    client
      .query({ query: pokemonQuery })
      .then((response) => {
        if (name) {
          setPokemons([response.data.pokemon]);
        } else {
          setPokemons(response.data.pokemons);
        }
      })
      .catch((err) => {
        setError(err.toString());
      });
  }, [first, name, pokemonQuery]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {pokemons &&
        pokemons.map((pokemon) => (
          <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
            <li>{pokemon.name}</li>
          </Link>
        ))}
    </ul>
  );
};
