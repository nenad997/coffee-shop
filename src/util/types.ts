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
  BottomTabs: any;
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
  isFavorite: boolean;
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

export type CartItemProps = {
  id: string;
  coffeeType: "Americano" | "Espresso" | "Latte" | "Flat Wheat";
  imageUri: string;
  rating: number;
  title: string;
  addition: string;
  price: number;
  isFavorite: boolean;
  qty: number;
  totalPrice: number;
};

export interface Order {
  cart: Coffee[];
  totalAmount: string | number;
  userData: {
    emailAddress: string;
    userName: string;
    userAddress: string;
    userId: string;
  };
  orderDate: {
    date: string;
    time: string;
  };
}

export interface UserOrders {
  orderId: string;
  userId: string;
  orders: {
    title: string;
    price: number | string;
  }[];
}

export type OrderItem = {
  title: string;
  price: string | number;
};

export type CoffeeState = {
  coffees: Coffee[];
  cart: CartItemProps[];
  totalAmount: number;
  filteredCoffees: Coffee[];
  favoriteCoffees: Coffee[];
};
