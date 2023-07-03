import React from "react";
import { gql } from "../../../generated/gql";
import { useQuery } from "@apollo/client";
import Link from "next/link";
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

export const PokemonList: React.FC<PokemonListProps> = ({ first, name }) => {
  let POKEMON_QUERY: any;

  if (name) {
    POKEMON_QUERY = gql(/* GraphQL */ `
      query PokemonByName($name: String!) {
        pokemon(name: $name) {
          id
          name
          image
        }
      }
    `);
  } else {
    POKEMON_QUERY = gql(/* GraphQL */ `
      query Pokemons($first: Int!) {
        pokemons(first: $first) {
          id
          name
          image
        }
      }
    `);
  }

  const { loading, error, data } = useQuery(POKEMON_QUERY, {
    variables: { first, name },
  });
  if (loading) return <p>ロード中...</p>;
  if (error) return <p>エラーが発生</p>;

  if (!data) return <p>データがないよ</p>;
  const pokemons = data.pokemons || [data.pokemon];

  return (
    <ul className="flex flex-wrap items-center justify-center">
      {pokemons &&
        pokemons.map((pokemon: any) => (
          <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
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
