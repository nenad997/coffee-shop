type IconNames = "home" | "cart" | "favorite" | "auth";

export interface IconProps {
  width?: number;
  height?: number;
  name: IconNames;
  isFocused?: boolean;
  tintColor?: string;
}
