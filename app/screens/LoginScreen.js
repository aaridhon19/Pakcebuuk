import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { Button, View, Text } from "react-native";

const LOGIN_MUTATION = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  async function handleSubmit() {
    try {
      await login({ variables: { email, password } });
      navigation.navigate("Home");
    } catch (err) {
      alert("Invalid Credentials");
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
}
export default LoginScreen;
