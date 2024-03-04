import React, { FC, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";

import { Coffee, ScreenParamList } from "../util/types";
import { Colors } from "../constants/colors";
import Icon from "../components/ui/Icon";
import PressableIcon from "../components/ui/PressableIcon";
import Button from "../components/ui/Button";
import { updateCoffeAction } from "../store/actions/coffee-actions";
import { coffeeSliceActions } from "../store/slices/coffee-slice";

const CoffeeDetailsScreen: FC<ScreenParamList> = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const coffees = useSelector((state: any) => state.coffee.coffees);
  const userCredentials = useSelector(
    (state: any) => state.auth.userCredentials,
  );

  const selectedCoffee: Coffee = coffees.find(
    (coffee: Coffee) => coffee.id === route.params!.id,
  );

  const toggleIsFavoriteHandler = (id: string) => {
    dispatch<any>(
      updateCoffeAction(id, {
        ...selectedCoffee,
        isFavorite: !selectedCoffee.isFavorite,
      }),
    );
  };

  const confirmPurchaseHandler = (coffee: Coffee) => {
    Alert.alert("Purchase successful", "Proceed", [
      {
        text: "Continue",
        onPress: () => {
          dispatch(coffeeSliceActions.clearCart());
          console.log("Your order");
          const orderData = {
            coffee: selectedCoffee,
            price: selectedCoffee.price,
            userData: {
              emailAddress: userCredentials && userCredentials.users[0].email,
              userName: userCredentials.users[0].email.split("@")[0],
              userAddress: "New York City, 5th Avenue, Manhattan",
            },
            orderDate: {
              date: new Date().toISOString().split("T")[0],
              time: new Date().toISOString().split("T")[1].slice(0, 8),
            },
          };
          console.log(orderData);
          navigation.navigate("BottomTabs");
        },
      },
    ]);
  };

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (route.params) {
        navigation.setOptions({
          title: `${selectedCoffee.title} - ${selectedCoffee.addition}`,
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [route, navigation]);

  useLayoutEffect(() => {
    if (route.params) {
      navigation.setOptions({
        headerRight: () => (
          <PressableIcon
            name="star"
            config={{
              width: 20,
              height: 20,
              tintColor: selectedCoffee.isFavorite
                ? Colors.orangePrimary
                : "white",
            }}
            onPress={toggleIsFavoriteHandler.bind(this, route.params!.id)}
          />
        ),
      });
    }
  }, [navigation, route, toggleIsFavoriteHandler]);

  return (
    <ScrollView style={styles.screenContainer}>
      <ImageBackground
        style={styles.image}
        source={{ uri: selectedCoffee.imageUri }}
        imageStyle={{ borderRadius: 20 }}
      >
        <View style={styles.details}>
          <View style={styles.left}>
            <Text style={styles.title}>{selectedCoffee.title}</Text>
            <Text style={styles.subtitle}>{selectedCoffee.addition}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" tintColor={Colors.orangePrimary} />
              <Text style={styles.rating}>
                {selectedCoffee.rating} {"(6.986)"}
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
            $ <Text style={styles.text}>{selectedCoffee.price.toFixed(2)}</Text>
          </Text>
        </View>
        <Button
          style={styles.button}
          onPress={confirmPurchaseHandler.bind(this, selectedCoffee)}
        >
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
    borderRadius: 25,
  },
  dollar: {
    color: Colors.orangePrimary,
    fontSize: 24,
  },
});
