//{/* button  */}
import {
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo, useState, useEffect } from "react";
import { Colors } from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { ExerciseCard } from "@/components/ExerciseCard";
import { WeekDays } from "@/constants/WeekDays";
import { workouts } from "@/data/workouts";

// Constants for better maintainability
const CARD_WIDTH = 80;
const CONTAINER_PADDING = 40;

// TypeScript interfaces
interface DayCardProps {
  date: string;
  isSelected?: boolean;
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [dates, setDates] = useState<string[]>([]);

  // Fixed: Using useEffect instead of useMemo for side effects
  useEffect(() => {
    try {
      const maxCards = Math.floor((width - CONTAINER_PADDING) / CARD_WIDTH);

      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0);

      const offset = (1 ? maxCards % 2 == 0 : 0) as number;

      // Center today's date by going back half the cards
      startDate.setDate(
        startDate.getDate() - Math.floor(maxCards / 2) + offset,
      );

      const newDates: string[] = [];

      for (let i = 0; i < maxCards; i++) {
        const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
        newDates.push(date.toISOString());
      }

      setDates(newDates);
    } catch (error) {
      console.error("Error calculating dates:", error);
      setDates([]);
    }
  }, [width]);

  const colorScheme = useColorScheme() ?? "dark";
  const oppositeColorScheme = colorScheme === "dark" ? "light" : "dark";

  const theme = Colors[colorScheme];
  const oppositeTheme = Colors[oppositeColorScheme];

  const tint = Colors[colorScheme].tint;

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.background,
        ...styles.container,
      }}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.greeting}>
          <ThemedText darkColor={"#ddd"} type="subtitle">
            Hi,
          </ThemedText>
          <View style={styles.nameContainer}>
            <ThemedText type="title">Priyanshu</ThemedText>
            <HelloWave />
          </View>
        </View>

        <View style={styles.dateCardsContainer}>
          {dates.map((date) => (
            <DayCard key={date} date={date} />
          ))}
        </View>

        <View style={styles.streakCard}>
          <Text style={styles.streakText}>🔥 5-Day Streak</Text>
        </View>

        <Link
          href={"/workout-form/2023-05-25"}
          style={[styles.workoutButton, { backgroundColor: tint }]}
          accessibilityRole="button"
          accessibilityLabel="Begin your workout"
        >
          <View style={styles.workoutButtonContent}>
            <MaterialIcons name="add" size={20} color={oppositeTheme.text} />
            <Text
              style={{
                ...styles.workoutButtonText,
                color: oppositeTheme.text,
              }}
            >
              Begin Your Workout
            </Text>
          </View>
        </Link>

        <View style={styles.previousWorkoutsSection}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="dumbbell" size={24} color={theme.text} />
            <Text
              style={{
                color: theme.text,
                ...styles.sectionTitle,
              }}
            >
              Previous Workouts
            </Text>
          </View>

          {workouts.length !== 0 && (
            <ThemedText style={styles.sectionSubtitle}>
              Shows the last 5 workouts you did.
            </ThemedText>
          )}

          <View style={styles.exerciseCardsContainer}>
            {workouts.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={[styles.emptyStateText, { color: theme.icon }]}>
                  No workouts added yet
                </Text>
                <Text style={[styles.emptyStateSubtext, { color: theme.icon }]}>
                  Tap "Begin Your Workout" to get started
                </Text>
              </View>
            )}

            {workouts.map((workout) => (
              <ExerciseCard key={workout.date} workout={workout} />
            ))}

            {workouts.length > 0 && (
              <Link
                href={"/workouts"}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 16,
                  paddingVertical: 12,
                  borderRadius: 12,
                  backgroundColor: theme.cardBackground,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 4,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <ThemedText>View All Workouts</ThemedText>
                  <MaterialIcons
                    name="chevron-right"
                    size={20}
                    color={theme.text}
                  />
                </View>
              </Link>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const DayCard = ({ date, isSelected = false }: DayCardProps) => {
  const colorScheme = useColorScheme() ?? "dark";
  const oppositeColorScheme = colorScheme === "dark" ? "light" : "dark";

  const router = useRouter();

  const theme = Colors[colorScheme];
  const oppositeTheme = Colors[oppositeColorScheme];

  const { day, monthdate, bgColor, textColor, isToday, isPast } =
    useMemo(() => {
      try {
        const dateObj = new Date(date);
        dateObj.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Fixed: Apply to today, not dateObj again

        const isToday = dateObj.getTime() === today.getTime();
        const isPast = dateObj.getTime() < today.getTime();

        // Better logic for background color
        let bgColor: string;
        if (isToday) {
          bgColor = Colors[colorScheme].tint;
        } else if (isPast) {
          bgColor = Colors[colorScheme].tint;
        } else {
          bgColor = Colors[colorScheme].cardBackground;
        }

        // const textColor = oppositeTheme.text;
        let textColor = "";
        if (isToday || isPast) {
          textColor = oppositeTheme.text;
        } else {
          textColor = theme.text;
        }

        return {
          day: dateObj.getDay(),
          monthdate: dateObj.getDate().toString().padStart(2, "0"),
          bgColor,
          textColor,
          isToday,
          isPast,
        };
      } catch (error) {
        console.error("Error processing date:", error);
        return {
          day: 0,
          monthdate: "00",
          bgColor: Colors[colorScheme].cardBackground,
          textColor: "#fff",
          isToday: false,
          isPast: false,
        };
      }
    }, [date, colorScheme]);

  const dayName = WeekDays[day] || "Unknown";

  const glowStyle = isToday
    ? {
        shadowColor: Colors[colorScheme].tint,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.9,
        shadowRadius: 15,
        elevation: 15, // For Android
      }
    : {};

  return (
    <TouchableOpacity
      onPress={() => router.push(`/workout-form/${date}`)}
      style={[styles.dayCard, { backgroundColor: bgColor }, glowStyle]}
      accessibilityRole="button"
      accessibilityLabel={`${isToday ? "Today, " : ""}${dayName} ${monthdate}`}
      accessibilityHint={
        isPast ? "Past date" : isToday ? "Today" : "Future date"
      }
    >
      <ThemedText
        style={[
          styles.dayText,
          isToday && styles.todayText,
          { color: textColor },
        ]}
      >
        {dayName}
      </ThemedText>
      <ThemedText
        type="title"
        style={[isToday && styles.todayText, { color: textColor }]}
      >
        {monthdate}
      </ThemedText>
    </TouchableOpacity>
  );
};

// Cleaned up and organized styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  greeting: {
    marginBottom: 8,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 5,
  },
  dateCardsContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  dayCard: {
    height: CARD_WIDTH,
    width: CARD_WIDTH,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    gap: 6,
  },
  dayText: {
    fontWeight: "bold",
  },
  todayText: {
    fontWeight: "800", // Extra bold for today
  },
  streakCard: {
    marginTop: 16,
    borderRadius: 24,
    backgroundColor: "#111",
    padding: 20,
  },
  streakText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  workoutButton: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  workoutButtonContent: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  workoutButtonText: {
    fontSize: 20,
    fontWeight: "600",
    // color: "#000",
  },
  previousWorkoutsSection: {
    marginTop: 20,
    marginBottom: 100,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  sectionSubtitle: {
    marginTop: 4,
  },
  exerciseCardsContainer: {
    gap: 16,
    marginTop: 16,
  },
  emptyState: {
    alignItems: "center",
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
  },
});

//{/* button  */}
//<TouchableOpacity
//  style={{
//    flexDirection: "row",
//    alignItems: "center",
//    backgroundColor: tint,
//    paddingVertical: 6,
//    paddingHorizontal: 16,
//    borderRadius: 12, // pill shape
//    gap: 4, // space between icon and text
//  }}
//>
//  <MaterialIcons name="copy-all" size={20} color="black" />
//  <Text style={styles.text}>Apply today</Text>
//</TouchableOpacity>
