import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  useColorScheme,
  View,
} from "react-native";

export default function GoogleButton({ onPress }: { onPress: () => void }) {
  const colorScheme = useColorScheme() ?? "dark";
  const oppositeColorScheme = colorScheme === "dark" ? "light" : "dark";

  const theme = Colors[colorScheme];
  const oppositeTheme = Colors[oppositeColorScheme];

  const isDarkMode = colorScheme === "dark";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDarkMode ? styles.buttonDark : styles.buttonLight,
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <AntDesign
          name="google"
          size={20}
          color={isDarkMode ? oppositeTheme.text : theme.text}
          style={styles.icon}
        />
        <Text
          style={[styles.text, isDarkMode ? styles.textDark : styles.textLight]}
        >
          Continue with Google
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDark: {
    backgroundColor: "#FFFFFF",
  },
  buttonLight: {
    backgroundColor: "#000000",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  textDark: {
    color: "#000000",
  },
  textLight: {
    color: "#FFFFFF",
  },
});
