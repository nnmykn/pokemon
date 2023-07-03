import Link from "next/link";

export default function Header() {
  return (
    <>
      <header>
        <Link href="/">
          <img src="https://zukan.pokemon.co.jp/img/logo.svg" alt="logo" />
        </Link>
      </header>
    </>
  );
}
