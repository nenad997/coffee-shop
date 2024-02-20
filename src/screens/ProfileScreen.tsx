import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Text, View, StyleSheet } from "react-native";

import { ScreenParamList } from "../util/types";
import Button from "../components/ui/Button";
import { logoutAction } from "../store/actions/auth-actions";

const ProfileScreen: FC<ScreenParamList> = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch<any>(logoutAction());
  };

  return (
    <View style={styles.screenContainer}>
      <Text>Profile Screen!</Text>
      <Button style={styles.logoutBtn} onPress={logoutHandler}>
        Logout
      </Button>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutBtn: {
    backgroundColor: "red",
    padding: 7,
    borderRadius: 6,
  },
});
