import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, useWindowDimensions, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { width } = useWindowDimensions();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarButton: HapticTab,
        tabBarBackground: () => {
          return (
            <View
              style={{
                backgroundColor: Colors[colorScheme ?? "light"].cardBackground,
                width: "100%",
                height: 80,
              }}
            />
          );
        },
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          borderWidth: 0,
          position: "absolute",
          bottom: 20,
          width: width / 2,
          maxWidth: 400,
          // backgroundColor: "white",
          borderRadius: 50,
          height: 60,
          overflow: "hidden",
          marginLeft: width / 4,
          paddingTop: 3,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Workouts",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="list.triangle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
