import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import {
  Button,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { GET_POSTS } from "../queries/post";
import Card from "../components/Card";

function HomeScreen() {
  const { data, loading, error, refetch } = useQuery(GET_POSTS, {
    notifyOnNetworkStatusChange: true,
  });

  console.log({ data, loading, error });
  // console.log( data.posts , "Ini data post");

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {data?.posts.map((post, index) => {
            return <Card key={index} post={post} 
            />;
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   {/* <Text>Home Screen</Text> */}

    //   {/* <Button
    //     // title="Go to detail"
    //     // onPress={() => navigation.navigate("Detail", { id: 1 })}
    //   /> */}
    // </View>
  );
}

export default HomeScreen;
