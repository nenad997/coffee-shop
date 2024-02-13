import React, { FC, useLayoutEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";

import { ScreenParamList } from "../util/types";
import { Colors } from "../constants/colors";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";

const CoffeeDetailsScreen: FC<ScreenParamList> = ({ route, navigation }) => {
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (route.params) {
        navigation.setOptions({
          title: `${route.params.item.title} - ${route.params.item.addition}`,
        });
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [route, navigation]);

  return (
    <ScrollView style={styles.screenContainer}>
      <ImageBackground
        style={styles.image}
        source={{ uri: route.params!.item.imageUri }}
        imageStyle={{ borderRadius: 20 }}
      >
        <View style={styles.details}>
          <View style={styles.left}>
            <Text style={styles.title}>{route.params!.item.title}</Text>
            <Text style={styles.subtitle}>{route.params!.item.addition}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" tintColor={Colors.orangePrimary} />
              <Text style={styles.rating}>
                {route.params!.item.rating} {"(6.986)"}
              </Text>
            </View>
          </View>
          <View style={styles.right}>
            <View style={styles.ingredients}>
              <Text style={styles.coffee}>Coffee</Text>
              <Text style={styles.coffee}>Milk</Text>
            </View>
            <View>
              <Text style={{ color: "white", fontSize: 18 }}>
                Medium Roasted
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.description}>
        <Text style={styles.text}>Description</Text>
      </View>
      <View style={styles.action}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.text}>Price</Text>
          <Text
            style={[
              styles.dollar,
              { alignItems: "center", justifyContent: "center" },
            ]}
          >
            ${" "}
            <Text style={styles.text}>
              {route.params!.item.price.toFixed(2)}
            </Text>
          </Text>
        </View>
        <Button style={styles.button} onPress={() => {}}>
          Buy Now
        </Button>
      </View>
    </ScrollView>
  );
};

export default CoffeeDetailsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.screenBg,
    padding: 10,
  },
  imageContainer: {
    height: "auto",
    borderWidth: 2,
    borderColor: "red",
  },
  image: {
    width: "100%",
    height: 450,
  },
  details: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  left: {
    gap: 10,
  },
  right: {
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 30,
  },
  title: {
    color: "white",
    fontSize: 30,
  },
  subtitle: {
    color: "white",
    fontSize: 24,
    width: 200,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  rating: {
    color: "white",
    fontSize: 20,
  },
  coffee: {
    color: "white",
    fontSize: 24,
  },
  ingredients: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  description: {
    marginTop: 30,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  action: {
    marginVertical: 100,
    flexDirection: "row",
  },
  button: {
    backgroundColor: Colors.orangePrimary,
    flex: 2,
  },
  dollar: {
    color: Colors.orangePrimary,
    fontSize: 24,
  },
});
