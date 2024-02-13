import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type IconNames = "home" | "cart" | "favorite" | "auth";

export interface IconProps {
  width?: number;
  height?: number;
  name: IconNames | string;
  isFocused?: boolean;
  tintColor?: string;
}

type ScreenName = {
  Home: any;
  Cart: any;
  Favorites: any;
  Auth: any;
  CoffeeDetails: any;
};

export type ScreenParamList = NativeStackScreenProps<ScreenName, any>;

export type CustomButtonProps = {
  name: string;
  onPress: () => void;
  config?: any
};

export type Coffee = {
  id: string;
  coffeeType: "Americano" | "Espresso" | "Latte" | "Flat Wheat";
  imageUri: string;
  rating: number;
  title: string;
  addition: string;
  price: number;
};

export type CoffeeListProps = {
  coffees: Coffee[];
};

export type CoffeeProps = {
  item: Coffee;
};

export type CoffeeType = {
  id: string;
  title: string;
};

export type FilterFormProps = {
  onFilterCoffee: (filter: string) => void;
};
