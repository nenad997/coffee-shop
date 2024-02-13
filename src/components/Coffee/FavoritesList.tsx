import React, { FC } from "react";
import { useSelector } from "react-redux";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ImageBackground,
} from "react-native";

import PressableIcon from "../ui/PressableIcon";
import { Coffee } from "../../util/types";

const FavoritesList: FC<{
  coffees: Coffee[];
}> = ({ coffees }) => {
  return (
    <FlatList
      style={styles.list}
      data={coffees}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        return (
          <View style={styles.item}>
            <ImageBackground
              source={{ uri: item.imageUri }}
              style={styles.image}
              imageStyle={{ borderRadius: 20 }}
            >
              <Text style={styles.text}>
                {item.title} - {item.addition}
              </Text>
              <PressableIcon
                name="delete"
                onPress={() => {}}
                config={{
                  tintColor: "red",
                }}
              />
            </ImageBackground>
          </View>
        );
      }}
    />
  );
};

export default FavoritesList;

const styles = StyleSheet.create({
  list: {
    // margin: 10,
  },
  item: {
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 220,
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 10,
  },
  text: {
    color: "white",
    fontSize: 35,
    textAlign: "center",
  },
  button: {
    backgroundColor: "red",
    padding: 7,
    borderRadius: 10,
  },
});
