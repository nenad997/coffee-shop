import React, { useEffect, useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RNSecureStorage from "rn-secure-storage";

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
import { authSliceActions } from "./src/store/slices/auth-slice";

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
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
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
  const [expTime, setExpTime] = useState<number | null>(3600000);
  const dispatch = useDispatch();
  const authToken = useSelector((state: any) => state.auth.authToken);

  useEffect(() => {
    RNSecureStorage.getItem("authToken")
      .then(token => {
        if (token) {
          dispatch(authSliceActions.authenticate(token));
        }
      })
      .catch(error => {});
  }, [dispatch]);

  useEffect(() => {
    RNSecureStorage.getItem("expirationTime")
      .then(res => {
        const expirationTime = +res!;
        console.log(expirationTime);
        console.log(typeof expirationTime);
        setExpTime(expirationTime);
      })
      .catch(error => {});
  }, [setExpTime]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(authSliceActions.logout());
    }, expTime!);

    return () => clearTimeout(timer);
  }, [dispatch, expTime]);

  return (
    <NavigationContainer>
      {authToken && <AuthenticatedNavigation />}
      {!authToken && <AuthNavigation />}
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
