import React, { useEffect, useState } from "react";
import { PokemonList } from "@/components/templates/pokemon/getlist";

export default function Home() {
  const [first, setFirst] = useState(10);
  return (
    <>
      <div>
        <PokemonList first={first} />
        <button onClick={() => setFirst(first + 10)}>もっとみる</button>
      </div>
    </>
  );
}
