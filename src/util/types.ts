import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type IconNames = "home" | "cart" | "favorite" | "auth";

export interface IconProps {
  width?: number;
  height?: number;
  name: IconNames;
  isFocused?: boolean;
  tintColor?: string;
}

export type ScreenParamList = NativeStackScreenProps<any, any>;

