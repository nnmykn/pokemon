import React, { useState } from "react";
import { PokemonList } from "@/components/templates/pokemon/getlist";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";

export default function Home() {
  const [first, setFirst] = useState(25);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  return (
    <>
      <div>
        <Input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="名前を入力"
        />
        <Button onClick={() => setSearch(name)}>検索</Button>
        <PokemonList first={first} name={search} />
        <Center>
          <Button onClick={() => setFirst(first + 25)}>もっとみる</Button>
        </Center>
      </div>
    </>
  );
}
