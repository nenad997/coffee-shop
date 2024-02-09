import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import CartScreen from "./src/screens/CartScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import CoffeeDetailsScreen from "./src/screens/CoffeeDetails";
import AuthScreen from "./src/screens/AuthScreen";
import Icon from "./src/components/ui/Icon";

const Stack = createNativeStackNavigator();
const Bottomtab = createBottomTabNavigator();

const BottomtabNavigation = () => {
  return (
    <Bottomtab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Bottomtab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="home" isFocused={focused} />,
        }}
      />
      <Bottomtab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="cart" isFocused={focused} />,
        }}
      />
      <Bottomtab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="favorite" isFocused={focused} />
          ),
        }}
      />
      <Bottomtab.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="auth" isFocused={focused} />,
        }}
      />
    </Bottomtab.Navigator>
  );
};

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabs">
      <Stack.Screen
        name="BottomTabs"
        component={BottomtabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CoffeeDetails"
        component={CoffeeDetailsScreen}
        options={{
          title: "Loading...",
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
