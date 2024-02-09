import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import AuthScreen from "./screens/AuthScreen";

const Bottomtab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Bottomtab.Navigator>
        <Bottomtab.Screen name="Home" component={HomeScreen} />
        <Bottomtab.Screen name="Cart" component={CartScreen} />
        <Bottomtab.Screen name="Favorites" component={FavoritesScreen} />
        <Bottomtab.Screen name="Auth" component={AuthScreen} />
      </Bottomtab.Navigator>
    </NavigationContainer>
  );
};

export default App;
