import React, { useEffect, useState } from "react";
import { PokemonList } from "@/components/templates/pokemon/getlist";

export default function Home() {
  return (
    <>
      <div>
        <PokemonList first={10} />
      </div>
    </>
  );
}
