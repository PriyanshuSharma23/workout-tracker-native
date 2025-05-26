import { StyleSheet, useColorScheme, View, ScrollView } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { workouts } from "@/data/workouts";
import { ExerciseCard } from "@/components/ExerciseCard";
import { Workout } from "@/types/workout";
import { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// Utility to parse and compare dates
const isSameWeek = (date1: Date, date2: Date) => {
  const startOfWeek = (d: Date) => {
    const day = d.getDay(); // 0 (Sun) to 6 (Sat)
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust to Monday start
    return new Date(d.setDate(diff));
  };

  const start1 = startOfWeek(new Date(date1));
  const start2 = startOfWeek(new Date(date2));
  return start1.toDateString() === start2.toDateString();
};

const isSameMonth = (date1: Date, date2: Date) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth();

export function groupWorkoutsByDate(workouts: Workout[]) {
  const now = new Date();

  const grouped = {
    thisWeek: [] as Workout[],
    thisMonth: [] as Workout[],
    older: [] as Workout[],
  };

  for (const workout of workouts) {
    const workoutDate = new Date(workout.date);

    if (isSameWeek(workoutDate, now)) {
      grouped.thisWeek.push(workout);
    } else if (isSameMonth(workoutDate, now)) {
      grouped.thisMonth.push(workout);
    } else {
      grouped.older.push(workout);
    }
  }

  return grouped;
}

export default function WorkoutHistory() {
  const colorScheme = useColorScheme() ?? "dark";
  const theme = Colors[colorScheme];

  const groupedWorkouts = useMemo(
    () => groupWorkoutsByDate(workouts),
    [workouts],
  );

  const renderWorkoutSection = (title: string, data: Workout[]) => {
    if (data.length === 0) return null;

    return (
      <View style={{ marginBottom: 24, gap: 16 }}>
        <ThemedText type="subtitle" style={{ marginBottom: 0 }}>
          {title}
        </ThemedText>
        {data.map((workout) => (
          <ExerciseCard key={workout.date + workout.name} workout={workout} />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.background,
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          backgroundColor: theme.background,
          paddingHorizontal: 20,
          paddingTop: 40,
        }}
      >
        {/* <ParallaxScrollView */}
        {/*   headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }} */}
        {/*   headerImage={ */}
        {/*     <IconSymbol */}
        {/*       size={310} */}
        {/*       color="#808080" */}
        {/*       name="chevron.left.forwardslash.chevron.right" */}
        {/*       style={styles.headerImage} */}
        {/*     /> */}
        {/*   } */}
        {/* > */}
        <ThemedView style={styles.titleContainer}>
          <MaterialIcons
            name="history"
            size={32}
            color={theme.text}
            style={{ marginTop: -8 }}
          />
          <ThemedText type="title">Workout History</ThemedText>
        </ThemedView>

        {renderWorkoutSection("This Week", groupedWorkouts.thisWeek)}
        {renderWorkoutSection("This Month", groupedWorkouts.thisMonth)}
        {renderWorkoutSection("Older", groupedWorkouts.older)}
      </ScrollView>
    </SafeAreaView>
    // </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
});
