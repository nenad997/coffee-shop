import React, { FC } from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CoffeeProps } from "../../util/types";
import { Colors } from "../../constants/colors";
import PressableIcon from "../ui/PressableIcon";
import Icon from "../ui/Icon";

const CoffeeItem: FC<CoffeeProps> = ({ item }) => {
  const navigation = useNavigation<any>();

  const pressCoffeeItemHandler = () => {
    // navigation.navigate("CoffeeDetails", {
    //   title: item.title,
    //   addition: item.addition,
    // });
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={pressCoffeeItemHandler}
    >
      <View>
        <ImageBackground
          source={{ uri: item.imageUri }}
          style={styles.image}
          imageStyle={{ borderRadius: 15 }}
        >
          <View style={styles.rating}>
            <Icon
              name="star"
              width={20}
              height={20}
              tintColor={Colors.orangePrimary}
            />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.addition}>{item.addition}</Text>
        <View style={styles.actions}>
          <Text style={styles.price}>
            <Text style={styles.icon}>$</Text> {item.price.toFixed(2)}
          </Text>
          <View style={styles.addToCartButton}>
            <PressableIcon name="plus" onPress={() => {}} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CoffeeItem;

const styles = StyleSheet.create({
  container: {
    margin: 8,
    backgroundColor: Colors.inputBg,
    padding: 14,
    borderRadius: 16,
    gap: 10,
  },
  image: {
    width: 250,
    height: 250,
  },
  rating: {
    position: "absolute",
    right: 0,
    backgroundColor: Colors.grayPrimary,
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  ratingText: {
    color: "white",
    fontSize: 20,
  },
  info: {
    gap: 5,
  },
  title: {
    color: "white",
    fontSize: 25,
  },
  addition: {
    color: Colors.grayPrimary,
    fontSize: 19,
  },
  actions: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    color: "white",
    fontSize: 28,
  },
  icon: {
    color: Colors.orangePrimary,
  },
  pressed: {
    opacity: 0.7,
  },
  addToCartButton: {
    backgroundColor: Colors.orangePrimary,
    padding: 6,
    borderRadius: 10,
  },
});
