import {
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Touchable,
  Pressable,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo, useState } from "react";
import { Colors } from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const { width } = useWindowDimensions();

  const [dates, setDates] = useState<string[]>([]);

  useMemo(() => {
    const maxCards = Math.floor((width - 40) / 80); // I want today to be at center

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    startDate.setDate(startDate.getDate() - maxCards / 2 + 1);

    const dates = [];

    for (let i = 0; i < maxCards; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      dates.push(date.toISOString());
    }

    setDates(dates);

    return () => {};
  }, [width]);

  //
  const theme = useColorScheme() ?? "dark";
  const cardColor = Colors[theme].cardBackground;
  //

  const tint = Colors[theme].tint;

  return (
    <SafeAreaView style={{}}>
      <ScrollView style={{ paddingLeft: 20, paddingRight: 20, marginTop: 40 }}>
        <View style={{}}>
          <ThemedText darkColor={"#ddd"} type="subtitle">
            Hi,
          </ThemedText>
          <View style={{ flexDirection: "row", gap: 8, marginTop: 5 }}>
            <ThemedText type="title">Priyanshu</ThemedText>
            <HelloWave />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          {dates.map((date) => (
            <DayCard key={date} date={date} />
          ))}
        </View>
        <View
          style={{
            marginTop: 16,
            borderRadius: 24,
            backgroundColor: "#111",
            padding: 20,
            gap: 10,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>
            🔥 5-Day Streak
          </Text>
        </View>

        <TouchableOpacity
          style={{
            marginTop: 16,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: tint,
            paddingVertical: 20,
            paddingHorizontal: 24,
            borderRadius: 24, // pill shape
            gap: 4, // space between icon and text
            elevation: 2,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <MaterialIcons name="add" size={20} color="black" />
            <Text style={{ fontSize: 20 }}>Begin Your Workout</Text>
          </View>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 16,
              gap: 8,
            }}
          >
            <IconSymbol name="dumbbell" size={24} color="#fff" />
            <Text style={{ color: "#fff", fontSize: 28 }}>
              Previous Workouts
            </Text>
          </View>

          <ThemedText>Shows the last 5 workouts you did.</ThemedText>

          <View style={{ gap: 16, marginTop: 16 }}>
            <Pressable>
              <LinearGradient
                colors={["rgba(255,255,255,0.09)", "rgba(0,0,0,0.01)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  backgroundColor: cardColor,
                  padding: 14,
                  width: "100%",
                  borderRadius: 12,
                  borderColor: "rgba(255,255,255,0.2)",
                  borderWidth: 1,
                  shadowColor: "#000",
                  shadowOpacity: 0.15,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 4 },
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 8,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 30 }}>
                    🏋️ Chest Day
                  </Text>

                  <ThemedText
                    type="subtitle"
                    style={{ fontWeight: "400", fontSize: 16 }}
                  >
                    25th May 2025
                  </ThemedText>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 4,
                    flexWrap: "wrap",
                    marginTop: 12,
                  }}
                >
                  <ExerciseChip label="Bench Press x2" />
                  <ExerciseChip label="Incline Dumbell Press x3" />
                  <ExerciseChip label="Butterfly x2" />
                  <ExerciseChip label="Bench Press x2" />
                  <ExerciseChip label="+5 More" />
                </View>
              </LinearGradient>
            </Pressable>
            <View
              style={{ width: "100%", height: 150, backgroundColor: "#ff0000" }}
            ></View>
            <View
              style={{ width: "100%", height: 150, backgroundColor: "#ff0000" }}
            ></View>
          </View>
          {/* </ScrollView> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const ExerciseChip = ({ label }: { label: string }) => {
  const colorScheme = useColorScheme() ?? "dark";
  const cardBg = Colors[colorScheme].cardBackground;
  return (
    <View
      style={{
        backgroundColor: cardBg,
        borderRadius: 100,
        paddingVertical: 4,
        paddingHorizontal: 8,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 14 }}>{label}</Text>
    </View>
  );
};

const WeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DayCard = ({ date }: { date: string }) => {
  const color = useColorScheme() ?? "dark";

  const { day, monthdate, bgColor, textColor } = useMemo(() => {
    const dateObj = new Date(date);
    dateObj.setHours(0, 0, 0, 0);

    const today = new Date();
    dateObj.setHours(0, 0, 0, 0);

    const bgColor =
      dateObj.getTime() > today.getTime()
        ? Colors[color].cardBackground
        : Colors[color].tint;

    const textColor = bgColor === Colors[color].tint ? "#000" : "#fff";

    return {
      day: dateObj.getDay(),
      monthdate: dateObj.getDate().toString().padStart(2, "0"),
      bgColor,
      textColor,
    };
  }, [date]);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: bgColor,
        height: 80,
        width: 80,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        gap: 6,
      }}
    >
      <ThemedText darkColor={textColor} style={{ fontWeight: "bold" }}>
        {WeekDays[day]}
      </ThemedText>
      <ThemedText darkColor={textColor} type="title">
        {monthdate}
      </ThemedText>
    </TouchableOpacity>
  );
};

const StartButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <MaterialIcons name="play-arrow" size={20} color="black" />
      <Text style={styles.text}>Start</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {},
  text: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
});

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
