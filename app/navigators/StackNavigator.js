import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import TabNavigator from "./TabNavigator";
import DetailScreen from "../screens/DetailScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { useState } from "react";
const Stack = createNativeStackNavigator();
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";
import AuthContext from "../context/auth";
import PostScreen from "../screens/PostScreen";
import SearchScreen from "../screens/SearchScreen";
import FollowScreen from "../screens/FollowScreen";

function StackNavigator() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  (async () => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    if (accessToken) {
      setIsSignedIn(true);
    }
  })();

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <Stack.Navigator>
        {!isSignedIn ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Post"
              component={PostScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
            name="Follow"
            component={FollowScreen}
            options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}

export default StackNavigator;
