import React, { FC } from "react";
import { View, ImageBackground, Text, StyleSheet } from "react-native";

import PressableIcon from "../ui/PressableIcon";
import { Coffee } from "../../util/types";

const FavoriteItem: FC<{
  item: Coffee;
  onPress: () => void;
}> = ({ item, onPress }) => {
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
          onPress={onPress}
          config={{
            tintColor: "red",
          }}
        />
      </ImageBackground>
    </View>
  );
};

export default FavoriteItem;

const styles = StyleSheet.create({
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
