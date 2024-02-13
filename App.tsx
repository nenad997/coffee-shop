import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import CartScreen from "./src/screens/CartScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import CoffeeDetailsScreen from "./src/screens/CoffeeDetails";
import ProfileScreen from "./src/screens/ProfileScreen";
import Icon from "./src/components/ui/Icon";
import store from "./src/store/index";
import { Colors } from "./src/constants/colors";

const Stack = createNativeStackNavigator();
const Bottomtab = createBottomTabNavigator();

const BottomtabNavigation = () => {
  return (
    <Bottomtab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveBackgroundColor: Colors.tabBg,
        tabBarInactiveBackgroundColor: Colors.tabBg,
        tabBarHideOnKeyboard: true,
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
        name="Profile"
        component={ProfileScreen}
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
          headerRight: () => (
            <Icon
              name="star"
              tintColor={Colors.orangePrimary}
              width={25}
              height={25}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
