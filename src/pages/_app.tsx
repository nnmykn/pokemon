import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import Header from "@/components/Header";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: `https://graphql-pokemon2.vercel.app/`,
  cache,
});

// ポケモンのブランドカラーを定義
const colors = {
  pokemonYellow: "#FFCB05",
  pokemonRed: "#FF0000",
  pokemonBlue: "#0055FF",
  pokemonGreen: "#00AA00",
  pokemonBlack: "#000000",
  pokemonWhite: "#FFFFFF",
};

const theme = extendTheme({ colors });

export default function App({ Component, pageProps }: AppProps) {
  return (
    // ChakraProviderでChakra UIのコンポーネントを利用可能にする
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Header />
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  );
}
