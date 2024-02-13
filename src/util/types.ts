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
  Profile: any;
  CoffeeDetails: any;
};

type AuthScreenName = {
  Login: any;
  Signup: any;
};

export type ScreenParamList = NativeStackScreenProps<ScreenName, any>;

export type AuthScreenParamList = NativeStackScreenProps<AuthScreenName, any>;

export type CustomButtonProps = {
  name: string;
  onPress: () => void;
  config?: any;
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
  isHorizontal: boolean;
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
