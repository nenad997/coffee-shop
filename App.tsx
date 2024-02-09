import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import CoffeeDetailsScreen from "./screens/CoffeeDetails";
import AuthScreen from "./screens/AuthScreen";

const Stack = createNativeStackNavigator();
const Bottomtab = createBottomTabNavigator();

const BottomtabNavigation = () => {
  return (
    <Bottomtab.Navigator>
      <Bottomtab.Screen name="Home" component={HomeScreen} />
      <Bottomtab.Screen name="Cart" component={CartScreen} />
      <Bottomtab.Screen name="Favorites" component={FavoritesScreen} />
      <Bottomtab.Screen name="Auth" component={AuthScreen} />
    </Bottomtab.Navigator>
  );
};

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabs"
        component={BottomtabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="CoffeeDetails" component={CoffeeDetailsScreen} options={{
        title: "Loading..."
      }} />
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
