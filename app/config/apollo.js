import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

const httpLink = createHttpLink({
  uri: "https://dd7b-139-228-111-126.ngrok-free.app",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync("accessToken");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  uri: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
