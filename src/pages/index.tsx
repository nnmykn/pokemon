import React, { useEffect, useState } from "react";
import { PokemonList } from "@/components/templates/pokemon/getlist";

export default function Home() {
  const [first, setFirst] = useState(10);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  return (
    <>
      <div>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <button onClick={() => setSearch(name)}>検索</button>
        <PokemonList first={first} name={search} />
        <button onClick={() => setFirst(first + 10)}>もっとみる</button>
      </div>
    </>
  );
}
