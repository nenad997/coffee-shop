import React, { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Input from "./Input";
import Button from "../ui/Button";

const AuthForm: FC<{
  isLogin: boolean;
}> = ({ isLogin }) => {
  const [inputs, setInputs] = useState({
    email: {
      isValid: true,
      value: "",
    },
    password: {
      isValid: true,
      value: "",
    },
    repeatPassword: {
      isValid: true,
      value: "",
    },
  });

  const navigation = useNavigation<any>();

  const switchModeHandler = () => {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  };

  const changeInputTextHandler = (identifier: string, enteredText: string) => {
    setInputs(curInputs => {
      return {
        ...curInputs,
        [identifier]: {
          value: enteredText,
          isValid: true,
        },
      };
    });
  };

  const invalidEmail =
    inputs.email.value.trim().length === 0 ||
    !inputs.email.value.includes("@") ||
    (!inputs.email.value.endsWith("hotmail.com") &&
      !inputs.email.value.endsWith("gmail.com") &&
      !inputs.email.value.endsWith("yahoo.com"));

  const invalidPassword =
    inputs.password.value.trim().length === 0 ||
    inputs.password.value.trim().length < 6;

  const passwodsDoNotMatch =
    inputs.password.value.toString() !== inputs.repeatPassword.value.toString();

  const authenticateHandler = () => {};

  return (
    <View style={styles.form}>
      <Input
        label="Email"
        config={{
          placeholder: "Email address",
          onChangeText: changeInputTextHandler.bind(this, "email"),
          value: inputs.email.value,
        }}
      />
      <Input
        label="Password"
        config={{
          placeholder: "Password",
          secureTextEntry: true,
          onChangeText: changeInputTextHandler.bind(this, "password"),
          value: inputs.password.value,
        }}
      />
      {!isLogin && (
        <Input
          label="Repeat password"
          config={{
            placeholder: "Repeat password",
            secureTextEntry: true,
            onChangeText: changeInputTextHandler.bind(this, "repeatPassword"),
            value: inputs.repeatPassword.value,
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
