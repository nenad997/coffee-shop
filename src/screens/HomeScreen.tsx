import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, StyleSheet, ScrollView } from "react-native";

import { ScreenParamList } from "../util/types";
import CoffeeList from "../components/Coffee/CoffeeList";
import LoadingIndicator from "../components/ui/LoadingIndicator";
import ErrorIndicator from "../components/ui/ErrorIndicator";
import { Colors } from "../constants/colors";
import { getCoffees } from "../store/actions/coffee-actions";

const HomeScreen: FC<ScreenParamList> = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: any) => state.ui);

  useEffect(() => {
    dispatch<any>(getCoffees());
  }, []);

  if (isLoading && !error) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator message={error.message} />;
  }

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.text}>Find the best</Text>
        <Text style={styles.text}>coffee for you</Text>
      </View>
      <CoffeeList />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.screenBg,
  },
  header: {
    marginVertical: 25,
    marginLeft: 20,
  },
  text: {
    color: "white",
    fontSize: 35,
  },
});
