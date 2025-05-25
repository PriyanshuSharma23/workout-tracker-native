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
import { Link } from "expo-router";
import { ExerciseCard } from "@/components/ExerciseCard";
import { WeekDays } from "@/constants/WeekDays";

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

  const theme = useColorScheme() ?? "dark";
  const cardColor = Colors[theme].cardBackground;
  const tint = Colors[theme].tint;

  return (
    <SafeAreaView style={styles.container}>
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
            <MaterialIcons name="add" size={20} color="black" />
            <Text style={styles.workoutButtonText}>Begin Your Workout</Text>
          </View>
        </Link>

        <View style={styles.previousWorkoutsSection}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="dumbbell" size={24} color="#fff" />
            <Text style={styles.sectionTitle}>Previous Workouts</Text>
          </View>

          <ThemedText style={styles.sectionSubtitle}>
            Shows the last 5 workouts you did.
          </ThemedText>

          <View style={styles.exerciseCardsContainer}>
            <ExerciseCard />
            <ExerciseCard />
            <ExerciseCard />
            <ExerciseCard />
            <ExerciseCard />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const DayCard = ({ date, isSelected = false }: DayCardProps) => {
  const colorScheme = useColorScheme() ?? "dark";

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

        const textColor =
          bgColor === Colors[colorScheme].tint ? "#000" : "#fff";

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
      style={[styles.dayCard, { backgroundColor: bgColor }, glowStyle]}
      accessibilityRole="button"
      accessibilityLabel={`${isToday ? "Today, " : ""}${dayName} ${monthdate}`}
      accessibilityHint={
        isPast ? "Past date" : isToday ? "Today" : "Future date"
      }
    >
      <ThemedText
        darkColor={textColor}
        style={[styles.dayText, isToday && styles.todayText]}
      >
        {dayName}
      </ThemedText>
      <ThemedText
        darkColor={textColor}
        type="title"
        style={isToday && styles.todayText}
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
    color: "#000",
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
    color: "#fff",
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
});
// import {
//   StyleSheet,
//   useColorScheme,
//   useWindowDimensions,
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Touchable,
//   Pressable,
// } from "react-native";
//
// import { HelloWave } from "@/components/HelloWave";
// import { ThemedText } from "@/components/ThemedText";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useMemo, useState } from "react";
// import { Colors } from "@/constants/Colors";
// import { IconSymbol } from "@/components/ui/IconSymbol";
// import { MaterialIcons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { Link } from "expo-router";
// import { ExerciseCard } from "@/components/ExerciseCard";
// import { WeekDays } from "@/constants/WeekDays";
//
// export default function HomeScreen() {
//   const { width } = useWindowDimensions();
//
//   const [dates, setDates] = useState<string[]>([]);
//
//   useMemo(() => {
//     const maxCards = Math.floor((width - 40) / 80); // I want today to be at center
//
//     const startDate = new Date();
//     startDate.setHours(0, 0, 0, 0);
//
//     startDate.setDate(startDate.getDate() - maxCards / 2 + 1);
//
//     const dates = [];
//
//     for (let i = 0; i < maxCards; i++) {
//       const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
//       dates.push(date.toISOString());
//     }
//
//     setDates(dates);
//
//     return () => {};
//   }, [width]);
//
//   //
//   const theme = useColorScheme() ?? "dark";
//   const cardColor = Colors[theme].cardBackground;
//   //
//
//   const tint = Colors[theme].tint;
//
//   return (
//     <SafeAreaView style={{}}>
//       <ScrollView style={{ paddingLeft: 20, paddingRight: 20, marginTop: 40 }}>
//         <View style={{}}>
//           <ThemedText darkColor={"#ddd"} type="subtitle">
//             Hi,
//           </ThemedText>
//           <View style={{ flexDirection: "row", gap: 8, marginTop: 5 }}>
//             <ThemedText type="title">Priyanshu</ThemedText>
//             <HelloWave />
//           </View>
//         </View>
//
//         <View
//           style={{
//             flexDirection: "row",
//             gap: 8,
//             alignItems: "center",
//             justifyContent: "center",
//             marginTop: 8,
//           }}
//         >
//           {dates.map((date) => (
//             <DayCard key={date} date={date} />
//           ))}
//         </View>
//         <View
//           style={{
//             marginTop: 16,
//             borderRadius: 24,
//             backgroundColor: "#111",
//             padding: 20,
//             gap: 10,
//           }}
//         >
//           <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>
//             🔥 5-Day Streak
//           </Text>
//         </View>
//
//         <Link
//           href={"/workout-form/2023-05-25"}
//           style={{
//             marginTop: 16,
//             flexDirection: "row",
//             alignItems: "center",
//             backgroundColor: tint,
//             paddingVertical: 20,
//             paddingHorizontal: 24,
//             borderRadius: 24, // pill shape
//             gap: 4, // space between icon and text
//             elevation: 2,
//           }}
//         >
//           <View
//             style={{
//               flexDirection: "row",
//               gap: 8,
//               alignItems: "center",
//               justifyContent: "center",
//               width: "100%",
//             }}
//           >
//             <MaterialIcons name="add" size={20} color="black" />
//             <Text style={{ fontSize: 20 }}>Begin Your Workout</Text>
//           </View>
//         </Link>
//
//         <View style={{ marginTop: 20, marginBottom: 100 }}>
//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               marginTop: 16,
//               gap: 8,
//             }}
//           >
//             <IconSymbol name="dumbbell" size={24} color="#fff" />
//             <Text style={{ color: "#fff", fontSize: 28 }}>
//               Previous Workouts
//             </Text>
//           </View>
//
//           <ThemedText>Shows the last 5 workouts you did.</ThemedText>
//
//           <View style={{ gap: 16, marginTop: 16 }}>
//             <ExerciseCard />
//             <ExerciseCard />
//             <ExerciseCard />
//             <ExerciseCard />
//             <ExerciseCard />
//           </View>
//           {/* </ScrollView> */}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
//
// const DayCard = ({ date }: { date: string }) => {
//   const color = useColorScheme() ?? "dark";
//
//   const { day, monthdate, bgColor, textColor } = useMemo(() => {
//     const dateObj = new Date(date);
//     dateObj.setHours(0, 0, 0, 0);
//
//     const today = new Date();
//     dateObj.setHours(0, 0, 0, 0);
//
//     const bgColor =
//       dateObj.getTime() > today.getTime()
//         ? Colors[color].cardBackground
//         : Colors[color].tint;
//
//     const textColor = bgColor === Colors[color].tint ? "#000" : "#fff";
//
//     return {
//       day: dateObj.getDay(),
//       monthdate: dateObj.getDate().toString().padStart(2, "0"),
//       bgColor,
//       textColor,
//     };
//   }, [date]);
//
//   return (
//     <TouchableOpacity
//       style={{
//         backgroundColor: bgColor,
//         height: 80,
//         width: 80,
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         borderRadius: 12,
//         gap: 6,
//       }}
//     >
//       <ThemedText darkColor={textColor} style={{ fontWeight: "bold" }}>
//         {WeekDays[day]}
//       </ThemedText>
//       <ThemedText darkColor={textColor} type="title">
//         {monthdate}
//       </ThemedText>
//     </TouchableOpacity>
//   );
// };
//
// const StartButton = () => {
//   return (
//     <TouchableOpacity style={styles.button}>
//       <MaterialIcons name="play-arrow" size={20} color="black" />
//       <Text style={styles.text}>Start</Text>
//     </TouchableOpacity>
//   );
// };
//
// const styles = StyleSheet.create({
//   button: {},
//   text: {
//     color: "#000",
//     fontSize: 14,
//     fontWeight: "600",
//   },
// });
//
// export default StartButton;

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

