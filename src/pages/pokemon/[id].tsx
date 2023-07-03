import React from "react";
import { useRouter } from "next/router";
import { PokemonDetail } from "@/components/templates/pokemon/getdetail";

export default function Detail() {
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;
  if (typeof id === "string") {
    return (
      <>
        <div>
          <PokemonDetail id={id} />
        </div>
      </>
    );
  }

  return <div>Error: IDが無効です!</div>;
}
