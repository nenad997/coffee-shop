import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
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

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const AuthenticatedNavigation = () => {
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
          headerStyle: {
            backgroundColor: Colors.inputBg,
          },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
};

const AppRoot = () => {
  return (
    <NavigationContainer>
      <AuthenticatedNavigation />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppRoot />
    </Provider>
  );
};

export default App;
