import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Input from "./Input";
import Button from "../ui/Button";

const AuthForm: FC<{
  isLogin: boolean;
}> = ({ isLogin }) => {
  const navigation = useNavigation<any>();

  const switchModeHandler = () => {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  };

  const authenticateHandler = () => {};

  return (
    <View style={styles.form}>
      <Input
        label="Email"
        config={{
          placeholder: "Email address",
        }}
      />
      <Input
        label="Password"
        config={{
          placeholder: "Password",
          secureTextEntry: true,
        }}
      />
      {!isLogin && (
        <Input
          label="Repeat password"
          config={{
            placeholder: "Repeat password",
            secureTextEntry: true,
          }}
        />
      )}
      <View style={styles.actions}>
        <Button style={styles.authBtn} onPress={authenticateHandler}>
          {!isLogin ? "Signup" : "Login"}
        </Button>
        <Button onPress={switchModeHandler}>
          {isLogin ? "Signup" : "Login"}
        </Button>
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  form: {
    width: "90%",
  },
  actions: {
    paddingHorizontal: 15,
  },
  authBtn: {
    backgroundColor: "blue",
    width: "40%",
    marginVertical: 20,
    padding: 5,
    borderRadius: 8,
    alignSelf: "center",
  },
});
