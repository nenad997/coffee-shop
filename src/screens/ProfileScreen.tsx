import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, StyleSheet } from "react-native";

import { ScreenParamList } from "../util/types";
import Button from "../components/ui/Button";
import { logoutAction } from "../store/actions/auth-actions";
import { getUserData } from "../util/authentication/auth";
import { Colors } from "../constants/colors";

const ProfileScreen: FC<ScreenParamList> = () => {
  const [user, setUser] = useState<any>();
  const dispatch = useDispatch();
  const authToken = useSelector((state: any) => state.auth.authToken);

  const logoutHandler = () => {
    dispatch<any>(logoutAction());
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUserData(authToken);
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, []);

  return (
    <View style={styles.screenContainer}>
      {user && (
        <View style={styles.infoContainer}>
          <Text style={styles.info}>User's info</Text>
          <Text style={styles.email}>Email: {user.users[0].email}</Text>
          <Text style={styles.name}>
            Username: {user.users[0].email.split("@")[0]}
          </Text>
        </View>
      )}
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
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: Colors.screenBg,
  },
  logoutBtn: {
    backgroundColor: "red",
    padding: 7,
    borderRadius: 6,
  },
  infoContainer: {
    borderTopColor: "yellow",
    borderBottomColor: "yellow",
    borderWidth: 2,
    padding: 10,
    gap: 15
  },
  info: {
    color: "white",
    textAlign: "center",
    fontSize: 30
  },
  email: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
  },
  name: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    padding: 5
  },
});
