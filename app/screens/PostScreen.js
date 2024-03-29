import { gql, useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { RefreshControl } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";
import Card from "../components/Card";

const GET_POSTS = gql``;

function PostScreen() {
  const { data, loading, error } = useQuery(GET_POSTS, {
    notifyOnNetworkStatusChange: true,
  });

  const [refresh, setRefresh] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefresh(true);
    await query.refetch();
    setRefresh(false);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        >
          {data?.posts.map((post, idx) => (
            <Card key={idx} post={post} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default PostScreen;
