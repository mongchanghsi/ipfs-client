import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const localhostLink = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:8080/graphql" }),
]);

const aaveLink = new HttpLink({
  uri: "https://api.thegraph.com/subgraphs/name/aave/aave-v2-polygon-mumbai",
});

const countriesLink = new HttpLink({
  uri: "https://countries.trevorblades.com/",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "aave",
    aaveLink,

    ApolloLink.split(
      (operation) => operation.getContext().clientName === "countries",
      countriesLink,

      ApolloLink.split(
        (operation) => operation.getContext().clientName === "localhost",
        localhostLink
      )
    )
  ),
  resolvers: {},
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
