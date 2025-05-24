/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorDark = "#effe33";
const tintColorLight = "#000000";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#FFFFFF",
    cardBackground: "#F1F3F5",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    highlight: "#E5FF00",
    border: "#DDE1E4",
  },
  dark: {
    text: "#ECEDEE",
    background: "#000000",
    cardBackground: "#292929",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    highlight: "#C6FF00",
  },
};
