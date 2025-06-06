import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Text, useColorScheme, View, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { Link } from "expo-router";
import { Workout } from "@/types/workout";

// Define types for better type safety
interface ExerciseCardProps {
  workout: Workout;
  // title?: string;
  // date?: string;
  // exercises?: string[];
  // workoutId?: string;
}

interface ExerciseChipProps {
  label: string;
}

export const ExerciseCard = ({ workout }: ExerciseCardProps) => {
  const colorScheme = useColorScheme() ?? "dark";
  const oppositeColorScheme = colorScheme === "dark" ? "light" : "dark";

  const theme = Colors[colorScheme];
  const oppositeTheme = Colors[oppositeColorScheme];

  const cardColor = theme.cardBackground;

  const { date, name, exercises: detailedExercises } = workout;

  const exercises = detailedExercises.map((ex) => {
    return `${ex.name} x${ex.sets.length}`;
  });
  const title = name;
  const workoutId = workout.date;

  // Calculate additional exercises count
  const displayExercises = exercises.slice(0, 4);
  const additionalCount = exercises.length - displayExercises.length;

  return (
    <Link href={`/workout-form/${workoutId}`} asChild>
      <TouchableOpacity activeOpacity={0.8}>
        <LinearGradient
          colors={
            colorScheme === "dark"
              ? ["rgba(255,255,255,0.05)", "rgba(0,0,0,0.2)"] // Dark mode gradient
              : ["rgba(230,230,230,0.9)", "rgba(200,200,200,0.6)"]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            backgroundColor: cardColor,
            padding: 16, // Increased for better spacing
            width: "100%",
            borderRadius: 12,
            borderColor: "rgba(255,255,255,0.2)",
            borderWidth: 1,
            // Improved shadow for better visual depth
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            // Android shadow alternative
            elevation: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12, // More semantic spacing
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontSize: 20, // Slightly smaller for better hierarchy
                fontWeight: "600", // Added weight for emphasis
              }}
              numberOfLines={1} // Prevent text overflow
            >
              {title}
            </Text>
            <ThemedText
              type="subtitle"
              style={{
                fontWeight: "400",
                fontSize: 14, // Slightly smaller
                opacity: 0.8, // Subtle hierarchy
              }}
            >
              {date}
            </ThemedText>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 6, // Slightly larger gap
              flexWrap: "wrap",
            }}
          >
            {displayExercises.map((exercise, index) => (
              <ExerciseChip key={`${exercise}-${index}`} label={exercise} />
            ))}
            {additionalCount > 0 && (
              <ExerciseChip label={`+${additionalCount} More`} />
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Link>
  );
};

const ExerciseChip = ({ label }: ExerciseChipProps) => {
  const colorScheme = useColorScheme() ?? "dark";

  const oppositeColorScheme = colorScheme === "dark" ? "light" : "dark";

  const theme = Colors[colorScheme];
  const oppositeTheme = Colors[oppositeColorScheme];

  const cardBg = Colors[colorScheme].cardBackground;

  return (
    <View
      style={{
        backgroundColor: cardBg,
        borderRadius: 100,
        paddingVertical: 6, // Slightly more padding
        paddingHorizontal: 12,
        // Add subtle border for better definition
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
      }}
    >
      <Text
        style={{
          color: theme.text,
          fontSize: 12, // Slightly smaller for chips
          fontWeight: "500", // Added weight
        }}
        numberOfLines={1} // Prevent text overflow in chips
      >
        {label}
      </Text>
    </View>
  );
};
