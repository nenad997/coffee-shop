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

  const authenticateHandler = () => {
    const validEmail =
      inputs.email.value.endsWith("@hotmail.com") ||
      inputs.email.value.endsWith("@gmail.com") ||
      (inputs.email.value.endsWith("@yahoo.com") &&
        inputs.email.value.trim().length > 10);

    const validPassword = inputs.password.value.trim().length > 6;

    const passwordsDoNotMatch =
      inputs.password.value.toString() !==
      inputs.repeatPassword.value.toString();

    switch (isLogin) {
      case true: {
        if (!validEmail || !validPassword) {
          console.log("Error login");
          setInputs(curInputs => {
            return {
              email: {
                value: curInputs.email.value,
                isValid: validEmail,
              },
              password: {
                value: curInputs.password.value,
                isValid: validPassword,
              },
              repeatPassword: {
                value: curInputs.repeatPassword.value,
                isValid: true,
              },
            };
          });
          console.log(validEmail, validPassword);
        } else {
          console.log(inputs);
        }
        break;
      }
      case false: {
        if (!validEmail || !validPassword || !passwordsDoNotMatch) {
          console.log("Error signup");
          setInputs(curInputs => {
            return {
              email: {
                value: curInputs.email.value,
                isValid: validEmail,
              },
              password: {
                value: curInputs.password.value,
                isValid: validPassword,
              },
              repeatPassword: {
                value: curInputs.repeatPassword.value,
                isValid: passwordsDoNotMatch,
              },
            };
          });
        } else {
          console.log(inputs);
        }
        break;
      }
      default: {
        throw new Error("An Error Occurred!");
      }
    }
  };

  return (
    <View style={styles.form}>
      <Input
        label="Email"
        hasError={!inputs.email.isValid}
        config={{
          placeholder: "Email address",
          onChangeText: changeInputTextHandler.bind(this, "email"),
          value: inputs.email.value,
        }}
      />
      <Input
        label="Password"
        hasError={!inputs.password.isValid}
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
          hasError={!inputs.repeatPassword.isValid}
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
