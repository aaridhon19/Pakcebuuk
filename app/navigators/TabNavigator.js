import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MarketScreen from "../screens/MarketScreen";
import NotificationScreen from "../screens/NotificationScreen";
import MenuScreen from "../screens/MenuScreen";
import { Button } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { useState } from "react";

function TabNavigator() {
  const [showOptions, setShowOptions] = useState(false);

  const handlePlus = () => {
    setShowOptions(!showOptions);
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#282828",
        },
        headerTitle: "",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerRight: () => (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#808080",
                padding: 4,
                borderRadius: 15,
                marginHorizontal: 6,
              }}
              onPress={handlePlus}
            >
              <MaterialCommunityIcons name="plus" color={"#FFF"} size={23} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#808080",
                padding: 4,
                borderRadius: 15,
                marginEnd: 6,
              }}
            >
              <MaterialCommunityIcons name="magnify" color={"#FFF"} size={23} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#808080",
                padding: 4,
                borderRadius: 15,
                marginEnd: 8,
              }}
            >
              <MaterialCommunityIcons
                name="facebook-messenger"
                color={"#FFF"}
                size={23}
              />
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () => (
          <Text
            style={{
              color: "#FFF",
              fontWeight: "bold",
              fontSize: 20,
              fontFamily: "",
              marginStart: 12,
            }}
          >
            pakcebukk
          </Text>
        ),
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-variant"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MarketPlace"
        component={MarketScreen}
        options={{
          title: "Marketplace",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="bell-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          title: "Menu",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
