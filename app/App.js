import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigators/StackNavigator";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { SafeAreaView } from "react-native";

function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          <StackNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;
