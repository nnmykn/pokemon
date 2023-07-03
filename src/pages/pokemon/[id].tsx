import React from "react";
import { useRouter } from "next/router";
import { PokemonDetail } from "@/components/templates/pokemon/getdetail";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div>
        <PokemonDetail id={router.query.id} />
      </div>
    </>
  );
}
