import { Button, SafeAreaView, Text, View } from "react-native";
import {GET_POSTS_BY_ID} from "../queries/postById" 
import { useQuery } from "@apollo/client";

function DetailScreen({ navigation, route }) {
  const { id } = route.params;

  const { data, loading, error } = useQuery(GET_POSTS_BY_ID, {
    variables: {id},
    notifyOnNetworkStatusChange: true,
  });

  // console.log({ data, loading, error });
  // console.log(data.post);;

  return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Detail Screen</Text>
          <View>
            <Text>Title: {data?.post.content}</Text>
            <Text>Content: {data?.post.content}</Text>
          </View>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
  );
}

export default DetailScreen;
