import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "dark"];

  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
