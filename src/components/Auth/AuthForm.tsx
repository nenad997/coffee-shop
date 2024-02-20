import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Input from "./Input";
import Button from "../ui/Button";
import { signUp, login } from "../../util/authentication/auth";
import { authSliceActions } from "../../store/slices/auth-slice";

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

  const dispatch = useDispatch();
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

  const authenticateHandler = async () => {
    const validEmail =
      inputs.email.value.endsWith("@hotmail.com") ||
      inputs.email.value.endsWith("@gmail.com") ||
      (inputs.email.value.endsWith("@yahoo.com") &&
        inputs.email.value.trim().length > 10);

    const validPassword = inputs.password.value.trim().length > 6;

    const passwordsMatch =
      inputs.password.value.toString() ===
      inputs.repeatPassword.value.toString();

    switch (isLogin) {
      case true: {
        if (!validEmail || !validPassword) {
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
        } else {
          const { repeatPassword, ...loginInputs } = inputs;

          const loginData = await login(
            loginInputs.email.value,
            loginInputs.password.value,
          );

          if (loginData.idToken) {
            dispatch(authSliceActions.authenticate(loginData.idToken));
          } else {
            Alert.alert(
              "Login failed!",
              "Invalid email or password, please check your credentials and try again later!",
            );
          }
        }
        break;
      }
      case false: {
        if (!validEmail || !validPassword || !passwordsMatch) {
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
                isValid: passwordsMatch,
              },
            };
          });
        } else {
          const signUpData = await signUp(
            inputs.email.value,
            inputs.password.value,
          );

          if (signUpData.idToken) {
            dispatch(authSliceActions.authenticate(signUpData.idToken));
          } else {
            Alert.alert(
              "Signup failed",
              "User with this email address already exists! Please pick another email address and try again later!",
            );
          }
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
        message="Invalid email address"
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
        message="Invalid password"
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
          message="Passwords do not match"
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