{
  /* <View style={{ marginTop: 20, backgroundColor: "#000" }}> */
}
{
  /*   <View */
}
{
  /*     style={{ */
}
{
  /*       flexDirection: "row", */
}
{
  /*       alignItems: "center", */
}
{
  /*       marginTop: 16, */
}
{
  /*       gap: 8, */
}
{
  /*     }} */
}
{
  /*   > */
}
{
  /*     <IconSymbol name="calendar" size={24} color="#fff" /> */
}
{
  /*     <Text style={{ color: "#fff", fontSize: 28 }}>This Week</Text> */
}
{
  /*   </View> */
}
{
  /**/
}
{
  /*   <View */
}
{
  /*     style={{ */
}
{
  /*       marginTop: 16, */
}
{
  /*       borderWidth: 1, */
}
{
  /*       borderRadius: 24, */
}
{
  /*       borderColor: "rgba(255, 255, 255, 0.2)", */
}
{
  /*       padding: 26, */
}
{
  /*       flexDirection: "row", */
}
{
  /*       gap: 10, */
}
{
  /*       // backgroundColor: "#DDDDDD88", */
}
{
  /*       // backgroundColor: "#FFFF0088", */
}
{
  /*       // backgroundColor: "#00FF0088", */
}
{
  /*       alignItems: "center", */
}
{
  /*     }} */
}
{
  /*   > */
}
{
  /*     <Text style={{ color: "#fff", fontSize: 20 }}> */
}
{
  /*       You hit the gym 5 times this week 💪 */
}
{
  /*     </Text> */
}
{
  /*   </View> */
}
{
  /* </View> */
}
