import React from "react";
import { gql } from "../../../generated/gql";
import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { Flex, Heading, Center } from "@chakra-ui/react";

interface PokemonDetailProps {
  id: string;
}

interface Pokemon {
  id: string;
  number: string;
  name: string;
  image: string;
  weight: string;
  height: string;
  classification: string;
  maxHP: number;
  maxCP: number;
  types: string[];
}

interface PokemonQueryResult {
  pokemon: Pokemon;
}

const POKEMON_QUERY = gql(/* GraphQL */ `
  query getPokemon($id: String!) {
    pokemon(id: $id) {
      id
      number
      name
      image
      weight {
        maximum
        minimum
      }
      height {
        maximum
        minimum
      }
      classification
      maxHP
      maxCP
      types
    }
  }
`);

export const PokemonDetail: React.FC<PokemonDetailProps> = ({ id }) => {
  const { loading, error, data } = useQuery<PokemonQueryResult>(
    POKEMON_QUERY as DocumentNode,
    {
      variables: { id },
    }
  );
  if (loading) return <p>ロード中...</p>;
  if (error) return <p>エラーが発生</p>;

  if (!data) return <p>データがないよ</p>;
  const pokemon = data.pokemon;

  return (
    <>
      <div>
        <Center>
          <Flex alignItems={"center"}>
            <img src={pokemon.image} alt={pokemon.name} />
            <Heading>{pokemon.name}</Heading>
          </Flex>
        </Center>
        <ul>
          <li>No.{pokemon.number}</li>
          <li>分類: {pokemon.classification}</li>
          <li>タイプ: {pokemon.types}</li>
          <li>最大HP: {pokemon.maxHP}</li>
          <li>最大CP: {pokemon.maxCP}</li>
        </ul>
      </div>
    </>
  );
};
