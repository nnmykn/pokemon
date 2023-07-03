import React, { useEffect, useState } from "react";
import client from "../../../lib/graphqlClient";
import Link from "next/link";
import { gql } from "@apollo/client";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Heading,
  Text,
  Stack,
  Divider,
  Image,
  Box,
} from "@chakra-ui/react";

interface PokemonListProps {
  first: number;
  name?: string;
}

interface Pokemon {
  id: string;
  name: string;
  image: string;
}

export const PokemonList: React.FC<PokemonListProps> = ({ first, name }) => {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
  const [error, setError] = useState(null);

  let pokemonQuery: any;

  if (name) {
    pokemonQuery = gql(/* GraphQL */ `
    query {
      pokemon(name: "${name}") {
        id
        name
        image
      }
    }
  `);
  } else {
    pokemonQuery = gql(/* GraphQL */ `
    query {
      pokemons(first: ${first}) {
        id
        name
        image
      }
    }
  `);
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
    <ul className="flex flex-wrap items-center justify-center">
      {pokemons &&
        pokemons.map((pokemon) => (
          <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
            {/* <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-6 w-[250px]">
              <Link href={`/pokemon/${pokemon.id}`}>
                <img
                  className="rounded-t-lg"
                  src={pokemon.image}
                  alt={pokemon.name}
                />
              </Link>
              <div className="p-5">
                <Link href={`/pokemon/${pokemon.id}`}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {pokemon.name}
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  これはポケモンです。
                </p>
                <Link
                  href={`/pokemon/${pokemon.id}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  詳細を見る
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div> */}
            <Card maxW="sm" m={4}>
              <CardBody>
                <Image
                  src={pokemon.image}
                  alt={pokemon.name}
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{pokemon.name}</Heading>
                  <Text>これはポケモンです。</Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <Button variant="solid" colorScheme="blue">
                  詳細を見る
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
    </ul>
  );
};
